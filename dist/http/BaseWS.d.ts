import { BaseEvent } from "../BaseEvent";
/**
 * 基类WS
 * 通过事件基类来分发消息事件，从而精准匹配消息类型
 */
export declare abstract class BaseWS extends BaseEvent {
    static wsp: Promise<IWS>;
    static iList: any[];
    static key: any;
    constructor();
    /**
     * 开始
     * @param {*} key
     */
    static start(key: any): void;
    static palpitateTime: any;
    /** 发送心跳包 */
    static palpitate(): void;
    /** 关闭 */
    static close(): Promise<void>;
    /**
     * 发送消息
     * @param {*} data
     */
    static send(data: any): Promise<void>;
    /**
     * 处理消息
     */
    static handMessage(): void;
    /**
     * 获取发送心跳包的时间和数据
     * TODO 必要时重写
     * @returns
     */
    protected static getPalpitateOp(): {
        data: any;
        time: number;
    };
    /**
     * 获取 WS 的方法
     * TODO 必须重写
     * @param url
     * @returns
     */
    protected static getWS(key: string): IWS;
}
/**
 * 实现 WS 的接口
 */
export interface IWS extends BaseEvent {
    /** 关闭 */
    close(): void;
    /** 发送消息 */
    send(data: any | ArrayBuffer): void;
}
//# sourceMappingURL=BaseWS.d.ts.map