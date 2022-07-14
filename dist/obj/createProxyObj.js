"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoOneROF = exports.autoROF = exports.RORemove = exports.ROCollect = exports.cleanProxyObjCon = exports.createProxyObj = exports.getobjProxyMap = void 0;
var ArrayUtils_1 = require("../ArrayUtils");
/** 对象->代理对象映射 */
var obj_proxy_Map = new WeakMap();
// const obj_proxy_Map = new Map<any, any>();
/**
 * 获取对象代理映射
 * @returns
 */
function getobjProxyMap() {
    return obj_proxy_Map;
}
exports.getobjProxyMap = getobjProxyMap;
/**
 * 代理对象的标识key，可以通过这个key获取和设置代理对象的标识对象
 * TODO 这个key也是判断代理对象的关键
 */
var proxySignKey = Symbol();
/**
 * 是否是一个对象
 * @param obj
 * @returns
 */
function isObject(obj) {
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
function createProxyObj(obj, con, resSetD) {
    if (resSetD === void 0) { resSetD = true; }
    if (!isObject(obj)) {
        return obj;
    }
    // 先在缓存中找
    var proxyObj;
    var sign;
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
        con: con,
        d: false,
    };
    proxyObj = new Proxy(obj, {
        deleteProperty: function (target, p) {
            var _a, _b;
            var passValue = Reflect.get(target, p);
            cleanProxyObjCon(obj_proxy_Map.get(passValue));
            var setResult = Reflect.deleteProperty(target, p);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, undefined, passValue, sign.key));
            sign.d || ROSet({
                key: p,
                objKey: sign.key,
            });
            return setResult;
        },
        get: function (target, p, receiver) {
            var _a, _b;
            if (p == proxySignKey) {
                return sign;
            }
            var value = Reflect.get(target, p, receiver);
            value = createProxyObj(value, sign.con, false);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, sign.key));
            sign.d || ROGet({
                key: p,
                objKey: sign.key,
            });
            return value;
        },
        set: function (target, p, value, receiver) {
            var _a, _b;
            var passValue = Reflect.get(target, p, receiver);
            cleanProxyObjCon(obj_proxy_Map.get(passValue));
            var setResult = Reflect.set(target, p, value, receiver);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, value, passValue, sign.key));
            sign.d || ROSet({
                key: p,
                objKey: sign.key,
            });
            return setResult;
        },
    });
    // 设置到缓存中
    obj_proxy_Map.set(obj, proxyObj);
    return proxyObj;
}
exports.createProxyObj = createProxyObj;
/**
 * 清除对象的代理
 * @param obj
 * @returns
 */
function cleanProxyObjCon(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var sign = obj[proxySignKey];
    if (sign) {
        sign.d = true;
        sign.con = null;
    }
    for (var i in obj) {
        cleanProxyObjCon(obj[i]);
    }
    return obj;
}
exports.cleanProxyObjCon = cleanProxyObjCon;
/** 依赖列表 */
var relyOnList = [];
/** 监听依赖列表 */
var watchRNList = [];
/**
 * 触发依赖
 * TODO 由createProxyObj模块驱动
 * @param key
 */
function ROSet(key) {
    watchRNList.forEach(function (item) {
        if (ArrayUtils_1.ArrayUtils.has(item.keys, function (_) { return _.objKey == key.objKey && _.key == key.key; })) {
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
function ROGet(key) {
    //收集依赖
    if (relyOnList.length > 0) {
        ArrayUtils_1.ArrayUtils.at(relyOnList, -1).push(key);
    }
}
/**
 * 收集依赖
 * @param f
 */
function ROCollect(f) {
    var list = [];
    relyOnList.push(list);
    try {
        f();
    }
    catch (e) {
        console.error('获取依赖方法执行错误', e);
        list.length = 0;
    }
    if (list !== relyOnList.pop()) {
        console.error('收集到的依赖有偏差');
    }
    return list;
}
exports.ROCollect = ROCollect;
/**
 * 删除某个依赖方法
 * @param f
 */
function RORemove(f) {
    var length = watchRNList.length;
    ArrayUtils_1.ArrayUtils.eliminate(watchRNList, function (_) { return _.f === f; });
    return watchRNList.length != length;
}
exports.RORemove = RORemove;
/**
 * 自动执行某个带有依赖的方法
 * @param f
 * @param getROF
 */
function autoROF(f, getROF) {
    var _ROF = getROF || f;
    //先删除之前的依赖
    RORemove(f);
    var ROs = ROCollect(_ROF);
    watchRNList.push({
        keys: ROs,
        f: f,
    });
}
exports.autoROF = autoROF;
/**
 * 自动执行一次某个带有依赖的方法
 * @param f
 * @param getROF
 */
function autoOneROF(f, getROF) {
    autoROF(f, getROF);
    RORemove(f);
}
exports.autoOneROF = autoOneROF;
