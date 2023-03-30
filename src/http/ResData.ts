import { HttpStatus } from "./HttpStatus";

/**
 * 响应数据
 */
export class ResData<D = any, R = any> {
    /** 状态码 */
    status: number;
    /** 消息 */
    msg: string;
    /** 时间戳 */
    timeStamp: number;
    /** 真实数据 */
    data: D;
    /** 原始res */
    res?: R;

    /** 其它数据 */
    [key: string]: any;

    constructor(data: D = null, status: number = HttpStatus.OK, mes: string = '', timeStamp: number = Date.now(), res?: R) {
        this.data = data;
        this.msg = mes;
        this.status = status;
        this.timeStamp = timeStamp;
        this.res = res;
    }

    /**
     * 失败
     * @param msg 
     * @returns 
     */
    fail(msg: string = '请求失败'): this {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.msg = msg;
        return this;
    }

    /** 转成字符串 */
    toString() {
        return JSON.stringify(this);
    }

    /**
     * 融合另一个res
     * @param res 
     */
    mix(resD: ResData): this {
        this.data = resD.data;
        this.msg = resD.msg;
        this.status = resD.status;
        this.timeStamp = resD.timeStamp;
        this.res = resD.res;
        return this;
    }
}