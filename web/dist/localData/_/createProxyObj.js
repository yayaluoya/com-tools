/** 代理对象唯一key标识 */
const _proxyKey = Symbol('_proxyKey');
/** 代理对象回调执行方法标识 */
const _proxyFunKey = Symbol('_proxyFunKey');
/** 代理对象保留key标识 */
const _proxyKeepKeys = [_proxyKey, _proxyFunKey];
/** 关闭代理队列，此值只能在securityExeFun方法中被设置，这样才能保证它永远不会小于0 */
let _offProxyQueue = 0;
/**
 * 以安全的方式执行某个方法
 * 就是说执行这个方法的期间触发的代理操作都不会产生副作用
 * @param _f 目标方法
 */
function securityExeFun(_f) {
    _offProxyQueue++;
    _f(); //执行目标方法
    _offProxyQueue--;
}
/** 是否能执行代理副作用操作 */
let _isProxy = () => {
    return _offProxyQueue === 0;
};
/** 获取代理对象唯一key */
export function getProxyObjKey(obj) {
    return Reflect.get(obj, _proxyKey);
}
/** 获取代理对象回调函数 */
function getProxyObjBackF(obj) {
    return Reflect.get(obj, _proxyFunKey);
}
/** 设置代理对象回调函数 */
function setProxyObjBackF(obj, _fun) {
    Reflect.set(obj, _proxyFunKey, _fun);
}
/**
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param _fun 数据被设置时的回调
 */
export function createProxyObj(obj, _fun = null) {
    if (!obj || typeof obj != 'object') {
        return obj;
    }
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
                var _a, _b;
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    let _value = Reflect.get(target, p);
                    //为新值添加监听
                    value = createProxyObj(value, getProxyObjBackF(target));
                    //新旧值不一样时触发回调
                    if (_value !== value) {
                        //先为旧值清理代理回调
                        cleanProxyObjFun(_value);
                        //调用回调
                        (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, value, _value);
                    }
                }
                //
                return Reflect.set(target, p, value, receiver);
            },
            /** 数据被获取 */
            get(target, p, receiver) {
                var _a, _b;
                let _value = Reflect.get(target, p, receiver);
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    //调用回调
                    (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, target, p);
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
                var _a, _b;
                //
                if (_isProxy()) {
                    let _value = Reflect.get(target, p);
                    //清理代理回调
                    cleanProxyObjFun(_value);
                    //调用回调
                    (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, undefined, _value);
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
export function cleanProxyObjFun(obj) {
    if (!obj || typeof obj != 'object') {
        return;
    }
    if (!getProxyObjBackF(obj)) {
        return;
    }
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
//# sourceMappingURL=createProxyObj.js.map