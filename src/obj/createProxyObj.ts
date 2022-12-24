import { ArrayUtils } from "../ArrayUtils";

/** 
 * 代理对象控制器类型
 */
export type proxyConType = {
    /** 
     * 数据被设置的回调
     * TODO 注意这个objKey是对象独有的
     */
    set?: (target, p: string | symbol, newValue, value, objKey: symbol) => void;
    /** 
     * 数据被获取时的回调
     * TODO 注意这个objKey是对象独有的
     */
    get?: (target, p: string | symbol, objKey: symbol) => void;
};

/** 对象->代理对象映射 */
const obj_proxy_Map = new WeakMap<any, any>();
// const obj_proxy_Map = new Map<any, any>();

/**
 * 获取对象代理映射
 * @returns 
 */
export function getobjProxyMap() {
    return obj_proxy_Map;
}

/** 
 * 代理对象的标识key，可以通过这个key获取和设置代理对象的标识对象
 * TODO 这个key也是判断代理对象的关键
 */
const proxySignKey = Symbol();

/** 代理对象控制器的类型 */
type proxyObjSignType = {
    /** 对象唯一key */
    key: symbol;
    /** 代理控制器 */
    con?: proxyConType;
    /** 禁用 */
    d?: boolean;
};

/**
 * 是否是一个对象
 * @param obj 
 * @returns 
 */
function isObject(obj: any): boolean {
    return typeof obj == 'object' && obj;
}

/**
 * 创建一个代理对象
 * TODO 渐进式的，只有访问该对象的某个属性时才会对该属性添加深度代理
 * 会把对这个对象的get,set操作回调出去
 * 并且配合ProxyObjWatch收集相关依赖
 * @param obj 原始对象
 * @param con 对象被代理的操作
 * @param resSetD 重置禁用状态
 */
export function createProxyObj<T extends Record<string | symbol, any> = any>(obj: T, con?: proxyConType, resSetD = true): T {
    if (!isObject(obj)) { return obj; }

    // 先在缓存中找
    let proxyObj;
    let sign: proxyObjSignType;
    if (obj_proxy_Map.has(obj)) {
        proxyObj = obj_proxy_Map.get(obj);
        sign = proxyObj[proxySignKey];
        sign.con = con;
        if (resSetD) {
            sign.d = false;
        }
        return proxyObj;
    }

    // 新建一个sign
    sign = {
        key: Symbol(),
        con,
        d: false,
    };

    // 如果有Proxy接口的话
    if (typeof Proxy != 'undefined') {
        proxyObj = new Proxy(obj, {
            deleteProperty: (target: T, p: string | symbol): boolean => {
                let passValue = Reflect.get(target, p);
                cleanProxyObjCon(obj_proxy_Map.get(passValue));
                let setResult = Reflect.deleteProperty(target, p);
                sign.d || sign.con?.set?.(
                    target,
                    p,
                    undefined,
                    passValue,
                    sign.key,
                );
                sign.d || ROSet({
                    key: p,
                    objKey: sign.key,
                });
                return setResult;
            },
            get: (target: T, p: string | symbol, receiver: any): any => {
                if (p == proxySignKey) {
                    return sign;
                }
                let value = Reflect.get(target, p, receiver);
                value = createProxyObj(value, sign.con, false);
                sign.d || sign.con?.get?.(
                    target,
                    p,
                    sign.key,
                );
                sign.d || ROGet({
                    key: p,
                    objKey: sign.key,
                });
                return value;
            },
            set: (target: T, p: string | symbol, value: any, receiver: any): boolean => {
                let passValue = Reflect.get(target, p, receiver);
                cleanProxyObjCon(obj_proxy_Map.get(passValue));
                let setResult = Reflect.set(target, p, value, receiver);
                sign.d || sign.con?.set?.(
                    target,
                    p,
                    value,
                    passValue,
                    sign.key,
                );
                sign.d || ROSet({
                    key: p,
                    objKey: sign.key,
                });
                return setResult;
            },
        });
    }
    /**
     * 用defineProperty实现
     * TODO 只是单纯的对对象可迭代属性进行了代理，并没有重写一些会改变源对象的方法，比如Array.prototype.push等方法
     */
    else {
        proxyObj = obj;
        proxyObj[proxySignKey] = sign;
        for (let p in obj) {
            let rootValue = obj[p];
            Object.defineProperty(proxyObj, p, {
                configurable: true,
                enumerable: true,
                get() {
                    sign.d || sign.con?.get?.(
                        obj,
                        p,
                        sign.key,
                    );
                    sign.d || ROGet({
                        key: p,
                        objKey: sign.key,
                    });
                    return createProxyObj(rootValue, sign.con, false);
                },
                set(value) {
                    let passValue = rootValue;
                    cleanProxyObjCon(obj_proxy_Map.get(passValue));
                    rootValue = value;
                    sign.d || sign.con?.set?.(
                        obj,
                        p,
                        value,
                        passValue,
                        sign.key,
                    );
                    sign.d || ROSet({
                        key: p,
                        objKey: sign.key,
                    });
                },
            });
        }
    }

    // 设置到缓存中
    obj_proxy_Map.set(obj, proxyObj);

    return proxyObj;
}

