"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjProxy = void 0;
var createProxyObj_1 = require("./createProxyObj");
/**
 * 对象代理类
 */
var ObjProxy = /** @class */ (function () {
    function ObjProxy() {
        /** 依赖列表 */
        this.relyOnList = [];
        /** 监听依赖列表 */
        this.watchRNList = [];
    }
    /**
     * 创建代理对象
     * @param data
     */
    ObjProxy.prototype.createProxyObj = function (obj, _fun) {
        var _this = this;
        if (_fun === void 0) { _fun = null; }
        return (0, createProxyObj_1.createProxyObj)(obj, {
            set: function (target, p, newValue, value) {
                var _a;
                //触发依赖
                var sign = getProxyObjKey(target);
                _this.watchRNList.forEach(function (item) {
                    if (item.relyOnList.findIndex(function (_item) {
                        return _item.sign == sign && _item.key == p;
                    }) != -1) {
                        item.f();
                    }
                });
                return (_a = _fun === null || _fun === void 0 ? void 0 : _fun.set) === null || _a === void 0 ? void 0 : _a.call(_fun, target, p, newValue, value);
            },
            get: function (target, p) {
                var _a;
                //收集依赖
                if (_this.relyOnList.length > 0) {
                    _this.relyOnList[_this.relyOnList.length - 1].push({
                        sign: getProxyObjKey(target),
                        key: p,
                    });
                }
                return (_a = _fun === null || _fun === void 0 ? void 0 : _fun.get) === null || _a === void 0 ? void 0 : _a.call(_fun, target, p);
            },
        });
    };
    ObjProxy.prototype.cleanProxyObjFun = function (data) {
        (0, createProxyObj_1.cleanProxyObjFun)(data);
    };
    /**
     * 获取某个函数执行用到的依赖
     * @param f
     */
    ObjProxy.prototype.collectRelyOn = function (f) {
        var list = [];
        this.relyOnList.push(list);
        try {
            f();
        }
        catch (e) {
            console.error('获取依赖方法执行错误');
            list.length = 0;
        }
        this.relyOnList.pop();
        return list;
    };
    /**
     * 删除某个依赖方法
     * @param key
     */
    ObjProxy.prototype.removeROF = function (key) {
        var length = this.watchRNList.length;
        this.watchRNList = this.watchRNList.filter(function (item) {
            return item.key != key;
        });
        return this.watchRNList.length != length;
    };
    /**
     * 自动执行某个带有依赖的方法
     * @param f
     * @param getROF
     */
    ObjProxy.prototype.autoF = function (f, getROF) {
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
    ObjProxy.prototype.autoOneF = function (f, getROF) {
        this.autoF(f, getROF);
        this.watchRNList.find(function (item) {
            return item.key == f;
        }).delete = true;
    };
    return ObjProxy;
}());
exports.ObjProxy = ObjProxy;
