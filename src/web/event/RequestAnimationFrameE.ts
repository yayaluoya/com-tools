import {BaseEvent} from "../../BaseEvent";
import {instanceTool} from "../../instanceTool";

/**
 * RequestAnimationFrame事件
 */
@instanceTool()
export class RequestAnimationFrameE<T extends string = string> extends BaseEvent<'exec' | T> {
    /** 单例 */
    static readonly instance: RequestAnimationFrameE;
    static readonly I: RequestAnimationFrameE;

    constructor() {
        super();
        let time = Date.now();
        let f = () => {
            this.emit("exec", Date.now() - time);
            time = Date.now();
            requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    }
}