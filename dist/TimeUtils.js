"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtils = void 0;
/**
 * 时间工具
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    TimeUtils.makeTimeLeftString = function (time, separator, flag) {
        if (separator === void 0) { separator = ":"; }
        if (flag === void 0) { flag = false; }
        var ret = "";
        var hour;
        if (time <= 0) {
            ret = ret + "00:00";
            return ret;
        }
        if (time > this.ONE_YEAR) {
            ret = "大于一年";
            return ret;
        }
        if (flag) {
            if (time > this.ONE_DAY) {
                var day = Math.floor(time / this.ONE_DAY);
                ret = day + "天";
            }
            else if (time >= 3600) {
                hour = Math.floor(time / 3600);
                ret = hour + "小时";
            }
            else {
                var minute = Math.floor(time / 60);
                if (minute < 10)
                    ret += "0";
                ret += minute.toString() + separator;
                var second = time % 60;
                if (second < 10)
                    ret += "0";
                ret += second.toString();
            }
            return ret;
        }
        if (time > this.ONE_DAY) {
            var day = Math.floor(time / this.ONE_DAY);
            ret = day + "天";
            time = time - day * this.ONE_DAY;
            if (flag) {
                hour = Math.floor(time / 3600);
                if (hour > 0) {
                    ret += hour + "小时";
                }
                return ret;
            }
        }
        if (time <= 0) {
            ret = ret + "00:00";
            return ret;
        }
        ret = '';
        hour = Math.floor(time / 3600);
        if (hour > 0) {
            if (hour < 10) {
                ret += "0" + hour.toString() + separator;
            }
            else {
                ret += hour.toString() + separator;
            }
        }
        var minute = Math.floor((time - hour * 3600) / 60);
        if ((minute > 0) || (hour > 0)) {
            if (minute < 10)
                ret += "0";
            ret += minute.toString() + separator;
        }
        else {
            ret += "00" + separator;
        }
        var second = time % 60;
        if (second < 10)
            ret += "0";
        ret += second.toString();
        return ret;
    };
    TimeUtils.ONE_YEAR = 60 * 60 * 24 * 365;
    TimeUtils.ONE_DAY = 60 * 60 * 24;
    return TimeUtils;
}());
exports.TimeUtils = TimeUtils;
