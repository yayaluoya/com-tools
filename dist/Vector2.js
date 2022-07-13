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
    /** 返回一个克隆的向量 */
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    /** 设置值 */
    Vector2.prototype.setValue = function (_x, _y) {
        if (_x === void 0) { _x = this.x; }
        if (_y === void 0) { _y = this.y; }
        this.x = _x;
        this.y = _y;
        return this;
    };
    /** 向量相加 */
    Vector2.add = function (a, b, _v) {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x + b.x;
        _v.y = a.y + b.y;
        return _v;
    };
    /** 向量相减 */
    Vector2.subtract = function (a, b, _v) {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x - b.x;
        _v.y = a.y - b.y;
        return _v;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
