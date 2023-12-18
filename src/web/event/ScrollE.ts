import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';
import { createThrottleFun } from '../../throttleAntiShake';

/**
 * 屏幕滚动事件
 */
@instanceTool()
export class ScrollE extends BaseEvent<'scroll' | 'top' | 'bottom'> {
  /** 单例 */
  static readonly instance: ScrollE;
  /** 单例 */
  static readonly I: ScrollE;

  constructor() {
    super();
    let f = createThrottleFun(() => {
      this.emit('scroll', document.documentElement.scrollTop);
      if (document.documentElement.scrollTop <= 0) {
        this.emit('top');
      }
      if (
        document.documentElement.scrollTop + document.documentElement.clientHeight ==
        document.documentElement.scrollHeight
      ) {
        this.emit('bottom');
      }
    }, 20);
    window.addEventListener('scroll', f);
  }
}
