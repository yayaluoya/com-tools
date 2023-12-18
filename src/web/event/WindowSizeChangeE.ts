import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * 窗口大小改变事件
 */
@instanceTool()
export class WindowSizeChangeE extends BaseEvent<'resize'> {
  /** 单例 */
  static readonly instance: WindowSizeChangeE;
  static readonly I: WindowSizeChangeE;

  constructor() {
    super();
    addEventListener('resize', (e) => {
      this.emit('resize', e);
    });
  }
}
