"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLTool = void 0;
var URLT_1 = require("./URLT");
/**
 * URL工具
 */
var URLTool = /** @class */ (function () {
    function URLTool() {
    }
    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    URLTool.addQuery = function (_url, _query) {
        if (_query === void 0) { _query = {}; }
        if (!_url) {
            return _url;
        }
        //先提取原_url参数
        var urlStructure = _url.split('?');
        var __url = urlStructure[0];
        var __query = new URLSearchParams(urlStructure[1] || '');
        for (var i in _query) {
            __query.set(i, _query[i]);
        }
        return "".concat(__url, "?").concat(__query.toString());
    };
    /**
     * 获取查询参数
     */
    URLTool.getQuery = function (url) {
        var q = new URLSearchParams(url.split('?')[1] || '');
        var d = {};
        q.forEach(function (value, key) {
            d[key] = value;
        });
        return d;
    };
    /**
     * 拼接URL
     * @param arg
     */
    URLTool.joinURL = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var urls = arg.map(function (_) { return new URLT_1.URLT(_); });
        var oneUrl = urls.splice(0, 1)[0];
        return urls.reduce(function (a, b) {
            a.addPath(b.path);
            return a;
        }, oneUrl).href;
    };
    return URLTool;
}());
exports.URLTool = URLTool;
