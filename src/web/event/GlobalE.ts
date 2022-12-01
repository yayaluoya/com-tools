import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * 全局事件
 */
@instanceTool()
export class GlobalE<T extends string> extends BaseEvent<T> {
    /** 单例 */
    static instance: GlobalE<string>;
}