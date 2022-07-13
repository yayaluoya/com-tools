/** 代理对象的回调执行方法类型 */
export declare type proxyFunType = {
    /**
     * 数据被设置的回调
     * TODO 注意这个objKey是对象独有的
     */
    set?: (target: any, p: string | symbol, newValue: any, value: any, objKey: symbol) => void;
    /**
     * 数据被获取时的回调
     * TODO 注意这个objKey是对象独有的
     */
    get?: (target: any, p: string | symbol, objKey: symbol) => void;
};
/**
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param fun 数据被设置时的回调
 */
export declare function createProxyObj<T extends Record<string | symbol, any> = any>(obj: T, fun?: proxyFunType): T;
/**
 * 清除对象的代理触发函数
 * @param obj
 * @returns
 */
export declare function cleanProxyObjFun<T extends Record<string, any> = any>(obj: T): T;
//# sourceMappingURL=createProxyObj.d.ts.map