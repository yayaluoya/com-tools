"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileT = void 0;
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
    return FileT;
}());
exports.FileT = FileT;
