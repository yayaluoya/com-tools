import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * 鼠标事件
 */
@instanceTool()
export class MouseE extends BaseEvent<
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
> {
  /** 单例 */
  static readonly instance: MouseE;
  /** 单例 */
  static readonly I: MouseE;

  constructor() {
    super();
    //
    window.addEventListener('mousedown', (e) => {
      this.emit('mousedown', e);
    });
    window.addEventListener('mouseenter', (e) => {
      this.emit('mouseenter', e);
    });
    window.addEventListener('mouseleave', (e) => {
      this.emit('mouseleave', e);
    });
    window.addEventListener('mousemove', (e) => {
      this.emit('mousemove', e);
    });
    window.addEventListener('mouseout', (e) => {
      this.emit('mouseout', e);
    });
    window.addEventListener('mouseover', (e) => {
      this.emit('mouseover', e);
    });
    window.addEventListener('mouseup', (e) => {
      this.emit('mouseup', e);
    });
  }
}
