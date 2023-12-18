/**
 * 二维向量
 */
export class Vector2 {
  /**
   * 零向量,禁止修改
   */
  static ZERO = new Vector2(0.0, 0.0);
  /**
   * 一向量,禁止修改
   */
  static ONE = new Vector2(1.0, 1.0);

  /**
   * X轴坐标
   */
  x: number;
  /**
   * Y轴坐标
   */
  y: number;

  /**向量的长度 */
  public get magnitude(): number {
    return Vector2.scalarLength(this);
  }

  /**
   * 初始化
   * @param _x x轴分量
   * @param _y y轴分量
   */
  constructor(_x = 0, _y = 0) {
    this.x = _x;
    this.y = _y;
  }

  /**
   * 设置值
   */
  setValue(_x = this.x, _y = this.y): this {
    this.x = _x;
    this.y = _y;
    return this;
  }

  /**
   * 把所有值归零
   */
  toDefault(): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * 返回一个克隆的向量
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * 克隆到另一个向量
   * @param v2
   */
  cloneTo(v2: Vector2) {
    v2.x = this.x;
    v2.y = this.y;
  }

  /**
   * 向量相加
   */
  static add(a: Vector2, b: Vector2, _v?: Vector2): Vector2 {
    if (!_v) {
      _v = new Vector2();
    }
    _v.x = a.x + b.x;
    _v.y = a.y + b.y;
    return _v;
  }

  /**
   * 向量相减
   */
  static subtract(a: Vector2, b: Vector2, _v?: Vector2): Vector2 {
    if (!_v) {
      _v = new Vector2();
    }
    _v.x = a.x - b.x;
    _v.y = a.y - b.y;
    return _v;
  }

  /**
   * 缩放
   */
  static scale(a: Vector2, b: number, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }
    out.x = a.x * b;
    out.y = a.y * b;
    return out;
  }

  /**
   * 求两个二维向量的点积。
   * @param a left向量。
   * @param b right向量。
   * @return 点积。
   */
  static dot(a: Vector2, b: Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * 归一化二维向量。
   * 长度为1
   * @param s 源向量。
   * @param out 输出向量。
   */
  static normalize(s: Vector2, out: Vector2): void {
    const x = s.x,
      y = s.y;
    let len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = x * len;
      out.y = y * len;
    }
  }

  /**
   * 计算标量长度。
   * @param a 源三维向量。
   * @return 标量长度。
   */
  static scalarLength(a: Vector2): number {
    const x = a.x,
      y = a.y;
    return Math.sqrt(x * x + y * y);
  }
}
