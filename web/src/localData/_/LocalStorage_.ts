import { LocalStorageDataProxy } from "./LocalStorageDataProxy";

/**
 * 本地数据类
 * * 一个localStorage的镜像类，有着差不多的方法，但是从这里获取的数据是带有自动保存的功能的。
 */
export class LocalStorage_ {
  /** 缓存数据代理列表 */
  private static catchDataProxys: {
    [index: string]: LocalStorageDataProxy;
  } = {};

  /** 获取本地的全部数据，直接用属性访问 */
  public static get datas(): {
    [index: string]: any
  } {
    return new Proxy({}, {
      /** in操作符 判断有没有 */
      has(target: any, p: string | symbol): boolean {
        return this.getItem(p as string) != null;
      },
      /** 获取 */
      get(target: any, p: string | symbol, receiver: any): any {
        return this.getItem(p as string);
      },
      /** 设置 */
      set(target: any, p: string | symbol, value: any, receiver: any): boolean {
        this.setItem(p as string, value);
        return true;
      },
    });
  }

  /**
   * 获取数据代理
   * 这个对象是可能会动态更改的，所以要用的时候直接从这里获取就行不要另存一份
   * 数据代理可以监听数据的更改，从而做出其他操作
   * 也可以直接更改data
   * @param _index 数据键名
   */
  public static getItemProxy(_index: string) {
    return this.catchDataProxys[_index] || (this.catchDataProxys[_index] = new LocalStorageDataProxy(_index));
  }

  /**
   * 获取数据对象
   * 这个对象是可能会动态更改的，所以要用的时候直接从这里获取就行不要另存一份
   * @param _index 数据键名
   * @param _default 默认值，如果没有的话就以默认值填充
   */
  public static getItem(_index: string, _default: object | string = null) {
    let _dataProxy = this.getItemProxy(_index);
    if (_dataProxy.data === null && _default) {
      this.setItem(_index, _default);
    }
    //返回其中的数据
    return _dataProxy.data;
  }

  /**
   * 设置数据
   * @param _index 数据键名
   * @param _data 数据
   */
  public static setItem(_index: string, _data: object | string) {
    //先获取它的代理器
    this.getItemProxy(_index).data = _data;
  }
}