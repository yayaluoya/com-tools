import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { IComApiResType } from "../http/IComApiResType";
import { ResData } from "../http/ResData";
import { ObjectUtils } from "../obj/ObjectUtils";

/**
 * 基类Api控制器
 */
export abstract class BaseApiCon extends BaseApiCon_<AxiosRequestConfig, AxiosResponse> implements IComApiResType<AxiosRequestConfig> {
    /** axios实例 */
    axiosI: AxiosInstance;

    /** 可配置选项 */
    protected get op(): AxiosRequestConfig {
        return {}
    };

    constructor() {
        super();
        this.axiosI = axios.create();
    }

    request(op: AxiosRequestConfig) {
        //添加请求拦截器
        return this.request_(ObjectUtils.merge(this.op || {}, op))
            .then((config) => {
                return this.axiosI(config)
                    //先把异常中的res提取出来
                    .catch(({ response }) => {
                        //
                        throw response;
                    })
                    .then(res => {
                        //添加响应拦截
                        return this.response_(res);
                    });
            });
    }

    requestData<D = any>(_op: AxiosRequestConfig) {
        return this.request(_op)
            .catch((res) => {
                throw this.resData_(res?.data, false, res);
            })
            .then((res) => {
                return this.resData_(res.data, true, res) as ResData<D>;
            });
    }

    requestDataData<D = any>(op: AxiosRequestConfig) {
        return this.requestData<D>(op).then(({ data }) => data);
    }

    getData<D = any>(op: AxiosRequestConfig) {
        return this.requestDataData<D>({
            ...op,
            method: 'get',
        });
    }
    postData<D = any>(op: AxiosRequestConfig) {
        return this.requestDataData<D>({
            ...op,
            method: 'post',
        });
    }
    putData<D = any>(op: AxiosRequestConfig) {
        return this.requestDataData<D>({
            ...op,
            method: 'put',
        });
    }
    deleteData<D = any>(op: AxiosRequestConfig) {
        return this.requestDataData<D>({
            ...op,
            method: 'delete',
        });
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     * TODO 重写以重构ResData
     */
    protected resData_(data: any, con: boolean, res: AxiosResponse): ResData {
        return data;
    }
}