import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';
import { createThrottleFun } from '../../throttleAntiShake';

/**
 * 屏幕滚动事件管理器
 */
@instanceTool()
export class ScrollE<T extends string = string> extends BaseEvent<'scroll' | T> {
    /** 单例 */
    static readonly instance: ScrollE;
    static readonly I: ScrollE;

    constructor() {
        super();
        let f = createThrottleFun(() => {
            this.emit('scroll', document.documentElement.scrollTop);
        }, 20);
        window.addEventListener('scroll', f);
    }
}
