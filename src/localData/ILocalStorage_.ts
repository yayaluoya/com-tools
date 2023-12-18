/**
 * 封装后本地数据类的接口
 * 将把会数据以json的格式保存
 */
export interface ILocalStorage_ {
  /**
   * 保存数据
   * @param key 名字
   * @param value 值
   * @param _f 设置前处理
   */
  setItem(key: string, value: any, _f?: (s: string) => string);

  /**
   * 获取数据
   * @param key 名字
   * @param _f 获取前处理
   */
  getItem<D = any>(key: string, _f?: (s: string) => string): D | null;

  /**
   * 删除数据
   * @param key 名字
   */
  removeItem(key: string);

  /**
   * 清理本地的全部数据
   */
  clear();
}
