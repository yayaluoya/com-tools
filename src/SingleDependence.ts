/**
 * 单依赖文件
 * TODO 为了解决循环依赖问题
 */
export class SingleDependence {
  private static mapping = new Map();

  /**
   * 添加
   * @param key
   * @param value
   */
  static add(key: any, value: any) {
    this.mapping.set(key, value);
  }

  /**
   * 获取
   * @param key
   * @returns
   */
  static get<T>(key: any): T {
    return this.mapping.get(key);
  }
}
