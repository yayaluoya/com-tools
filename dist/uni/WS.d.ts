import { BaseEvent } from "../BaseEvent";
import { IWS } from "../http/BaseWS";
/**
 * WebSocket的包装体
 */
export declare class WS extends BaseEvent implements IWS {
    constructor(url: any);
    /** 发送消息 */
    send(data: any): void;
    /** 关闭 */
    close(): void;
}
//# sourceMappingURL=WS.d.ts.map