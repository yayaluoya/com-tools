import { createMicroTasks } from "../../createMicroTasks";
import { cleanProxyObjFun, createProxyObj, getProxyObjKey } from "./createProxyObj";

/**
 * 本地数据代理
 */
export class LocalStorageDataProxy {
  /** 键名 */
  private key: string;
  /** root数据 */
  private rootData: any;
  /** 状态码 */
  private stateCode: number = 0;

  /** 记录是否编辑 */
  private ifEdit: boolean = false;

  /** 监听器列表 */
  private watchs: {
    this: any,
    fun: Function,
    objKey: symbol,
    key: string | symbol,
  }[] = [];

  /** 获取数据 */
  get data() {
    return this.rootData;
  }
  /** 设置数据 */
  set data(_data: any) {
    if (this.rootData == _data) { return; }
    // 清理掉上一个对象上绑定的回调
    cleanProxyObjFun(this.rootData);
    //
    this._save(_data);
    //重新获取数据
    this.getData();
    //修改编辑状态
    this.ifEdit = false;
  }

  /** 初始化 */
  constructor(key: string) {
    this.key = key;
    this.getData();
  }

  /** 获取数据 */
  public getData() {
    let _data = localStorage.getItem(this.key);
    try {
      //反序列化数据，如果报错则说明是纯字符串，就不用管它了
      _data = JSON.parse(_data);
    }
    catch {
      //
    }
    //获取一个代理数据，并添加监听
    this.rootData = createProxyObj(_data, {
      set: (...arg) => {
        this.setBack(...arg);
      },
    });
    //递增状态码
    this.stateCode++;
  }

  /** 数据修改回调 */
  private setBack(target: any, p: string | symbol, newValue: any, value: any) {
    let _objKey: symbol = getProxyObjKey(target);
    //触发监听
    this.watchs.forEach((item) => {
      if (_objKey == item.objKey && item.key == p) {
        item.fun.call(item.this);
      }
    });
    if (this.ifEdit) { return; }
    this.ifEdit = true;
    let _stateCode: number = this.stateCode;
    //用微任务来执行保存方法
    createMicroTasks(() => {
      /** 状态码不一样了的话说明根数据发送的变化，此时就不用在保存之前的根数据了 */
      if (_stateCode != this.stateCode) { return; }
      //
      this.save();
    });
  }

  /**
   * 监听数据
   * @param _this 执行域
   * @param _fun 执行方法
   * @param _obj 监听对象
   * @param _key 监听键
   */
  public on(_this: any, _fun: Function, _obj: any, _key: string | string[]) {
    let _objKey: symbol = getProxyObjKey(_obj);
    if (!_objKey) { return; }
    if (!Array.isArray(_key)) { _key = [_key]; }
    _key.forEach((key) => {
      this.watchs.push({
        this: _this,
        fun: _fun,
        objKey: _objKey,
        key: key,
      });
    });
  }
  /**
   * 监听一次数据
   * @param _this 执行域
   * @param _fun 执行方法
   * @param _obj 监听对象
   * @param _key 监听键
   */
  public once(_this: any, _fun: Function, _obj: any, _key: string | string[]) {
    let _objKey: symbol = getProxyObjKey(_obj);
    if (!_objKey) { return; }
    if (!Array.isArray(_key)) { _key = [_key]; }
    let __this = this;
    _key.forEach((key) => {
      //把_fun包装成一个执行了一次就删除掉自身的监听方法
      let __fun = function () {
        _fun.call(_this);
        __this.off(_this, __fun);
      }
      this.on(_this, __fun, _obj, key);
    });
  }
  /**
   * 取消监听数据
   * @param _this 执行域
   * @param _fun 执行方法
   */
  public off(_this: any, _fun: Function = undefined) {
    this.watchs = this.watchs.filter((item) => {
      return !(item.this == _this && (_fun ? item.fun == _fun : true));
    });
  }

  /** 
   * 强制保存数据
   */
  public forceSave() {
    this._save(this.rootData);
  }

  /** 保存数据 */
  private save() {
    if (!this.ifEdit) { return; }
    this.ifEdit = false;
    //
    this._save(this.rootData);
  }

  /** 保存数据到本地 */
  private _save(_data: any) {
    if (typeof _data == 'object') {
      _data = JSON.stringify(_data);
    } else if (typeof _data == 'function') {
      _data = '';
    }
    //
    localStorage.setItem(this.key, _data);
  }
}