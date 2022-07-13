"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64 = void 0;
var js_base64_1 = require("js-base64");
/**
 * Base64 工具
 */
var Base64 = /** @class */ (function () {
    function Base64() {
    }
    /**
     * 将utf-8编码的字符串转换为Base64字符串。
     * @param urlsafe 如果' true '则结果是url安全的
     */
    Base64.encode = function (src, urlsafe) {
        return (0, js_base64_1.encode)(src, urlsafe);
    };
    /**
     * 将utf-8编码的字符串转换为url安全的Base64 RFC4648 §5.
     */
    Base64.encodeURL = function (src) {
        return (0, js_base64_1.encodeURL)(src);
    };
    /**
     * 将Base64字符串转换为UTF-8字符串。
     * @param {String} src Base64字符串。支持普通和url安全
     */
    Base64.decode = function (src) {
        return (0, js_base64_1.decode)(src);
    };
    return Base64;
}());
exports.Base64 = Base64;
