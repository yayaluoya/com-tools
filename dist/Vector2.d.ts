/**
 * 二维向量
 */
export declare class Vector2 {
    /** x轴分量 */
    x: number;
    /** y轴分量 */
    y: number;
    /**
     * 初始化
     * @param _x x轴分量
     * @param _y y轴分量
     */
    constructor(_x?: number, _y?: number);
    /** 返回一个克隆的向量 */
    clone(): Vector2;
    /** 设置值 */
    setValue(_x?: number, _y?: number): this;
    /** 向量相加 */
    static add(a: Vector2, b: Vector2, _v?: Vector2): Vector2;
    /** 向量相减 */
    static subtract(a: Vector2, b: Vector2, _v?: Vector2): Vector2;
}
//# sourceMappingURL=Vector2.d.ts.map