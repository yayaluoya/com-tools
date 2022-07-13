"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyObjWatch = void 0;
var ArrayUtils_1 = require("../ArrayUtils");
var createProxyObj_1 = require("./createProxyObj");
/**
 * 代理对象监听
 */
var ProxyObjWatch = /** @class */ (function () {
    function ProxyObjWatch(proObj) {
        _this = _super.call(this) || this;
        this.proObj = proObj;
    }
    /**
     * 触发依赖
     * @param key
     */
    ProxyObjWatch.set = function (key) {
        ProxyObjWatch.watchRNList.forEach(function (item) {
            if (ArrayUtils_1.ArrayUtils.has(item.keys, key)) {
                item.f();
            }
        });
    };
    /**
     * 依赖收集
     * @param key
     */
    ProxyObjWatch.get = function (key) {
        //收集依赖
        if (ProxyObjWatch.relyOnList.length > 0) {
            ArrayUtils_1.ArrayUtils.at(ProxyObjWatch.relyOnList, -1).push(key);
        }
    };
    Object.defineProperty(ProxyObjWatch.prototype, "proObj", {
        get: function () {
            return this._proObj;
        },
        set: function (proObj) {
            if (this._proObj == proObj) {
                return;
            }
            //
            this._proObj = (0, createProxyObj_1.createProxyObj)(proObj, {
                set: function (target, p, newValue, value, key) {
                },
                get: function (target, p, key) {
                },
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取某个函数执行用到的依赖
     * @param f
     */
    ProxyObjWatch.prototype.collectRelyOn = function (f) {
        var list = [];
        this.relyOnList.push(list);
        try {
            f();
        }
        catch (e) {
            console.error('获取依赖方法执行错误');
            list.length = 0;
        }
        if (list !== this.relyOnList.pop()) {
            console.error('收集到的依赖有偏差');
        }
        return list;
    };
    /**
     * 删除某个依赖方法
     * @param f
     */
    ProxyObjWatch.prototype.removeROF = function (f) {
        var length = this.watchRNList.length;
        ArrayUtils_1.ArrayUtils.eliminate(this.watchRNList, function (_) { return _.f === f; });
        return this.watchRNList.length != length;
    };
    /**
     * 自动执行某个带有依赖的方法
     * @param f
     * @param getROF
     */
    ProxyObjWatch.prototype.autoF = function (f, getROF) {
        var _this = this;
        var _ROF = getROF || f;
        var key = f;
        var onWatch = this.watchRNList.find(function (item) {
            return item.key == key;
        });
        if (onWatch) {
            if (onWatch.delete) {
                this.removeROF(key);
                return;
            }
            onWatch.relyOnList = [];
            onWatch.f = function () {
                //置空
            };
            onWatch.key = key;
            console.warn('有一个带有依赖的自动执行方法被替换了');
        }
        var _backF = function () {
            if (onWatch && onWatch.delete) {
                _this.removeROF(key);
                return;
            }
            var relyOnList = _this.collectRelyOn(_ROF);
            if (onWatch) {
                onWatch.relyOnList = relyOnList;
            }
            else {
                onWatch = {
                    relyOnList: relyOnList,
                    f: _backF,
                    key: key,
                    delete: false,
                };
                _this.watchRNList.push(onWatch);
            }
            //如果获取依赖的方法存在的话就手动触发一次方法
            if (_ROF != f) {
                f();
            }
        };
        _backF();
    };
    /**
     * 自动执行一次某个带有依赖的方法
     * @param f
     * @param getROF
     */
    ProxyObjWatch.prototype.autoOneF = function (f, getROF) {
        this.autoF(f, getROF);
        this.removeROF(f);
    };
    /** 依赖列表 */
    ProxyObjWatch.relyOnList = [];
    /** 监听依赖列表 */
    ProxyObjWatch.watchRNList = [];
    return ProxyObjWatch;
}());
exports.ProxyObjWatch = ProxyObjWatch;
