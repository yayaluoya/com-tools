"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResData = void 0;
var HttpStatus_1 = require("./HttpStatus");
/**
 * 响应数据
 */
var ResData = /** @class */ (function () {
    function ResData(d, status, mes, timeStamp) {
        if (d === void 0) { d = null; }
        if (status === void 0) { status = HttpStatus_1.HttpStatus.OK; }
        if (mes === void 0) { mes = ''; }
        if (timeStamp === void 0) { timeStamp = Date.now(); }
        this.data = d;
        this.msg = mes;
        this.status = status;
        this.timeStamp = timeStamp;
    }
    /**
     * 失败
     * @param msg
     * @returns
     */
    ResData.prototype.fail = function (msg) {
        this.status = HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.msg = msg;
        return this;
    };
    return ResData;
}());
exports.ResData = ResData;
