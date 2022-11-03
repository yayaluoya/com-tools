"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceTool = void 0;
/**
 * 单例隐藏字段名
 * TODO 就是单纯感觉比放闭包里面好
 */
var instanceName = Symbol();
/**
 * 单例装饰器
 * ! 被装饰的类的构造方法最好不要是public类型的
 * @param {*} name 单例字段名称
 * @param {*} passive 是否被动，指的是被用到时才new
 * @param {*} arg new时带的参数
 */
function instanceTool(name, passive) {
    if (name === void 0) { name = 'instance'; }
    if (passive === void 0) { passive = true; }
    var arg = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg[_i - 2] = arguments[_i];
    }
    return function (_class) {
        var newF = function () {
            return _class[instanceName] || (_class[instanceName] = new (_class.bind.apply(_class, __spreadArray([void 0], __read(arg), false)))());
        };
        passive || newF();
        Object.defineProperty(_class, name, {
            configurable: false,
            enumerable: false,
            get: function () {
                return newF();
            },
        });
    };
}
exports.instanceTool = instanceTool;
