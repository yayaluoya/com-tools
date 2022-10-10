"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileT = void 0;
var ArrayUtils_1 = require("../ArrayUtils");
/**
 * 文件处理工具
 */
var FileT = /** @class */ (function () {
    function FileT() {
    }
    /**
     * 下载文件
     * @param {*} url 地址
     * @param {*} name 文件名字
     */
    FileT.download = function (url, name) {
        var a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    /**
     * 文件分片
     * @param file 文件
     * @param partSize 分片大小，单位为字节
     */
    FileT.slice = function (file, partSize) {
        var fileParts = [];
        for (var i = 0; i <= Math.floor(file.size / partSize); i++) {
            fileParts.push(file.slice(i * partSize, Math.min(partSize * (i + 1), file.size)));
        }
        return ArrayUtils_1.ArrayUtils.eliminate(fileParts, function (_) { return _.size <= 0; });
    };
    return FileT;
}());
exports.FileT = FileT;
