import { BaseEvent } from '../BaseEvent';

/**
 * 基类WS
 * 通过事件基类来分发消息事件，从而精准匹配消息类型
 */
export abstract class BaseWS extends BaseEvent {
    static wsp: Promise<IWS>;
    static iList = [];
    static key;

    protected constructor() {
        super();
        BaseWS.iList.push(this);
    }

    /**
     * 开始
     * @param {*} key
     */
    static start(key) {
        this.key = key;
        let ws = this.getWS(key);
        this.wsp = new Promise((r, e) => {
            let t = setTimeout(() => {
                e();
            }, 1000 * 60);
            //
            ws.on('open', undefined, () => {
                clearTimeout(t);
                r(ws);
            });
        });
        // 重连
        ws.on('error', undefined, () => {
            this.close().then(() => {
                this.start(this.key);
            });
        });
        this.handMessage();
        this.palpitate();
    }

    static palpitateTime;

    /** 发送心跳包 */
    static palpitate() {
        let op = this.getPalpitateOp();
        this.palpitateTime = setTimeout(() => {
            this.send(op.data).finally(() => {
                this.palpitate();
            });
        }, op.time);
    }

    /** 关闭 */
    static close() {
        clearTimeout(this.palpitateTime);
        return this.wsp.then((ws) => {
            return new Promise<void>((r, e) => {
                ws.on('close', undefined, () => {
                    r();
                });
                ws.close();
            });
        });
    }

    /**
     * 发送消息
     * @param {*} data
     */
    static send(data) {
        return this.wsp.then((ws) => {
            ws.send(JSON.stringify(data));
        });
    }

    /**
     * 处理消息
     */
    static handMessage() {
        this.wsp.then((ws) => {
            ws.on('message', undefined, (res) => {
                let data = res.data;
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.error('解析消息失败', e);
                    return;
                }
                //
                BaseWS.iList.forEach((_) => {
                    _.emit('message', data);
                });
            });
        });
    }

    /**
     * 获取发送心跳包的时间和数据
     * TODO 必要时重写
     * @returns
     */
    protected static getPalpitateOp(): {
        data: any;
        time: number;
    } {
        return {
            data: 'palpitate',
            time: 1000 * 60,
        };
    }

    /**
     * 获取 WS 的方法
     * TODO 必须重写
     * @param key 一个唯一标识符
     * @returns
     */
    protected static getWS(key: string): IWS {
        return null;
    }
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
