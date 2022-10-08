"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiT = void 0;
/**
 * 表情相关工具
 */
var EmojiT = /** @class */ (function () {
    function EmojiT() {
    }
    /**
     * 表情转码
     * @param str
     * @returns
     */
    EmojiT.utf16toEntities = function (str) {
        var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        str = str.replace(patt, function (char) {
            var H;
            var L;
            var code;
            var s;
            if (char.length === 2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                s = "&#".concat(code, ";");
            }
            else {
                s = char;
            }
            return s;
        });
        return str;
    };
    /**
     * 表情解码
     * @param strObj
     * @returns
     */
    EmojiT.entitiestoUtf16 = function (strObj) {
        var patt = /&#\d+;/g;
        var arr = strObj.match(patt) || [];
        var H;
        var L;
        var code;
        for (var i = 0; i < arr.length; i += 1) {
            code = arr[i];
            code = code.replace('&#', '').replace(';', '');
            // 高位
            H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
            // 低位
            L = ((code - 0x10000) % 0x400) + 0xDC00;
            code = "&#".concat(code, ";");
            var s = String.fromCharCode(H, L);
            strObj = strObj.replace(code, s);
        }
        return strObj;
    };
    return EmojiT;
}());
exports.EmojiT = EmojiT;
