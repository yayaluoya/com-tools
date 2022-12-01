import { ResData } from "./ResData";

/**
 * 常用api请求类型
 */
export interface IComApiResType<Config> {
    /**
     * 获取请求中的数据
     * @param op 
     */
    requestDataData<D = any>(op: Config): Promise<ResData<D>>;
    /**
     * get请求获取数据
     * @param op 请求配置 
     * @returns 
     */
    getData<D = any>(op: Config): Promise<D>;
    /**
     * post请求获取数据
     * @param op 请求配置 
     * @returns 
     */
    postData<D = any>(op: Config): Promise<D>;
    /**
     * put请求获取数据
     * @param op 请求配置 
     * @returns 
     */
    putData<D = any>(op: Config): Promise<D>;
    /**
     * delete请求获取数据
     * @param op 请求配置 
     * @returns 
     */
    deleteData<D = any>(op: Config): Promise<D>;
}