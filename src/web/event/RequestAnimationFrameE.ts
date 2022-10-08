import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * RequestAnimationFrame事件
 */
@instanceTool()
export class RequestAnimationFrameE extends BaseEvent<'exec'> {
    /** 单例 */
    static instance: RequestAnimationFrameE;

    constructor() {
        super();
        let f = () => {
            this.emit('exec');
            requestAnimationFrame(f);
        }
        f();
    }
}