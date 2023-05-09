import { BaseEvent } from '../BaseEvent';

/**
 * 基类Api控制器
 * @ C 请求参数泛型
 * @ R 响应对象泛型
 * @ E 事件类型
 */
export abstract class BaseApiCon<C = any, R = any, E extends string | symbol = string | symbol> extends BaseEvent<E> {
    /** 缓存响应列表 */
    private cacheResList: Map<string, Promise<any>> = new Map();

    /**
     * 设置缓存
     * @param key 缓存键
     * @param res 缓存响应，如果为空的话就删除这个缓存
     */
    protected setCache(key: string, res?: Promise<any>): void | boolean {
        if (res) {
            this.cacheResList.set(key, res);
        } else {
            return this.cacheResList.delete(key);
        }
    }

    /**
     * 获取缓存值
     * @param key
     * @param _getRes
     * @returns
     */
    protected getChche<T = any>(key: string, _getRes?: () => Promise<T>): Promise<T> | null {
        if (this.cacheResList.has(key)) {
            return this.cacheResList.get(key)!;
        } else if (!!_getRes) {
            let _res = _getRes();
            this.setCache(key, _res);
            return _res;
        }
        return null;
    }

    /**
     * 发送请求
     * @param op 请求配置
     * @returns
     */
    abstract request(op: C);

    /**
     * 发送请求并获取该请求返回的数据
     * catch中的也是 ResData 的实例
     * @param op
     */
    abstract requestData(op: C);

    /**
     * 请求拦截
     * 主要处理配置选项
     * @param config
     * @returns
     */
    protected async request_(config: C) {
        return config;
    }

    /**
     * 响应拦截
     * 失败的话必须抛出AxiosError异常
     * @param res
     * @returns
     */
    protected async response_(res: R) {
        return res;
    }
}
