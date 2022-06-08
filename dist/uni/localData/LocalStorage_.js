"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage_ = void 0;
/**
 * 封装后的本地数据类
 * 将把会数据以json的格式保存
 */
var LocalStorage_ = /** @class */ (function () {
    function LocalStorage_() {
    }
    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    LocalStorage_.setItem = function (key, value, _f) {
        //直接保存为json数据
        uni.setStorageSync(key, _f ? _f(JSON.stringify(value)) : JSON.stringify(value));
    };
    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    LocalStorage_.getItem = function (key, _f) {
        try {
            return JSON.parse(_f ? _f(uni.getStorageSync(key)) : uni.getStorageSync(key));
        }
        catch (_a) {
            //如果有异常就直接删除这条数据并返回null
            this.removeItem(key);
            return null;
        }
    };
    /**
     * 删除数据
     * @param key 名字
     */
    LocalStorage_.removeItem = function (key) {
        uni.removeStorageSync(key);
    };
    /**
     * 清理本地的全部数据
     */
    LocalStorage_.clear = function () {
        uni.clearStorageSync();
    };
    return LocalStorage_;
}());
exports.LocalStorage_ = LocalStorage_;
