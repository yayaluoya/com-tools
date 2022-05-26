"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormT = void 0;
/**
 * 表单工具
 */
var FormT = /** @class */ (function () {
    function FormT() {
    }
    /**
     * 字段验证
     * @param {*} ctx 原数据
     * @param {*} V 验证规则
     */
    FormT.FV = function (ctx, vs, _this) {
        var e_1, _a, e_2, _b;
        var _c, _d;
        //如果没有验证数据或者规则直接返回验证成功
        if (!ctx || typeof ctx != 'object' || !vs) {
            return true;
        }
        //判断原数据是否是可迭代对象
        if (!ctx[Symbol.iterator]) {
            ctx = [ctx];
        }
        try {
            for (var ctx_1 = __values(ctx), ctx_1_1 = ctx_1.next(); !ctx_1_1.done; ctx_1_1 = ctx_1.next()) {
                var o = ctx_1_1.value;
                try {
                    for (var _e = (e_2 = void 0, __values(Object.entries(vs))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var _g = __read(_f.value, 2), key = _g[0], v = _g[1];
                        var onCtx = o[key];
                        var msg = (_d = (_c = v.vf) === null || _c === void 0 ? void 0 : _c.call) === null || _d === void 0 ? void 0 : _d.call(_c, _this, onCtx, v);
                        if (msg) {
                            return false;
                        }
                        //验证子字段
                        if (!FormT.FV(onCtx, v.child)) {
                            return false;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ctx_1_1 && !ctx_1_1.done && (_a = ctx_1.return)) _a.call(ctx_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    return FormT;
}());
exports.FormT = FormT;
