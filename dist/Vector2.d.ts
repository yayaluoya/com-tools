/**
 * 二维向量
 */
export declare class Vector2 {
    /**
     * 零向量,禁止修改
     */
    static ZERO: Vector2;
    /**
     * 一向量,禁止修改
     */
    static ONE: Vector2;
    /**
     * X轴坐标
     */
    x: number;
    /**
     * Y轴坐标
     */
    y: number;
    /**向量的长度 */
    get magnitude(): number;
    /**
     * 初始化
     * @param _x x轴分量
     * @param _y y轴分量
     */
    constructor(_x?: number, _y?: number);
    /**
     * 设置值
     */
    setValue(_x?: number, _y?: number): this;
    /**
     * 把所有值归零
     */
    toDefault(): void;
    /**
     * 返回一个克隆的向量
     */
    clone(): Vector2;
    /**
     * 克隆到另一个向量
     * @param v2
     */
    cloneTo(v2: Vector2): void;
    /**
     * 向量相加
     */
    static add(a: Vector2, b: Vector2, _v?: Vector2): Vector2;
    /**
     * 向量相减
     */
    static subtract(a: Vector2, b: Vector2, _v?: Vector2): Vector2;
    /**
     * 缩放
     */
    static scale(a: Vector2, b: number, out?: Vector2): Vector2;
    /**
     * 求两个二维向量的点积。
     * @param a left向量。
     * @param b right向量。
     * @return 点积。
     */
    static dot(a: Vector2, b: Vector2): number;
    /**
     * 归一化二维向量。
     * 长度为1
     * @param s 源向量。
     * @param out 输出向量。
     */
    static normalize(s: Vector2, out: Vector2): void;
    /**
     * 计算标量长度。
     * @param a 源三维向量。
     * @return 标量长度。
     */
    static scalarLength(a: Vector2): number;
}
//# sourceMappingURL=Vector2.d.ts.map