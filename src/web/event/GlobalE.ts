import { BaseEvent } from "../../BaseEvent";
import { instanceTool } from "../../instanceTool";

/**
 * 全局事件
 */
@instanceTool()
export class GlobalE extends BaseEvent {
    /** 单例 */
    static instance: GlobalE;
}