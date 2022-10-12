"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliOssT = void 0;
var ali_oss_1 = __importDefault(require("ali-oss"));
/**
 * oss工具
 */
var AliOssT = /** @class */ (function () {
    function AliOssT(op) {
        this.op = op;
        this.client = new ali_oss_1.default(op);
    }
    /**
     * 上传文件
     * @param file 目标文件
     * @param _url 文件地址
     * @returns
     */
    AliOssT.prototype.updateFile = function (file, _url, headers) {
        var _this = this;
        return this.client.put(_url, file, {
            headers: __assign({ 
                //设置一年的缓存
                "Cache-Control": "max-age=31536000" }, headers),
        }).then(function () {
            return "//".concat(_this.op.bucket, ".").concat(_this.op.region, ".aliyuncs.com/").concat(_url);
        });
    };
    /**
     * 分片上传文件
     * @param file
     * @param _url
     * @param headers
     */
    AliOssT.prototype.sliceUpdateFile = function (file, _url, partSize, progress, headers) {
        var _this = this;
        return this.client.multipartUpload(_url, file, {
            partSize: partSize,
            headers: headers,
            progress: progress,
        }).then(function () {
            return "//".concat(_this.op.bucket, ".").concat(_this.op.region, ".aliyuncs.com").concat(_url);
        });
    };
    return AliOssT;
}());
exports.AliOssT = AliOssT;
