"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingT = void 0;
var ArrayUtils_1 = require("./ArrayUtils");
/**
 * loading工具
 */
var LoadingT = /** @class */ (function () {
    function LoadingT() {
        /** 私有属性 加载列表 */
        this.loadingList = [];
    }
    /**
     * 清空
     */
    LoadingT.prototype.clean = function () {
        this.loadingList.length = 0;
    };
    Object.defineProperty(LoadingT.prototype, "loading", {
        /** 是否loading */
        get: function () {
            return this.loadingList.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置loading
     * @param {*} state 状态
     * @param {*} key key
     */
    LoadingT.prototype.set = function (state) {
        var key = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            key[_i - 1] = arguments[_i];
        }
        if (state) {
            this.loadingList.push(key);
        }
        else {
            ArrayUtils_1.ArrayUtils.eliminate(this.loadingList, function (_) { return ArrayUtils_1.ArrayUtils.same(_, key); });
        }
    };
    /**
     * 获取是否loading
     * @param  {*} key
     */
    LoadingT.prototype.get = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        return this.loadingList.some(function (_) { return ArrayUtils_1.ArrayUtils.same(_, key); });
    };
    return LoadingT;
}());
exports.LoadingT = LoadingT;
