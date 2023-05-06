import {HttpStatus} from "./HttpStatus";

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
    /** 数据 */
    data: D;
    /** 原始res */
    res?: R;

    /** 其它数据 */
    [key: string]: any;

    /** 状态码 */
    get s() {
        return this.status;
    }

    /** 响应消息 */
    get m() {
        return this.msg;
    }

    /** 数据 */
    get d() {
        return this.data;
    }

    /**
     * 初始化
     * @param data
     * @param status
     * @param mes
     * @param timeStamp
     * @param res
     */
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
     * @param status
     * @returns
     */
    fail(msg: string = '请求失败', status = HttpStatus.INTERNAL_SERVER_ERROR): this {
        this.msg = msg;
        this.status = status;
        return this;
    }

    /** 转成字符串 */
    toString() {
        return JSON.stringify(this);
    }

    /**
     * 混入另一个res
     * @param resD
     */
    mix(resD: ResData): this {
        this.data = resD.data;
        this.msg = resD.msg;
        this.status = resD.status;
        this.timeStamp = resD.timeStamp;
        this.res = resD.res;
        return this;
    }

    /**
     * 返回一个克隆的resData
     */
    clone() {
        return new ResData().mix(this);
    }
}