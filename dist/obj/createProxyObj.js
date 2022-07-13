"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanProxyObjFun = exports.createProxyObj = void 0;
var ProxyObjWatch_1 = require("./ProxyObjWatch");
/** 代理对象列表 */
var proxyObjMap = new WeakMap();
/**
 * 获取代理对象的处理方法
 * @param obj
 */
function getProxyFun(obj) {
    if (proxyObjMap.has(obj)) {
        return proxyObjMap.get(obj).fun || {};
    }
    else {
        return {};
    }
}
/**
 * 设置代理对象的处理方法
 * @param obj
 * @param fun
 */
function setProxyFun(obj, fun) {
    if (fun === void 0) { fun = null; }
    if (proxyObjMap.has(obj)) {
        var proxyObjCon = proxyObjMap.get(obj);
        proxyObjCon.fun = fun;
    }
    else {
        proxyObjMap.set(obj, {
            key: Symbol(),
            fun: fun,
        });
    }
}
/**
 * 获取代理对象的key
 * @param obj
 * @returns
 */
function getProxyKey(obj) {
    var _a;
    return (_a = proxyObjMap.get(obj)) === null || _a === void 0 ? void 0 : _a.key;
}
/**
 * 直接获取代理对象处理函数的key
 * TODO 这个key也是判断代理对象的关键
 */
var proxyFunKey = Symbol();
/**
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param fun 数据被设置时的回调
 */
function createProxyObj(obj, fun) {
    if (fun === void 0) { fun = null; }
    if (!obj) {
        return obj;
    }
    var setPF = obj[proxyFunKey];
    if (setPF) {
        setPF(fun);
        return obj;
    }
    else {
        proxyObjMap.set(obj, {
            key: Symbol(),
            fun: fun,
        });
    }
    return new Proxy(obj, {
        get: function (target, p, receiver) {
            var _a, _b;
            if (p == proxyFunKey) {
                return function (fun) {
                    setProxyFun(target, fun);
                };
            }
            var value = Reflect.get(target, p, receiver);
            if (typeof value == 'object') {
                value = createProxyObj(value, getProxyFun(target));
            }
            (_b = (_a = getProxyFun(target)) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, getProxyKey(target));
            ProxyObjWatch_1.ProxyObjWatch.get({
                key: p,
                objKey: getProxyKey(target),
            });
            return value;
        },
        set: function (target, p, value, receiver) {
            var _a, _b;
            (_b = (_a = getProxyFun(target)) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, value, Reflect.get(target, p, receiver), getProxyKey(target));
            ProxyObjWatch_1.ProxyObjWatch.set({
                key: p,
                objKey: getProxyKey(target),
            });
            return Reflect.set(target, p, value, receiver);
        },
    });
}
exports.createProxyObj = createProxyObj;
/**
 * 清除对象的代理触发函数
 * @param obj
 * @returns
 */
function cleanProxyObjFun(obj) {
    proxyObjMap.delete(obj);
    return obj;
}
exports.cleanProxyObjFun = cleanProxyObjFun;
