import { proxyFunType } from "./createProxyObj";
declare type relyOnType = {
    /** 唯一标识 */
    sign: symbol;
    /** 键名 */
    key: string;
};
/**
 * 对象代理类
 */
export declare class ObjProxy {
    /** 依赖列表 */
    protected relyOnList: relyOnType[][];
    /** 监听依赖列表 */
    protected watchRNList: {
        relyOnList: relyOnType[];
        key: any;
        f: Function;
        delete: boolean;
    }[];
    /**
     * 创建代理对象
     * @param data
     */
    protected createProxyObj(obj: any, _fun?: proxyFunType): any;
    protected cleanProxyObjFun(data: any): void;
    /**
     * 获取某个函数执行用到的依赖
     * @param f
     */
    collectRelyOn(f: Function): relyOnType[];
    /**
     * 删除某个依赖方法
     * @param key
     */
    removeROF(key: any): boolean;
    /**
     * 自动执行某个带有依赖的方法
     * @param f
     * @param getROF
     */
    autoF(f: Function, getROF?: Function): void;
    /**
     * 自动执行一次某个带有依赖的方法
     * @param f
     * @param getROF
     */
    autoOneF(f: Function, getROF: Function): void;
}
export {};
//# sourceMappingURL=ObjProxy.d.ts.map