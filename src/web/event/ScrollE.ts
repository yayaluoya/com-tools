import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";
import { createThrottleFun } from "../../throttleAntiShake";

/**
 * 屏幕滚动事件管理器
 */
@instanceTool()
export class ScrollE extends BaseEvent<'scroll'> {
    /** 单例 */
    static readonly instance: ScrollE;

    constructor() {
        super();
        let f = createThrottleFun(() => {
            this.emit('scroll', document.documentElement.scrollTop);
        }, 20);
        window.addEventListener('scroll', f);
    }
}
