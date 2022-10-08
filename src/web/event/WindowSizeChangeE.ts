import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * 窗口大小改变事件
 */
@instanceTool()
export class WindowSizeChangeE extends BaseEvent<'resize'> {
    /** 单例 */
    static instance: WindowSizeChangeE;

    constructor() {
        super();
        addEventListener('resize', () => {
            this.emit('resize');
        });
    }
}