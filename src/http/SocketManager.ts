import { instanceTool } from "../instanceTool";
import { Server, WebSocket, WebSocketServer } from 'ws';
import { URLT } from "./URLT";
import { ArrayUtils } from "../ArrayUtils";
import { HttpTool } from "../node/HttpTool";
import { BaseEvent } from "../BaseEvent";

/**
 * key 对比
 */
function keyContrast(key: string, key2: string): boolean {
    key = key.replace(/^\/+|\/+$/g, '');
    return key == key2 || new RegExp(`^(/+)?${key}(/+)?$`, 'i').test(key2);
}

/**
 * Socket管理器
 */
@instanceTool()
export class SocketManager extends BaseEvent<
    'connection' |
    'message' |
    'close'
> {
    /** 单例 */
    static instance: SocketManager;

    /** ws 服务 实例 */
    wss: Server<WebSocket>;
    /** 连接socket列表 */
    wsList: {
        /** ws实例列表 */
        wss: {
            ws: WebSocket;
            /** 时间戳，用来保持长连接的 */
            time: number,
        }[],
        /** 连接时带的key */
        key: string,
    }[] = [];

    /** 所有的连接数 */
    get length(): number {
        return this.wsList.reduce((a, b) => {
            return a + b.wss.length;
        }, 0);
    }

    /**
     * 开始服务
     * @param port 端口
     * @param checkTime 心跳监测时间
     */
    start(port: number, checkTime: number = 30 * 60 * 1000) {
        this.wss = new WebSocketServer({ port });
        this.wss.on('connection', (ws, req) => {
            let item = this.wsList.find(_ => URLT.contrast(req.url, _.key));
            if (!item) {
                item = {
                    wss: [{
                        ws,
                        time: Date.now(),
                    }],
                    key: req.url,
                };
                this.wsList.push(item);
            } else {
                item.wss.push({
                    ws,
                    time: Date.now(),
                });
            }
            //有消息就更新时间戳
            ws.addListener('message', (data) => {
                let wsItem = item.wss.find(_ => _.ws == ws);
                wsItem.time = Date.now();
                //
                this.emit('message', ws, req, data);
            });
            ws.on('close', () => {
                ArrayUtils.eliminate(item.wss, (_) => ws == _.ws);
                //
                this.emit('close');
            });
            //
            this.emit('connection', ws, req);
        });
        // 
        this.check(checkTime);
        //
        console.log(`webSocket服务 ws://${HttpTool.hostname}:${port}`);
    }

    /**
     * 发送消息
     * @param key 目标key
     * @param data 消息体
     */
    sendMsg(key: string, data: any): number {
        let n = 0;
        this.wsList.forEach(_ => {
            if (keyContrast(key, _.key)) {
                _.wss.forEach(_ => {
                    n++;
                    _.ws.send(data);
                });
            }
        });
        return n;
    }

    /** 心跳监测 */
    protected check(time) {
        setTimeout(() => {
            this.wsList.forEach(({ wss }) => {
                wss.forEach(({ ws, time }) => {
                    if (Math.abs(time - Date.now()) >= time) {
                        ws.close();
                    }
                })
            });
            this.check(time);
        }, time);
    }
}