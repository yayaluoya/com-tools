import { HttpStatus } from "./HttpStatus";

/**
 * 响应数据
 */
export class ResData<D = any> {
    /** 状态码 */
    status: number;
    /** 消息 */
    msg: string;
    /** 时间戳 */
    timeStamp: number;
    /** 真实数据 */
    data: D;

    /** 其它数据 */
    [key: string]: any;

    constructor(d: D = null, status: number = HttpStatus.OK, mes: string = '', timeStamp: number = Date.now()) {
        this.data = d;
        this.msg = mes;
        this.status = status;
        this.timeStamp = timeStamp;
    }

    /**
     * 失败
     * @param msg 
     * @returns 
     */
    fail(msg: string): this {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.msg = msg;
        return this;
    }
}