"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpTool = void 0;
var internal_ip_1 = __importDefault(require("internal-ip"));
/**
 * http工具
 */
var HttpTool = /** @class */ (function () {
    function HttpTool() {
    }
    Object.defineProperty(HttpTool, "hostname", {
        /**
         * 获取主机地址
         */
        get: function () {
            if (!this.m_hostName) {
                this.m_hostName = internal_ip_1.default.v4.sync();
            }
            //
            return this.m_hostName;
        },
        enumerable: false,
        configurable: true
    });
    return HttpTool;
}());
exports.HttpTool = HttpTool;
