/** 代理对象唯一key标识 */
const _proxyKey = Symbol('_proxyKey');
/** 代理对象回调执行方法标识 */
const _proxyFunKey = Symbol('_proxyFunKey');
/** 代理对象保留key标识 */
const _proxyKeepKeys: symbol[] = [_proxyKey, _proxyFunKey];

/** 关闭代理队列，此值只能在securityExeFun方法中被设置，这样才能保证它永远不会小于0 */
let _offProxyQueue: number = 0;
/**
 * 以安全的方式执行某个方法
 * 就是说执行这个方法的期间触发的代理操作都不会产生副作用
 * @param _f 目标方法
 */
function securityExeFun(_f: Function) {
    _offProxyQueue++;
    _f();//执行目标方法
    _offProxyQueue--;
}

/** 是否能执行代理副作用操作 */
let _isProxy: () => boolean = (): boolean => {
    return _offProxyQueue === 0;
}

/** 代理对象的回调执行方法类型 */
type proxyFunType = {
    /** 数据被设置的回调 */
    set?: (target, p: string | symbol, newValue, value) => void;
    /** 数据被获取时的回调 */
    get?: (target, p: string | symbol) => void;
};

/** 获取代理对象唯一key */
export function getProxyObjKey(obj): symbol {
    return Reflect.get(obj, _proxyKey);
}
/** 获取代理对象回调函数 */
function getProxyObjBackF(obj): proxyFunType {
    return Reflect.get(obj, _proxyFunKey);
}
/** 设置代理对象回调函数 */
function setProxyObjBackF(obj, _fun: proxyFunType) {
    Reflect.set(obj, _proxyFunKey, _fun);
}

/**
 * 创建一个代理对象
 * @param obj 原始对象
 * @param _fun 回调
 */
export function createProxyObj(obj: any, _fun: proxyFunType = null) {
    if (!obj || typeof obj != 'object') { return obj; }

    //递归添加代理
    for (let i in obj) {
        //以安全的方式执行
        securityExeFun(() => {
            obj[i] = createProxyObj(obj[i], _fun);
        });
    }

    //判断是否已经设置了代理了，没有设置的话就设置
    if (!getProxyObjKey(obj)) {
        //定义代理对象必备的不可配置不可枚举属性
        Object.defineProperties(obj, {
            //唯一标识，不可写
            [_proxyKey]: {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Symbol(),
            },
            //执行回调，可写
            [_proxyFunKey]: {
                configurable: false,
                enumerable: false,
                writable: true,
            }
        });

        //
        obj = new Proxy(obj, {
            /** 数据被设置 */
            set(target, p, value, receiver) {
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p as any)) {
                    let _value = Reflect.get(target, p);
                    //为新值添加监听
                    value = createProxyObj(value, getProxyObjBackF(target));
                    //新旧值不一样时触发回调
                    if (_value !== value) {
                        //先为旧值清理代理回调
                        cleanProxyObjFun(_value);
                        //调用回调
                        getProxyObjBackF(target)?.set?.(target, p as any, value, _value);
                    }
                }
                //
                return Reflect.set(target, p, value, receiver);
            },
            /** 数据被获取 */
            get(target, p, receiver) {
                let _value = Reflect.get(target, p, receiver);
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p as any)) {
                    //调用回调
                    getProxyObjBackF(target)?.get?.(target, p as any);
                    //根据当前对象的回调函数动态设置一下子对象的回调函数
                    if (_value && typeof _value == 'object' && getProxyObjBackF(_value) != getProxyObjBackF(target)) {
                        //定义执行监听回调
                        setProxyObjBackF(_value, getProxyObjBackF(target));
                    }
                }
                return _value;
            },
            /** 数据被删除 */
            deleteProperty(target, p) {
                //
                if (_isProxy()) {
                    let _value = Reflect.get(target, p);
                    //清理代理回调
                    cleanProxyObjFun(_value);
                    //调用回调
                    getProxyObjBackF(target)?.set?.(target, p as any, undefined, _value);
                }
                //
                return Reflect.deleteProperty(target, p);
            },
        });
    }
    //定义执行监听回调
    setProxyObjBackF(obj, _fun);
    //
    return obj;
}

/**
 * 清理代理对象回调函数
 * @param obj 目标对象
 */
function cleanProxyObjFun(obj: any) {
    if (!obj || typeof obj != 'object') { return; }
    if (!getProxyObjBackF(obj)) { return; }
    //递归清理
    for (let i in obj) {
        //以安全的方式执行
        securityExeFun(() => {
            cleanProxyObjFun(obj[i]);
        });
    }
    //
    setProxyObjBackF(obj, null);
}