import { BaseEvent } from '../BaseEvent';
import { cleanProxyObjCon, createProxyObj } from '../obj/createProxyObj';
import { ObjectUtils } from '../obj/ObjectUtils';
import { ILocalStorage_ } from './ILocalStorage_';

/**
 * 基类本地数据代理
 * 一个通用的版本，需要根据不同的应用场景封装
 */
export abstract class BaseDataProxy<D = any> extends BaseEvent<
  'update' | 'set' | 'save'
> {
  /** 数据 */
  private _data: D | any;
  /** 是否编辑 */
  private _ifEdit = false;
  /** 状态码 */
  private stateCode = 0;

  /** localStorage处理器 */
  abstract get LocalStorage_(): ILocalStorage_;

  /** 保存的名字，默认是类名 */
  protected get name(): string {
    return `${this.constructor.name}`;
  }

  /** 数据 */
  get data(): D {
    return this._data;
  }

  /** 设置数据，要注意之前加的监听将会失去意义 */
  set data(_d: D) {
    if (this._data !== _d) {
      this.getLocalData(_d);
    }
  }

  /** 获取一份克隆数据 */
  get cloneData(): D {
    return ObjectUtils.clone2(this._data);
  }

  protected constructor() {
    super();
    this.getLocalData();
  }

  /**
   * 获取本地数据
   * @param _data 指定一个数据，如果不存在且本地没有数据的话则会调用获取数据的方法获取数据
   */
  private getLocalData(_data?: any) {
    let data;
    if (_data) {
      cleanProxyObjCon(this._data);
      this.LocalStorage_.setItem(this.name, _data, (s) => {
        return this.dataHandle(s, 'set');
      });
      data = _data;
      this.update(true);
    } else {
      data = this.LocalStorage_.getItem(this.name, (s) => {
        return this.dataHandle(s, 'get');
      });
      if (!data) {
        data = this.getNewData();
        this.update(true);
      }
    }
    //外部额外处理下
    this._data = this.getLocalDataHandle(
      createProxyObj(data, {
        set: (...arg) => {
          this.setBack(...arg);
        },
      }),
    );
  }

  /** 数据修改回调 */
  private setBack(
    target: any = null,
    p: string | symbol = '',
    newValue: any = null,
    value: any = null,
    objKey: symbol,
  ) {
    //触发事件
    this.emit('set', target, p, newValue, value, objKey);
    //
    this.update(false);
  }

  /** 更新 */
  private update(f = false) {
    if (f) {
      this.stateCode++;
      this._ifEdit = false;
    }
    if (this._ifEdit) {
      return;
    }
    this.emit('update');
    this._ifEdit = true;
    let _stateCode: number = this.stateCode;
    //用微任务来执行保存方法
    Promise.resolve().then(() => {
      /** 状态码不一样了的话说明根数据发生了变化，此时就不用在保存之前的数据了 */
      if (_stateCode != this.stateCode) {
        return;
      }
      this._ifEdit = false;
      //
      this.save();
    });
  }

  /** 保存数据 */
  save() {
    this.LocalStorage_.setItem(this.name, this.data, (s) => {
      return this.dataHandle(s, 'set');
    });
    this.emit('save');
  }

  /** 获取一份新数据 */
  protected abstract getNewData(): D | null;

  /** 数据处理，可以在数据被获取和设置前做加密解密操作 */
  protected dataHandle(str: string, type: 'get' | 'set'): string {
    return str;
  }

  /** 获取本地数据并代理后的回调处理 */
  protected getLocalDataHandle(data: D): D {
    return data;
  }
}
