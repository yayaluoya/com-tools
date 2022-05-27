"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirTool = void 0;
var fs_1 = require("fs");
/**
 * dir工具
 */
var DirTool = /** @class */ (function () {
    function DirTool() {
    }
    /**
     * 同步删除文件夹下的所有内容
     * @param path
     */
    DirTool.delDirChildSync = function (path) {
        var _this = this;
        var files = [];
        if ((0, fs_1.existsSync)(path)) {
            files = (0, fs_1.readdirSync)(path);
            files.forEach(function (file, i) {
                var curPath = path + "/" + file;
                if ((0, fs_1.statSync)(curPath).isDirectory()) {
                    _this.delDirChildSync(curPath); //递归删除文件夹
                    (0, fs_1.rmdirSync)(curPath);
                }
                else {
                    (0, fs_1.unlinkSync)(curPath); //删除文件
                }
            });
        }
    };
    return DirTool;
}());
exports.DirTool = DirTool;
