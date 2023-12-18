/**
 * 3D相关的数学工具
 */
export class MathUtils3D {
  /**
   * 单精度浮点(float)零的容差
   */
  static zeroTolerance = 1e-6;
  /**
   * 浮点数默认最大值
   */
  static MaxValue = 3.40282347e38;
  /**
   * 浮点数默认最小值
   */
  static MinValue = -3.40282347e38;
  /**
   * 角度转弧度系数
   */
  static Deg2Rad = Math.PI / 180;

  static isZero(v) {
    return Math.abs(v) < MathUtils3D.zeroTolerance;
  }

  static nearEqual(n1, n2) {
    return MathUtils3D.isZero(n1 - n2);
  }

  static fastInvSqrt(value) {
    if (MathUtils3D.isZero(value)) return value;
    return 1.0 / Math.sqrt(value);
  }
}
