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
export {};
//# sourceMappingURL=createProxyObj.d.ts.map