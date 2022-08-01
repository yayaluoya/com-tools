"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS = void 0;
var BaseEvent_1 = require("../BaseEvent");
/**
 * WebSocket的包装体
 */
var WS = /** @class */ (function (_super) {
    __extends(WS, _super);
    function WS(url) {
        var _this = _super.call(this) || this;
        _this.ws = new WebSocket(url);
        //转换事件
        _this.ws.addEventListener('close', function (e) {
            _this.emit('close', e);
        });
        _this.ws.addEventListener('error', function (e) {
            _this.emit('error', e);
        });
        _this.ws.addEventListener('message', function (e) {
            _this.emit('message', e);
        });
        _this.ws.addEventListener('open', function (e) {
            _this.emit('open', e);
        });
        return _this;
    }
    /** 发送消息 */
    WS.prototype.send = function (data) {
        this.ws.send(data);
    };
    /** 关闭 */
    WS.prototype.close = function () {
        this.ws.close();
    };
    return WS;
}(BaseEvent_1.BaseEvent));
exports.WS = WS;
