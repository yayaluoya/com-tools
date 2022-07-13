"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLT = void 0;
/**
 * url 工具
 */
var URLT = /** @class */ (function () {
    function URLT(path, origin) {
        /** 是否没有源 */
        this.ifNoOrigin = false;
        if (!/^(https?|ws):\/\//.test(path) && !origin) {
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
                return this.path;
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
            this.url.pathname = path.replace(/\/{2,}/g, '/');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 添加路径
     * @param path
     */
    URLT.prototype.addPath = function (path) {
        this.path = "".concat(this.path, "/").concat(path);
    };
    return URLT;
}());
exports.URLT = URLT;
