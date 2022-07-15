"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliOSST = void 0;
var ali_oss_1 = __importDefault(require("ali-oss"));
var ResData_1 = require("../http/ResData");
var URLT_1 = require("../http/URLT");
/**
 * 阿里云oss工具
 */
var AliOSST = /** @class */ (function () {
    function AliOSST(op) {
        this.client = new ali_oss_1.default(op);
        this.op = op;
    }
    /**
     * 上传文件
     * @param file 目标文件
     * @param _url 文件地址
     * @returns
     */
    AliOSST.prototype.updateFile = function (file, _url, headers) {
        var _this = this;
        return this.client.put(_url, file, {
            headers: headers,
        }).then(function () {
            return "//".concat(_this.op.bucket, ".").concat(_this.op.region, ".aliyuncs.com").concat(new URLT_1.URLT(_url).path);
        }).catch(function (e) {
            console.error('ali-oss上传文件失败', e);
            throw new ResData_1.ResData().fail('上传文件失败');
        });
    };
    /**
     * 分片上传文件
     * @param file
     * @param _url
     * @param headers
     */
    AliOSST.prototype.sliceUpdateFile = function (file, _url, partSize, progress, headers) {
        var _this = this;
        return this.client.multipartUpload(_url, file, {
            partSize: partSize,
            headers: headers,
            progress: progress,
        }).then(function () {
            return "//".concat(_this.op.bucket, ".").concat(_this.op.region, ".aliyuncs.com").concat(new URLT_1.URLT(_url).path);
        }).catch(function (e) {
            console.error('ali-oss上传文件失败', e);
            throw new ResData_1.ResData().fail('上传文件失败');
        });
    };
    return AliOSST;
}());
exports.AliOSST = AliOSST;
