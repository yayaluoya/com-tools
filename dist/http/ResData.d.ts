/**
 * 响应数据
 */
export declare class ResData<D = any> {
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
    constructor(d?: D, status?: number, mes?: string, timeStamp?: number);
}
//# sourceMappingURL=ResData.d.ts.map