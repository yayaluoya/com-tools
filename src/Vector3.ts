import { MathUtils3D } from "./MathUtils3D";

/**
 * 三维向量
 */
export class Vector3 {
    /**
     * 零向量，禁止修改
     */
    static ZERO = new Vector3(0.0, 0.0, 0.0);
    static ONE = new Vector3(1.0, 1.0, 1.0);
    static NegativeUnitX = new Vector3(-1, 0, 0);
    static UnitX = new Vector3(1, 0, 0);
    static UnitY = new Vector3(0, 1, 0);
    static UnitZ = new Vector3(0, 0, 1);
    static ForwardRH = new Vector3(0, 0, -1);
    static ForwardLH = new Vector3(0, 0, 1);
    static Up = new Vector3(0, 1, 0);

    /**
     * X轴坐标
     */
    x: number;
    /**
     * Y轴坐标
     */
    y: number;
    /**
     * Z轴坐标
     */
    z: number;

    /**向量的长度 */
    public get magnitude(): number {
        return Vector3.scalarLength(this);
    }

    /**
     * 创建一个 <code>Vector3</code> 实例。
     * @param x X轴坐标。
     * @param y Y轴坐标。
     * @param z Z轴坐标。
     */
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * 设置xyz值。
     * @param x X值。
     * @param y Y值。
     * @param z Z值。
     */
    setValue(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * 从Array数组拷贝值。
     * @param array 数组。
     * @param offset 数组偏移。
     */
    fromArray(array: any[], offset?: number): void {
        this.x = array[offset + 0];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
    }

    /**
     * 克隆。
     * @param destObject 克隆源。
     */
    cloneTo(destObject: any): void {
        var destVector3 = destObject;
        destVector3.x = this.x;
        destVector3.y = this.y;
        destVector3.z = this.z;
    }

    /**
     * 克隆。
     * @return 克隆副本。
     */
    clone(): any {
        var destVector3 = new Vector3();
        this.cloneTo(destVector3);
        return destVector3;
    }

    toDefault(): void {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    /**
     * 两个三维向量距离的平方。
     * @param value1 向量1。
     * @param value2 向量2。
     * @return 距离的平方。
     */
    static distanceSquared(value1: Vector3, value2: Vector3): number {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        var z = value1.z - value2.z;
        return (x * x) + (y * y) + (z * z);
    }

    /**
     * 两个三维向量距离。
     * @param value1 向量1。
     * @param value2 向量2。
     * @return 距离。
     */
    static distance(value1: Vector3, value2: Vector3): number {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        var z = value1.z - value2.z;
        return Math.sqrt((x * x) + (y * y) + (z * z));
    }

    /**
     * 分别取两个三维向量x、y、z的最小值计算新的三维向量。
     * @param a 。
     * @param b 。
     * @param out 。
     */
    static min(a: Vector3, b: Vector3, out: Vector3): void {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        out.z = Math.min(a.z, b.z);
    }

    /**
     * 分别取两个三维向量x、y、z的最大值计算新的三维向量。
     * @param a a三维向量。
     * @param b b三维向量。
     * @param out 结果三维向量。
     */
    static max(a: Vector3, b: Vector3, out: Vector3): void {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
    }

    /**
     * 计算标量长度。
     * @param a 源三维向量。
     * @return 标量长度。
     */
    static scalarLength(a: Vector3): number {
        var x = a.x, y = a.y, z = a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * 计算标量长度的平方。
     * @param a 源三维向量。
     * @return 标量长度的平方。
     */
    static scalarLengthSquared(a: Vector3): number {
        var x = a.x, y = a.y, z = a.z;
        return x * x + y * y + z * z;
    }

    /**
     * 归一化三维向量。
     * @param s 源三维向量。
     * @param out 输出三维向量。
     */
    static normalize(s: Vector3, out: Vector3): void {
        var x = s.x, y = s.y, z = s.z;
        var len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
        }
    }

    /**
     * 计算两个三维向量的乘积。
     * @param a left三维向量。
     * @param b right三维向量。
     * @param out 输出三维向量。
     */
    static multiply(a: Vector3, b: Vector3, out: Vector3): void {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        out.z = a.z * b.z;
    }

    /**
     * 缩放三维向量。
     * @param a 源三维向量。
     * @param b 缩放值。
     * @param out 输出三维向量。
     */
    static scale(a: Vector3, b: number, out: Vector3): void {
        out.x = a.x * b;
        out.y = a.y * b;
        out.z = a.z * b;
    }

    /**
     * 插值三维向量。
     * @param a left向量。
     * @param b right向量。
     * @param t 插值比例。
     * @param out 输出向量。
     */
    static lerp(a: Vector3, b: Vector3, t: number, out: Vector3): void {
        var ax = a.x, ay = a.y, az = a.z;
        out.x = ax + t * (b.x - ax);
        out.y = ay + t * (b.y - ay);
        out.z = az + t * (b.z - az);
    }

    /**
     * 求一个指定范围的向量
     * @param value clamp向量
     * @param min 最小
     * @param max 最大
     * @param out 输出向量
     */
    static Clamp(value: Vector3, min: Vector3, max: Vector3, out: Vector3): void {
        var x = value.x;
        var y = value.y;
        var z = value.z;
        var mineX = min.x;
        var mineY = min.y;
        var mineZ = min.z;
        var maxeX = max.x;
        var maxeY = max.y;
        var maxeZ = max.z;
        x = (x > maxeX) ? maxeX : x;
        x = (x < mineX) ? mineX : x;
        y = (y > maxeY) ? maxeY : y;
        y = (y < mineY) ? mineY : y;
        z = (z > maxeZ) ? maxeZ : z;
        z = (z < mineZ) ? mineZ : z;
        out.x = x;
        out.y = y;
        out.z = z;
    }

    /**
     * 求两个三维向量的和。
     * @param a left三维向量。
     * @param b right三维向量。
     * @param out 输出向量。
     */
    static add(a: Vector3, b: Vector3, out: Vector3): void {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
    }

    /**
     * 求两个三维向量的差。
     * @param a left三维向量。
     * @param b right三维向量。
     * @param o out 输出向量。
     */
    static subtract(a: Vector3, b: Vector3, o: Vector3): void {
        o.x = a.x - b.x;
        o.y = a.y - b.y;
        o.z = a.z - b.z;
    }

    /**
     * 求两个三维向量的叉乘。
     * @param a left向量。
     * @param b right向量。
     * @param o 输出向量。
     */
    static cross(a: Vector3, b: Vector3, o: Vector3): void {
        var ax = a.x, ay = a.y, az = a.z, bx = b.x, by = b.y, bz = b.z;
        o.x = ay * bz - az * by;
        o.y = az * bx - ax * bz;
        o.z = ax * by - ay * bx;
    }

    /**
     * 求两个三维向量的点积。
     * @param a left向量。
     * @param b right向量。
     * @return 点积。
     */
    static dot(a: Vector3, b: Vector3): number {
        return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
    }

    /**
     * 判断两个三维向量是否相等。
     * @param a 三维向量。
     * @param b 三维向量。
     * @return 是否相等。
     */
    static equals(a: Vector3, b: Vector3): boolean {
        return MathUtils3D.nearEqual(a.x, b.x) && MathUtils3D.nearEqual(a.y, b.y) && MathUtils3D.nearEqual(a.z, b.z);
    }
}

