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
        uni.connectSocket({
            url: url,
        });
        //转换事件
        uni.onSocketOpen(function (op) {
            _this.emit('open', op);
        });
        uni.onSocketError(function (op) {
            _this.emit('error', op);
        });
        uni.onSocketMessage(function (op) {
            _this.emit('message', op);
        });
        uni.onSocketClose(function (op) {
            _this.emit('close', op);
        });
        return _this;
    }
    /** 发送消息 */
    WS.prototype.send = function (data) {
        uni.sendSocketMessage({
            data: data,
        });
    };
    /** 关闭 */
    WS.prototype.close = function () {
        uni.closeSocket();
    };
    return WS;
}(BaseEvent_1.BaseEvent));
exports.WS = WS;
