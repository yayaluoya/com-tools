"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyObjWatch = void 0;
var ArrayUtils_1 = require("../ArrayUtils");
/**
 * 代理对象监听
 * TODO 由createProxyObj模块驱动
 */
var ProxyObjWatch = /** @class */ (function () {
    function ProxyObjWatch() {
    }
    /**
     * 触发依赖
     * TODO 由createProxyObj模块驱动
     * @param key
     */
    ProxyObjWatch.set = function (key) {
        ProxyObjWatch.watchRNList.forEach(function (item) {
            if (ArrayUtils_1.ArrayUtils.has(item.keys, function (_) { return _.objKey == key.objKey && _.key == key.key; })) {
                //TODO 这里不直接执行，而是执行并重新收集依赖
                ProxyObjWatch.autoF(item.f);
            }
        });
    };
    /**
     * 依赖收集
     * TODO 由createProxyObj模块驱动
     * @param key
     */
    ProxyObjWatch.get = function (key) {
        //收集依赖
        if (ProxyObjWatch.relyOnList.length > 0) {
            ArrayUtils_1.ArrayUtils.at(ProxyObjWatch.relyOnList, -1).push(key);
        }
    };
    /**
     * 收集依赖
     * @param f
     */
    ProxyObjWatch.collect = function (f) {
        var list = [];
        ProxyObjWatch.relyOnList.push(list);
        try {
            f();
        }
        catch (e) {
            console.error('获取依赖方法执行错误');
            list.length = 0;
        }
        if (list !== ProxyObjWatch.relyOnList.pop()) {
            console.error('收集到的依赖有偏差');
        }
        return list;
    };
    /**
     * 删除某个依赖方法
     * @param f
     */
    ProxyObjWatch.remove = function (f) {
        var length = ProxyObjWatch.watchRNList.length;
        ArrayUtils_1.ArrayUtils.eliminate(ProxyObjWatch.watchRNList, function (_) { return _.f === f; });
        return ProxyObjWatch.watchRNList.length != length;
    };
    /**
     * 自动执行某个带有依赖的方法
     * @param f
     * @param getROF
     */
    ProxyObjWatch.autoF = function (f, getROF) {
        var _ROF = getROF || f;
        //先删除之前的依赖
        ProxyObjWatch.remove(f);
        var ROs = ProxyObjWatch.collect(_ROF);
        ProxyObjWatch.watchRNList.push({
            keys: ROs,
            f: f,
        });
    };
    /**
     * 自动执行一次某个带有依赖的方法
     * @param f
     * @param getROF
     */
    ProxyObjWatch.autoOneF = function (f, getROF) {
        ProxyObjWatch.autoF(f, getROF);
        ProxyObjWatch.remove(f);
    };
    /** 依赖列表 */
    ProxyObjWatch.relyOnList = [];
    /** 监听依赖列表 */
    ProxyObjWatch.watchRNList = [];
    return ProxyObjWatch;
}());
exports.ProxyObjWatch = ProxyObjWatch;
