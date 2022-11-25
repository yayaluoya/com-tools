import { BaseEvent } from "../BaseEvent";
import { IWS } from "../http/BaseWS";

/**
 * WebSocket的包装体
 */
export class WS extends BaseEvent<
    'close' |
    'error' |
    'message' |
    'open'
> implements IWS {
    /** ws 实例 */
    ws;

    constructor(url) {
        super();

        this.ws = new WebSocket(url);

        //转换事件
        this.ws.addEventListener('close', (e) => {
            this.emit('close', e);
        });
        this.ws.addEventListener('error', (e) => {
            this.emit('error', e);
        });
        this.ws.addEventListener('message', (e) => {
            this.emit('message', e);
        });
        this.ws.addEventListener('open', (e) => {
            this.emit('open', e);
        });
    }

    /** 发送消息 */
    send(data) {
        this.ws.send(data);
    }

    /** 关闭 */
    close() {
        this.ws.close();
    }
}