/**
 * 清除对象的代理
 * @param obj 
 * @returns 
 */
export function cleanProxyObjCon<T extends Record<string | symbol, any> = any>(obj: T): T {
    if (!isObject(obj)) { return obj; }
    let sign = obj[proxySignKey] as proxyObjSignType;
    if (sign) {
        sign.d = true;
        sign.con = null;
    }
    for (let i in obj) {
        cleanProxyObjCon(obj[i]);
    }
    return obj;
}

/**
 * 
 * TODO 以下是依赖收集和触发的内容
 * RO rely on 依赖 的缩写
 * 
 */

/**
 * 依赖类型
 */
type ROKType = {
    /** 该对象键的key */
    key: string | symbol;
    /** 对象独有的key */
    objKey: symbol;
};

/** 依赖列表 */
const relyOnList: ROKType[][] = [];
/** 监听依赖列表 */
const watchRNList: {
    keys: ROKType[];
    f: Function;
}[] = [];

/**
 * 触发依赖
 * TODO 由createProxyObj模块驱动
 * @param key  
 */
function ROSet(key: ROKType) {
    watchRNList.forEach((item) => {
        if (ArrayUtils.has(item.keys, _ => _.objKey == key.objKey && _.key == key.key)) {
            //TODO 这里不直接执行，而是执行并重新收集依赖
            autoROF(item.f);
        }
    });
}
/**
 * 依赖收集
 * TODO 由createProxyObj模块驱动
 * @param key 
 */
function ROGet(key: ROKType) {
    //收集依赖
    if (relyOnList.length > 0) {
        ArrayUtils.at(relyOnList, -1).push(key);
    }
}

/**
 * 收集依赖
 * @param f 
 */
export function ROCollect(f: Function): ROKType[] {
    let list: ROKType[] = [];
    relyOnList.push(list);
    try {
        f();
    } catch (e) {
        console.error('获取依赖方法执行错误', e);
        list.length = 0;
    }
    if (list !== relyOnList.pop()) {
        console.error('收集到的依赖有偏差');
    }
    return list;
}

/**
 * 删除某个依赖方法
 * @param f
 */
export function RORemove(f: Function): boolean {
    let length = watchRNList.length;
    ArrayUtils.eliminate(watchRNList, _ => _.f === f);
    return watchRNList.length != length;
}

/**
 * 自动执行某个带有依赖的方法
 * @param f 
 * @param getROF 
 */
export function autoROF(f: Function, getROF?: Function) {
    let _ROF = getROF || f;
    //先删除之前的依赖
    RORemove(f);
    let ROs = ROCollect(_ROF);
    watchRNList.push({
        keys: ROs,
        f,
    });
}

/**
 * 自动执行一次某个带有依赖的方法
 * @param f 
 * @param getROF 
 */
export function autoOneROF(f: Function, getROF?: Function) {
    autoROF(f, getROF);
    RORemove(f);
}
