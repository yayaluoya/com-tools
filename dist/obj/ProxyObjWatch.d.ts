declare type ROKType = {
    /** 该对象键的key */
    key: string | symbol;
    /** 对象独有的key */
    objKey: symbol;
};
/**
 * 代理对象监听
 * TODO 由createProxyObj模块驱动
 */
export declare class ProxyObjWatch {
    /** 依赖列表 */
    protected static relyOnList: ROKType[][];
    /** 监听依赖列表 */
    protected static watchRNList: {
        keys: ROKType[];
        f: Function;
    }[];
    /**
     * 触发依赖
     * TODO 由createProxyObj模块驱动
     * @param key
     */
    static set(key: ROKType): void;
    /**
     * 依赖收集
     * TODO 由createProxyObj模块驱动
     * @param key
     */
    static get(key: ROKType): void;
    /**
     * 收集依赖
     * @param f
     */
    static collect(f: Function): ROKType[];
    /**
     * 删除某个依赖方法
     * @param f
     */
    static remove(f: Function): boolean;
    /**
     * 自动执行某个带有依赖的方法
     * @param f
     * @param getROF
     */
    static autoF(f: Function, getROF?: Function): void;
    /**
     * 自动执行一次某个带有依赖的方法
     * @param f
     * @param getROF
     */
    static autoOneF(f: Function, getROF?: Function): void;
}
export {};
//# sourceMappingURL=ProxyObjWatch.d.ts.map