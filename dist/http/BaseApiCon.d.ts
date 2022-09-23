import { BaseEvent } from "../BaseEvent";
/**
 * 基类Api控制器
 */
export declare abstract class BaseApiCon extends BaseEvent {
    /** 缓存响应列表 */
    private cacheResList;
    /**
     * 设置缓存
     * @param _key 缓存键
     * @param _res 缓存响应，如果为空的话就删除这个缓存
     */
    protected setCache(_key: string, _res?: Promise<any>): void | boolean;
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
    abstract request(op: any): any;
    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op
     */
    abstract requestData(op: any): any;
    /** 请求拦截 */
    protected request_<C>(config: C): Promise<C>;
    /**
     * 响应拦截
     * 失败的话抛出AxiosResponse的异常
     */
    protected response_<R>(res: R): Promise<R>;
}
//# sourceMappingURL=BaseApiCon.d.ts.map