import {BaseEvent} from "../BaseEvent";
import {IWS} from "../http/BaseWS";

/**
 * WebSocket的包装体
 */
export class WS extends BaseEvent<
    'close' |
    'error' |
    'message' |
    'open'
> implements IWS {

    constructor(url) {
        super();

        uni.connectSocket({
            url,
        });

        //转换事件
        uni.onSocketOpen((op) => {
            this.emit('open', op);
        });
        uni.onSocketError((op) => {
            this.emit('error', op);
        });
        uni.onSocketMessage((op) => {
            this.emit('message', op);
        });
        uni.onSocketClose((op) => {
            this.emit('close', op);
        });
    }

    /** 发送消息 */
    send(data) {
        uni.sendSocketMessage({
            data,
        });
    }

    /** 关闭 */
    close() {
        uni.closeSocket();
    }
}