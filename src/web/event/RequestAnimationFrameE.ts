import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * RequestAnimationFrame事件
 */
@instanceTool()
export class RequestAnimationFrameE<T extends string> extends BaseEvent<'exec' | T> {
    /** 单例 */
    static instance: RequestAnimationFrameE<'exec'>;

    constructor() {
        super();
        let f = () => {
            this.emit('exec');
            requestAnimationFrame(f);
        }
        f();
    }
}