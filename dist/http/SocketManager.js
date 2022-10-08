"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
var instanceTool_1 = require("../instanceTool");
var ws_1 = require("ws");
var URLT_1 = require("./URLT");
var ArrayUtils_1 = require("../ArrayUtils");
var HttpTool_1 = require("../node/HttpTool");
/**
 * key 对比
 */
function keyContrast(key, key2) {
    key = key.replace(/^\/+|\/+$/g, '');
    return key == key2 || new RegExp("^(/+)?".concat(key, "(/+)?$"), 'i').test(key2);
}
/**
 * Socket管理器
 */
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        /** 连接socket列表 */
        this.wsList = [];
    }
    Object.defineProperty(SocketManager.prototype, "length", {
        /** 所有的连接数 */
        get: function () {
            return this.wsList.reduce(function (a, b) {
                return a + b.wss.length;
            }, 0);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 开始服务
     * @param port 端口
     * @param checkTime 心跳监测时间
     */
    SocketManager.prototype.start = function (port, checkTime) {
        var _this = this;
        if (checkTime === void 0) { checkTime = 30 * 60 * 1000; }
        this.wss = new ws_1.WebSocketServer({ port: port });
        this.wss.on('connection', function (ws, req) {
            var item = _this.wsList.find(function (_) { return URLT_1.URLT.contrast(req.url, _.key); });
            if (!item) {
                item = {
                    wss: [{
                            ws: ws,
                            time: Date.now(),
                        }],
                    key: req.url,
                };
                _this.wsList.push(item);
            }
            else {
                item.wss.push({
                    ws: ws,
                    time: Date.now(),
                });
            }
            //有消息就更新时间戳
            ws.addListener('message', function () {
                var wsItem = item.wss.find(function (_) { return _.ws == ws; });
                wsItem.time = Date.now();
            });
            ws.on('close', function () {
                ArrayUtils_1.ArrayUtils.eliminate(item.wss, function (_) { return ws == _.ws; });
            });
        });
        // 
        this.check(checkTime);
        //
        console.log("webSocket\u670D\u52A1 ws://".concat(HttpTool_1.HttpTool.hostname, ":").concat(port));
    };
    /**
     * 发送消息
     * @param key 目标key
     * @param data 消息体
     */
    SocketManager.prototype.sendMsg = function (key, data) {
        var n = 0;
        this.wsList.forEach(function (_) {
            if (keyContrast(key, _.key)) {
                _.wss.forEach(function (_) {
                    n++;
                    _.ws.send(data);
                });
            }
        });
        return n;
    };
    /** 心跳监测 */
    SocketManager.prototype.check = function (time) {
        var _this = this;
        setTimeout(function () {
            _this.wsList.forEach(function (_a) {
                var wss = _a.wss;
                wss.forEach(function (_a) {
                    var ws = _a.ws, time = _a.time;
                    if (Math.abs(time - Date.now()) >= time) {
                        ws.close();
                    }
                });
            });
            _this.check(time);
        }, time);
    };
    SocketManager = __decorate([
        (0, instanceTool_1.instanceTool)()
    ], SocketManager);
    return SocketManager;
}());
exports.SocketManager = SocketManager;
