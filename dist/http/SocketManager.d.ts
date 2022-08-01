import { Server, WebSocket } from 'ws';
/**
 * Socket管理器
 */
export declare class SocketManager {
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
            time: number;
        }[];
        /** 连接时带的key */
        key: string;
    }[];
    /** 所有的连接数 */
    get length(): number;
    /**
     * 开始服务
     * @param port 端口
     * @param checkTime 心跳监测时间
     */
    start(port: number, checkTime?: number): void;
    /**
     * 发送消息
     * @param key 目标key
     * @param data 消息体
     */
    sendMsg(key: string, data: any): number;
    /** 心跳监测 */
    protected check(time: any): void;
}
//# sourceMappingURL=SocketManager.d.ts.map