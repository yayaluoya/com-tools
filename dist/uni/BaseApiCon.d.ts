/// <reference types="uni-app" />
import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { ResData } from "src/http/ResData";
/**
 * 基类Api控制器
 */
export declare abstract class BaseApiCon extends BaseApiCon_ {
    /** 可配置选项 */
    protected get op(): Omit<RequestOptions, 'url' | 'data'>;
    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns
     */
    request(op: RequestOptions): Promise<RequestSuccessCallbackResult>;
    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op
     */
    requestData<D>(_op: RequestOptions): Promise<ResData<D>>;
    /**
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    protected abstract resData_(data: any, con: boolean, res: RequestSuccessCallbackResult): ResData;
}
