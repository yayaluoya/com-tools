import { ObjectUtils } from "../ObjectUtils";
import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { ResData } from "src/http/ResData";

interface UniRequestConfig {
    /** 开发者服务器接口地址 */
    url: string;
    /** 请求的参数 */
    data?: Record<string, any> | string | ArrayBuffer;
    /** 设置请求的 header，header 中不能设置 Referer。 */
    header?: Record<string, any>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE';
    /** 超时时间，单位 ms */
    timeout?: number;
    /** 如果设为 json，会尝试对返回的数据做一次 JSON.parse */
    dataType?: string;
    /** 设置响应的数据类型。合法值：text、arraybuffer */
    responseType?: string;
    /** 验证 ssl 证书 */
    sslVerify?: boolean;
    /** 跨域请求时是否携带凭证（cookies） */
    withCredentials?: boolean;
    /** DNS解析时优先使用ipv4 */
    firstIpv4?: boolean;
}

interface UniResponse {
    /** 开发者服务器返回的数据 */
    data: any;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
    /** 开发者服务器返回的 HTTP Response Header */
    header: any;
    /** 开发者服务器返回的 cookies，格式为字符串数组 */
    cookies: string[];
}

/**
 * 基类Api控制器
 */
export abstract class BaseApiCon extends BaseApiCon_ {

    /** 可配置选项 */
    protected get op(): Omit<UniRequestConfig, 'url' | 'data'> {
        return {}
    };

    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns 
     */
    request(op: UniRequestConfig) {
        //添加请求拦截器
        return this.request_(ObjectUtils.merge(this.op || {}, op))
            .then((config) => {
                return new Promise<UniResponse>((r, e) => {
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
    requestData<D>(_op: UniRequestConfig) {
        return this.request(_op)
            .catch((res) => {
                throw this.resData_(res.data, false, res);
            })
            .then((res) => {
                return this.resData_(res.data, true, res) as ResData<D>;
            });
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    protected abstract resData_(data: any, con: boolean, res: UniResponse): ResData;
}