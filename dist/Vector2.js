"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
/**
 * 二维向量
 */
var Vector2 = /** @class */ (function () {
    /**
     * 初始化
     * @param _x x轴分量
     * @param _y y轴分量
     */
    function Vector2(_x, _y) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        this.x = _x;
        this.y = _y;
    }
    Object.defineProperty(Vector2.prototype, "magnitude", {
        /**向量的长度 */
        get: function () {
            return Vector2.scalarLength(this);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置值
     */
    Vector2.prototype.setValue = function (_x, _y) {
        if (_x === void 0) { _x = this.x; }
        if (_y === void 0) { _y = this.y; }
        this.x = _x;
        this.y = _y;
        return this;
    };
    /**
     * 把所有值归零
     */
    Vector2.prototype.toDefault = function () {
        this.x = 0;
        this.y = 0;
    };
    /**
     * 返回一个克隆的向量
     */
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    /**
     * 克隆到另一个向量
     * @param v2
     */
    Vector2.prototype.cloneTo = function (v2) {
        v2.x = this.x;
        v2.y = this.y;
    };
    /**
     * 向量相加
     */
    Vector2.add = function (a, b, _v) {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x + b.x;
        _v.y = a.y + b.y;
        return _v;
    };
    /**
     * 向量相减
     */
    Vector2.subtract = function (a, b, _v) {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x - b.x;
        _v.y = a.y - b.y;
        return _v;
    };
    /**
     * 缩放
     */
    Vector2.scale = function (a, b, out) {
        if (!out) {
            out = new Vector2();
        }
        out.x = a.x * b;
        out.y = a.y * b;
        return out;
    };
    /**
     * 求两个二维向量的点积。
     * @param a left向量。
     * @param b right向量。
     * @return 点积。
     */
    Vector2.dot = function (a, b) {
        return (a.x * b.x) + (a.y * b.y);
    };
    /**
     * 归一化二维向量。
     * 长度为1
     * @param s 源向量。
     * @param out 输出向量。
     */
    Vector2.normalize = function (s, out) {
        var x = s.x, y = s.y;
        var len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
        }
    };
    /**
     * 计算标量长度。
     * @param a 源三维向量。
     * @return 标量长度。
     */
    Vector2.scalarLength = function (a) {
        var x = a.x, y = a.y;
        return Math.sqrt(x * x + y * y);
    };
    /**
     * 零向量,禁止修改
     */
    Vector2.ZERO = new Vector2(0.0, 0.0);
    /**
     * 一向量,禁止修改
     */
    Vector2.ONE = new Vector2(1.0, 1.0);
    return Vector2;
}());
exports.Vector2 = Vector2;
