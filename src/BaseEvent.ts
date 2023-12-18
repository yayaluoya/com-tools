/**
 * 额外的key类型
 */
type keyType = RegExp | { (str: string): boolean };

/**
 * 事件基类
 * 继承此类就可以成为事件调度者了
 */
export class BaseEvent<E extends string | symbol = string | symbol> {
  /** 事件执行列表 */
  private eventList: {
    /** 唯一key */
    key: E | keyType;
    /** 执行域 */
    this: any;
    /** 执行方法 */
    f: Function;
  }[] = [];

  /** 延迟触发事件列表 */
  private delayEventList: Function[] = [];

  /**
   * 监听事件
   * @param key 唯一key
   * @param _this
   * @param f
   */
  on(key: E | keyType, _this: any, f: Function) {
    if (!key) {
      return;
    }
    this.eventList.push({
      key,
      this: _this,
      f,
    });
  }

  /**
   * 监听一次事件
   * @param key 唯一key
   * @param _this
   * @param f
   */
  onOnce(key: E | keyType, _this: any, f: Function) {
    if (!key) {
      return;
    }
    let _that = this;
    //重新包装下该函数
    let _f = function (this: any, ...arg: any[]) {
      //清理调该函数
      _that.off(key, _this, _f);
      //
      f.call(this, ...arg);
    };
    //
    this.eventList.push({
      key,
      this: _this,
      f: _f,
    });
  }

  /**
   * 取消监听
   * 这些参数可以不传，传了就表示要对该参数做判断
   * @param key
   * @param _this
   * @param f
   */
  off(key?: E | keyType, _this?: any, f?: Function) {
    this.eventList = this.eventList.filter((item) => {
      return !(
        (key ? key == item.key : true) &&
        (_this ? _this == item.this : true) &&
        (f ? f == item.f : true)
      );
    });
  }

  /**
   * 触发事件
   * @param key 唯一key
   * @param arg 需要传递的参数
   */
  emit(key: E | keyType, ...arg: any[]) {
    this.eventList.forEach((item) => {
      if (
        item.key === key ||
        (typeof key == 'string' && item.key instanceof RegExp && item.key.test(key)) ||
        (typeof item.key == 'string' && key instanceof RegExp && key.test(item.key)) ||
        (typeof key == 'function' && (key as Function)(item.key)) ||
        (typeof item.key == 'function' && (item.key as Function)(key))
      ) {
        item.f.call(item.this, ...arg);
      }
    });
  }

  /** 延迟触发 */
  deferEmit(key: E | keyType, ...arg: any[]) {
    this.delayEventList.push(() => {
      this.emit(key, ...arg);
    });
  }

  /** 执行延迟触发 */
  exeDeferEmit() {
    this.delayEventList.forEach((f) => {
      f();
    });
    //
    this.clearDeferEmit();
  }

  /** 清理延迟触发事件 */
  clearDeferEmit() {
    this.delayEventList.length = 0;
  }
}
