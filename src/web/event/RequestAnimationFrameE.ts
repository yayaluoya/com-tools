import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * RequestAnimationFrame事件
 */
@instanceTool()
export class RequestAnimationFrameE extends BaseEvent<'exec' | 'e'> {
  /** 单例 */
  static readonly instance: RequestAnimationFrameE;
  /** 单例 */
  static readonly I: RequestAnimationFrameE;

  constructor() {
    super();
    let time = Date.now();
    let f = () => {
      let now = Date.now();
      this.emit('exec', now - time);
      this.emit('e', now - time);
      time = now;
      requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }
}
