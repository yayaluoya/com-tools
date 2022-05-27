import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseEvent } from "../BaseEvent";
import { ObjectUtils } from "../ObjectUtils";
import { ResData } from "./ResData";
/**
 * 基类Api控制器
 */
export abstract class BaseApiCon extends BaseEvent {
    /** axios实例 */
    axiosI: AxiosInstance;
    /** 缓存响应列表 */
    private cacheResList: Map<string, Promise<any>> = new Map();

    /** 可配置选项 */
    protected get op(): AxiosRequestConfig {
        return {}
    };

    constructor() {
        super();
        this.axiosI = axios.create();
    }

    /**
     * 设置缓存
     * @param _key 缓存键
     * @param _res 缓存响应
     */
    protected setCache(_key: string, _res: Promise<any>) {
        this.cacheResList.set(_key, _res);
    }

    /**
     * 获取缓存值
     * @param _key 
     * @param _getRes 获取默认值的函数，如果没有找到缓存就调用这个函数并缓存它的返回值
     * @returns 
     */
    protected getChche<T = any>(_key: string, _getRes?: () => Promise<T>): Promise<T> | null {
        if (this.cacheResList.has(_key)) {
            return this.cacheResList.get(_key)!;
        } else if (!!_getRes) {
            let _res = _getRes();
            this.setCache(_key, _res);
            return _res;
        }
        return null;
    }

    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns 
     */
    axios(op: AxiosRequestConfig) {
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

    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op 
     */
    axiosData<D>(_op: AxiosRequestConfig) {
        return this.axios(_op)
            .catch((res) => {
                throw this.resData_(res.data, false, res);
            })
            .then((res) => {
                return this.resData_(res.data, true, res) as ResData<D>;
            });
    }

    /** 请求拦截 */
    protected async request_(config: AxiosRequestConfig) {
        return config;
    }
    /** 
     * 响应拦截
     * 失败的话抛出AxiosResponse的异常
     */
    protected async response_(res: AxiosResponse) {
        return res;
    }
    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    protected abstract resData_(data: any, con: boolean, res: AxiosResponse): ResData;
}