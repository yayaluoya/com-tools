/** 二维向量 */
export class Vector2 {
    /** x轴分量 */
    x: number;
    /** y轴分量 */
    y: number;

    /**
     * 初始化
     * @param _x x轴分量
     * @param _y y轴分量
     */
    constructor(_x = 0, _y = 0) {
        this.x = _x;
        this.y = _y;
    }

    /** 返回一个克隆的向量 */
    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /** 设置值 */
    setValue(_x = this.x, _y = this.y): this {
        this.x = _x;
        this.y = _y;
        return this;
    }

    /** 向量相加 */
    static add(a: Vector2, b: Vector2, _v?: Vector2): Vector2 {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x + b.x;
        _v.y = a.y + b.y;
        return _v;
    }
    /** 向量相减 */
    static subtract(a: Vector2, b: Vector2, _v?: Vector2): Vector2 {
        if (!_v) {
            _v = new Vector2();
        }
        _v.x = a.x - b.x;
        _v.y = a.y - b.y;
        return _v;
    }
}