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
exports.BaseWS = void 0;
var BaseEvent_1 = require("../BaseEvent");
/**
 * 基类WS
 * 通过事件基类来分发消息事件，从而精准匹配消息类型
 */
var BaseWS = /** @class */ (function (_super) {
    __extends(BaseWS, _super);
    function BaseWS() {
        var _this = _super.call(this) || this;
        BaseWS.iList.push(_this);
        return _this;
    }
    /**
     * 开始
     * @param {*} key
     */
    BaseWS.start = function (key) {
        var _this = this;
        this.key = key;
        var ws = this.getWS(key);
        this.wsp = new Promise(function (r, e) {
            var t = setTimeout(function () {
                e();
            }, 1000 * 60);
            //
            ws.on('open', undefined, function () {
                clearTimeout(t);
                r(ws);
            });
        });
        // 重连
        ws.on('error', undefined, function () {
            _this.close().then(function () {
                _this.start(_this.key);
            });
        });
        this.handMessage();
        this.palpitate();
    };
    /** 发送心跳包 */
    BaseWS.palpitate = function () {
        var _this = this;
        var op = this.getPalpitateOp();
        this.palpitateTime = setTimeout(function () {
            _this.send(op.data)
                .finally(function () {
                _this.palpitate();
            });
        }, op.time);
    };
    /** 关闭 */
    BaseWS.close = function () {
        clearTimeout(this.palpitateTime);
        return this.wsp
            .then(function (ws) {
            return new Promise(function (r, e) {
                ws.on('close', undefined, function () {
                    r();
                });
                ws.close();
            });
        });
    };
    /**
     * 发送消息
     * @param {*} data
     */
    BaseWS.send = function (data) {
        return this.wsp
            .then(function (ws) {
            ws.send(JSON.stringify(data));
        });
    };
    /**
     * 处理消息
     */
    BaseWS.handMessage = function () {
        this.wsp
            .then(function (ws) {
            ws.on('message', undefined, function (res) {
                var data = res.data;
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    console.error('解析消息失败', e);
                    return;
                }
                //
                BaseWS.iList.forEach(function (_) {
                    _.emit('message', data);
                });
            });
        });
    };
    /**
     * 获取发送心跳包的时间和数据
     * TODO 必要时重写
     * @returns
     */
    BaseWS.getPalpitateOp = function () {
        return {
            data: 'palpitate',
            time: 1000 * 60,
        };
    };
    /**
     * 获取 WS 的方法
     * TODO 必须重写
     * @param url
     * @returns
     */
    BaseWS.getWS = function (key) {
        return null;
    };
    BaseWS.iList = [];
    return BaseWS;
}(BaseEvent_1.BaseEvent));
exports.BaseWS = BaseWS;
