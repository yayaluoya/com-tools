import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { IComApiResType } from "../http/IComApiResType";
import { ResData } from "../http/ResData";
import { ObjectUtils } from "../obj/ObjectUtils";

/**
 * 基类Api控制器
 */
export abstract class BaseApiCon extends BaseApiCon_<RequestOptions, RequestSuccessCallbackResult> implements IComApiResType<RequestOptions> {

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
                throw this.resData_(false, res, res?.data);
            })
            .then((res) => {
                return this.resData_(true, res, res?.data) as ResData<D>;
            });
    }

    requestDataData<D = any>(op: RequestOptions) {
        return this.requestData<D>(op).then(({ data }) => data);
    }

    getData<D = any>(op: RequestOptions) {
        return this.requestDataData<D>({
            ...op,
            method: 'GET',
        });
    }
    postData<D = any>(op: RequestOptions) {
        return this.requestDataData<D>({
            ...op,
            method: 'POST',
        });
    }
    putData<D = any>(op: RequestOptions) {
        return this.requestDataData<D>({
            ...op,
            method: 'PUT',
        });
    }
    deleteData<D = any>(op: RequestOptions) {
        return this.requestDataData<D>({
            ...op,
            method: 'DELETE',
        });
    }

    /**
     * 响应数据获取
     * @param con 请求是否成功
     * @param res response
     * @param data response中的数据
     * @returns 
     */
    protected resData_(con: boolean, res?: RequestSuccessCallbackResult, data?: any): ResData {
        return data;
    }
}