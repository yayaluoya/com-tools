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
        return this.request_(
            ObjectUtils.merge(this.op || {}, op)
        )
            .then((config) => {
                return this.axiosI(config)
                    .catch(({ response }) => {
                        //
                        throw response;
                    })
                    .then(res => {
                        return this.response_(res);
                    });
            });
    }

    requestData<D = any>(op: AxiosRequestConfig) {
        return this.request(op)
            .catch((res) => {
                throw this.resData_(false, res, res?.data);
            })
            .then((res) => {
                return this.resData_(true, res, res?.data) as ResData<D>;
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
     * @param con 请求是否成功
     * @param res response
     * @param data response中的数据
     * @returns 
     */
    protected resData_(con: boolean, res?: AxiosResponse, data?: any): ResData {
        return new ResData(data, res?.status, '', undefined, res);
    }
}