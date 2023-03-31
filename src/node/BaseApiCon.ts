import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiCon as BaseApiCon_ } from "../http/BaseApiCon";
import { HttpStatus } from "../http/HttpStatus";
import { IComApiResType } from "../http/IComApiResType";
import { ResData } from "../http/ResData";
import { ObjectUtils } from "../obj/ObjectUtils";

/**
 * 基类Api控制器
 * TODO node.js和浏览器端都可以用
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
        return this.request_(
            ObjectUtils.merge(this.op || {}, op)
        )
            .then((config) => {
                return this.axiosI(config)
                    .then(res => {
                        return this.response_(res);
                    });
            });
    }

    requestData<D = any>(op: AxiosRequestConfig) {
        return this.request(op)
            .catch((error: AxiosError) => {
                throw this.resDataError_(error);
            })
            .then((res) => {
                return this.resData_(res) as ResData<D>;
            });
    }

    getData<D = any>(op: AxiosRequestConfig) {
        return this.requestData<D>({
            ...op,
            method: 'get',
        });
    }
    postData<D = any>(op: AxiosRequestConfig) {
        return this.requestData<D>({
            ...op,
            method: 'post',
        });
    }
    putData<D = any>(op: AxiosRequestConfig) {
        return this.requestData<D>({
            ...op,
            method: 'put',
        });
    }
    deleteData<D = any>(op: AxiosRequestConfig) {
        return this.requestData<D>({
            ...op,
            method: 'delete',
        });
    }

    /**
     * 响应数据获取
     * TODO 重新处理resData中的状态码问题，如果错误请抛出ResData类型异常
     * @param res
     * @returns 
     */
    protected resData_(res: AxiosResponse) {
        return new ResData().mix(res.data);
    }

    /**
     * 响应数据失败处理
     * @param error 
     */
    protected resDataError_(error: AxiosError) {
        throw new ResData(null, error.response?.status || HttpStatus.BAD_REQUEST, error.message || '', Date.now(), error.response);
    }
}