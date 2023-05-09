import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';

/**
 * 案件按下事件管理器
 */
@instanceTool()
export class KeydownE<T extends string = string> extends BaseEvent<'keydown' | T> {
    /** 单例 */
    static readonly instance: KeydownE;
    static readonly I: KeydownE;

    constructor() {
        super();
        window.addEventListener('keydown', (e) => {
            this.emit('keydown', e);
        });
    }
}
