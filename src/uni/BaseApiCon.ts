import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { ResData } from "../http/ResData";
import { ObjectUtils } from "../obj/ObjectUtils";

/**
 * 基类Api控制器
 */
export abstract class BaseApiCon extends BaseApiCon_<RequestOptions, RequestSuccessCallbackResult> {

    /** 可配置选项 */
    protected get op(): Omit<RequestOptions, 'url' | 'data'> {
        return {}
    };

    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns 
     */
    request(op: RequestOptions) {
        //添加请求拦截器
        return this.request_(ObjectUtils.merge(this.op || {}, op))
            .then((config) => {
                return new Promise<RequestSuccessCallbackResult>((r, e) => {
                    uni.request({
                        ...config,
                        success: r,
                        fail: e,
                    });
                });
            }
            )
            .then(res => {
                //添加响应拦截
                return this.response_(res);
            });
    }

    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op 
     */
    requestData<D>(_op: RequestOptions) {
        return this.request(_op)
            .catch((res) => {
                throw this.resData_(res?.data, false, res);
            })
            .then((res) => {
                return this.resData_(res.data, true, res) as ResData<D>;
            });
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     * TODO 重写以重构ResData
     */
    protected resData_(data: any, con: boolean, res: RequestSuccessCallbackResult): ResData {
        return data;
    }
}