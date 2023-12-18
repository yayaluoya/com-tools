import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * 全局事件
 * 只实现了几个常用事件
 */
@instanceTool()
export class GlobalE<T extends string = never> extends BaseEvent<
  | 'load'
  | 'message'
  | 'resize'
  | 'beforeunload'
  | 'blur'
  | 'focus'
  | 'hashchange'
  | 'storage'
  | T
> {
  /** 单例 */
  static readonly instance: GlobalE;
  /** 单例 */
  static readonly I: GlobalE;

  constructor() {
    super();
    //
    window.addEventListener('beforeunload', (e) => {
      this.emit('beforeunload', e);
    });
    window.addEventListener('load', (e) => {
      this.emit('load', e);
    });
    window.addEventListener('message', (e) => {
      this.emit('message', e);
    });
    window.addEventListener('resize', (e) => {
      this.emit('resize', e);
    });
    window.addEventListener('blur', (e) => {
      this.emit('blur', e);
    });
    window.addEventListener('focus', (e) => {
      this.emit('focus', e);
    });
    window.addEventListener('hashchange', (e) => {
      this.emit('hashchange', e);
    });
    window.addEventListener('storage', (e) => {
      this.emit('storage', e);
    });
  }
}
