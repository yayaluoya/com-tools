import { isObject } from "../is";
import { ProxyObjWatch } from "./ProxyObjWatch";

/** 代理对象的回调执行方法类型 */
export type proxyFunType = {
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

/** 代理对象列表 */
const proxyObjMap = new WeakMap<any, {
    key: symbol,
    fun: proxyFunType,
}>();

/**
 * 获取代理对象的处理方法
 * @param obj 
 */
function getProxyFun(obj): proxyFunType {
    if (proxyObjMap.has(obj)) {
        return proxyObjMap.get(obj).fun || {};
    } else {
        return {};
    }
}
/**
 * 设置代理对象的处理方法
 * @param obj 
 * @param fun 
 */
function setProxyFun(obj, fun: proxyFunType = null) {
    if (proxyObjMap.has(obj)) {
        let proxyObjCon = proxyObjMap.get(obj);
        proxyObjCon.fun = fun;
    } else {
        proxyObjMap.set(obj, {
            key: Symbol(),
            fun,
        });
    }
}
/**
 * 获取代理对象的key
 * @param obj 
 * @returns 
 */
function getProxyKey(obj): symbol {
    return proxyObjMap.get(obj)?.key;
}

/** 
 * 直接获取代理对象处理函数的key
 * TODO 这个key也是判断代理对象的关键
 */
const proxyFunKey = Symbol();

/**
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param fun 数据被设置时的回调
 */
export function createProxyObj<T extends Record<string | symbol, any> = any>(obj: T, fun: proxyFunType = null): T {
    if (!isObject(obj)) { return obj; }
    let setPF: (fun: proxyFunType) => void = obj[proxyFunKey];
    if (setPF) {
        setPF(fun);
        return obj;
    } else {
        proxyObjMap.set(obj, {
            key: Symbol(),
            fun,
        });
    }
    return new Proxy(obj, {
        get: (target: T, p: string | symbol, receiver: any): any => {
            if (p == proxyFunKey) {
                return (fun) => {
                    setProxyFun(target, fun);
                };
            }
            let value = Reflect.get(target, p, receiver);
            value = createProxyObj(value, getProxyFun(target));
            getProxyFun(target)?.get?.(
                target,
                p,
                getProxyKey(target),
            );
            ProxyObjWatch.get({
                key: p,
                objKey: getProxyKey(target),
            });
            return value;
        },
        set: (target: T, p: string | symbol, value: any, receiver: any): boolean => {
            let passValue = Reflect.get(target, p, receiver);
            cleanProxyObjFun(passValue);
            getProxyFun(target)?.set?.(
                target,
                p,
                value,
                passValue,
                getProxyKey(target)
            );
            ProxyObjWatch.set({
                key: p,
                objKey: getProxyKey(target),
            });
            return Reflect.set(target, p, value, receiver);
        },
    });
}

/**
 * 清除对象的代理触发函数
 * @param obj 
 * @returns 
 */
export function cleanProxyObjFun<T extends Record<string, any> = any>(obj: T): T {
    proxyObjMap.delete(obj);
    return obj;
}