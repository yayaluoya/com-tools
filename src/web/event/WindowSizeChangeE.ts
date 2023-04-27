import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * 窗口大小改变事件
 */
@instanceTool()
export class WindowSizeChangeE<T extends string = string> extends BaseEvent<'resize' | T> {
    /** 单例 */
    static readonly instance: WindowSizeChangeE;
    static readonly I: WindowSizeChangeE;

    constructor() {
        super();
        addEventListener('resize', () => {
            this.emit('resize');
        });
    }
}