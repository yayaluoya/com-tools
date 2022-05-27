/** 代理对象的回调执行方法类型 */
declare type proxyFunType = {
    /** 数据被设置的回调 */
    set?: (target: any, p: string | symbol, newValue: any, value: any) => void;
    /** 数据被获取时的回调 */
    get?: (target: any, p: string | symbol) => void;
};
/** 获取代理对象唯一key */
export declare function getProxyObjKey(obj: any): symbol;
/**
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param _fun 数据被设置时的回调
 */
export declare function createProxyObj(obj: any, _fun?: proxyFunType): any;
/**
 * 清理代理对象回调函数
 * @param obj 目标对象
 */
export declare function cleanProxyObjFun(obj: any): void;
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
