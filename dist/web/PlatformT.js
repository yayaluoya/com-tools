"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformT = void 0;
/**
 * 平台工具
 */
var PlatformT = /** @class */ (function () {
    function PlatformT() {
    }
    /**
     * 获取平台凭证
     * @returns
     */
    PlatformT.userAgent = function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android';
        }
        else if (isiOS) {
            return 'ios';
        }
        else {
            return 'pc';
        }
    };
    return PlatformT;
}());
exports.PlatformT = PlatformT;
