import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseEvent } from "../BaseEvent";
import { ResData } from "./ResData";
/**
 * 基类Api控制器
 */
export declare abstract class BaseApiCon extends BaseEvent {
    /** axios实例 */
    axiosI: AxiosInstance;
    /** 缓存响应列表 */
    private cacheResList;
    /** 可配置选项 */
    protected get op(): AxiosRequestConfig;
    constructor();
    /**
     * 设置缓存
     * @param _key 缓存键
     * @param _res 缓存响应
     */
    protected setCache(_key: string, _res: Promise<any>): void;
    /**
     * 获取缓存值
     * @param _key
     * @param _getRes 获取默认值的函数，如果没有找到缓存就调用这个函数并缓存它的返回值
     * @returns
     */
    protected getChche<T = any>(_key: string, _getRes?: () => Promise<T>): Promise<T> | null;
    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns
     */
    axios(op: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op
     */
    axiosData<D>(_op: AxiosRequestConfig): Promise<ResData<D>>;
    /** 请求拦截 */
    protected request_(config: AxiosRequestConfig): Promise<AxiosRequestConfig<any>>;
    /**
     * 响应拦截
     * 失败的话抛出AxiosResponse的异常
     */
    protected response_(res: AxiosResponse): Promise<AxiosResponse<any, any>>;
    /**
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    protected abstract resData_(data: any, con: boolean, res: AxiosResponse): ResData;
}
