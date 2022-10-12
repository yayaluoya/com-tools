"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLT = void 0;
/**
 * URL工具
 */
var URLT = /** @class */ (function () {
    function URLT(path, origin) {
        /** 是否没有源 */
        this.ifNoOrigin = false;
        // 如果路径没带协议的话，自动加上http协议
        if (/^\/\//.test(path)) {
            path = "http:".concat(path);
        }
        // 如果没加域的话自动加上域，不然会报错
        if (!/^(https?|wss?):\/\//.test(path) && !origin) {
            origin = 'http://localhost/';
            this.ifNoOrigin = true;
        }
        this.url = new URL(path, origin);
        //统一处理下
        this.path = this.path;
    }
    Object.defineProperty(URLT.prototype, "origin", {
        /** 获取源 */
        get: function () {
            if (this.ifNoOrigin) {
                return '';
            }
            return this.url.origin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLT.prototype, "href", {
        /** 完整路径 */
        get: function () {
            if (this.ifNoOrigin) {
                // 完整的路径为路径+查询参数+hash
                return "".concat(this.path).concat(this.url.search).concat(this.url.hash);
            }
            return this.url.href;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLT.prototype, "path", {
        get: function () {
            return this.url.pathname;
        },
        /** 路径 */
        set: function (path) {
            this.url.pathname = path
                // 统一路径分隔符
                .replace(/\\/g, '/')
                // 去掉多余的路径分隔符
                .replace(/\/{2,}/g, '/')
                // 去掉末尾的路径分隔符
                .replace(/\/$/, '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLT.prototype, "query", {
        /** 查询参数 */
        get: function () {
            var d = {};
            this.url.searchParams.forEach(function (value, key) {
                d[key] = value;
            });
            return d;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 拼接路径路径
     * @param paths
     */
    URLT.prototype.join = function () {
        var e_1, _a;
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        try {
            for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                var path_1 = paths_1_1.value;
                this.path = "".concat(this.path, "/").concat(path_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    /**
     * 添加查询参数
     * @param query
     * @param objectHandle object数据处理器
     * @returns
     */
    URLT.prototype.addQuery = function (query, objectHandle) {
        if (query === void 0) { query = {}; }
        if (objectHandle === void 0) { objectHandle = JSON.stringify; }
        for (var i in query) {
            this.url.searchParams.set(i, typeof query[i] == 'object' ? objectHandle(query[i]) : query[i]);
        }
        return this;
    };
    /**
     * 添加查询参数
     * @param url 原url
     * @param _query 查询参数
     */
    URLT.addQuery = function (url, query) {
        if (query === void 0) { query = {}; }
        return new URLT(url).addQuery(query).href;
    };
    /**
     * 获取查询参数
     */
    URLT.getQuery = function (url) {
        return new URLT(url).query;
    };
    /**
     * 拼接url
     * @param arg
     */
    URLT.join = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var urls = arg.map(function (_) { return new URLT(_); });
        var oneUrl = urls.splice(0, 1)[0];
        return urls.reduce(function (a, b) {
            a.join(b.path);
            return a;
        }, oneUrl).href;
    };
    /**
     * 路径对比
     * @param a
     * @param b
     */
    URLT.contrast = function (a, b) {
        return a == b || new URLT(a).href == new URLT(b).href;
    };
    return URLT;
}());
exports.URLT = URLT;
