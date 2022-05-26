"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrT = void 0;
/**
 * 字符串工具
 */
var StrT = /** @class */ (function () {
    function StrT() {
    }
    /**
     * 省略
     * @param s
     * @param n
     */
    StrT.omit = function (s, n) {
        if (s.length > n) {
            return s.slice(0, n) + '...';
        }
        return s;
    };
    return StrT;
}());
exports.StrT = StrT;
