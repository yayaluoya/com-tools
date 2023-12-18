import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * 按键事件
 */
@instanceTool()
export class KeyboardE extends BaseEvent<'keydown' | 'keypress' | 'keyup'> {
  /** 单例 */
  static readonly instance: KeyboardE;
  /** 单例 */
  static readonly I: KeyboardE;

  constructor() {
    super();
    //
    window.addEventListener('keydown', (e) => {
      this.emit('keydown', e);
    });
    window.addEventListener('keypress', (e) => {
      this.emit('keypress', e);
    });
    window.addEventListener('keyup', (e) => {
      this.emit('keyup', e);
    });
  }
}
