"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage_ = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var DirTool_1 = require("../DirTool");
/**
 * 本地数操作工具
 * 仿前端接口的一个同步文件数据管理工具
 */
var LocalStorage_ = /** @class */ (function () {
    function LocalStorage_() {
    }
    Object.defineProperty(LocalStorage_, "getPath", {
        /**
         * 获取数据存储路径
         * TODO 需要重写
         */
        get: function () {
            return (0, path_1.join)(process.cwd(), '_localData');
        },
        enumerable: false,
        configurable: true
    });
    /** 获取数据存储路径 */
    LocalStorage_.getDataPath = function (key) {
        return (0, path_1.join)(this.getPath, "/".concat(key, ".json"));
    };
    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    LocalStorage_.setItem = function (key, value, _f) {
        value = _f ? _f(JSON.stringify(value)) : JSON.stringify(value);
        //直接写入文件
        (0, fs_1.writeFileSync)(this.getDataPath(key), value);
    };
    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    LocalStorage_.getItem = function (key, _f) {
        try {
            var s = (0, fs_1.readFileSync)(this.getDataPath(key)).toString();
            //从本地数据存储文件夹中找到目标文件并读取获取出来并序列化成目标类型的数据
            return JSON.parse(_f ? _f(s) : s);
        }
        catch (_a) {
            //说明该数据有误或者本来就没有，应该删除这个文件
            this.removeItem(key);
            return null;
        }
    };
    /**
     * 删除数据
     * @param key 名字
     */
    LocalStorage_.removeItem = function (key) {
        try {
            (0, fs_1.unlinkSync)(this.getDataPath(key));
        }
        catch (_a) { }
        ;
    };
    /**
     * 清理本地的全部数据
     */
    LocalStorage_.clear = function () {
        DirTool_1.DirTool.delDirChildSync(this.getPath);
    };
    return LocalStorage_;
}());
exports.LocalStorage_ = LocalStorage_;
