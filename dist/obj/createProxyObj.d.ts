/**
 * 代理对象控制器类型
 */
export declare type proxyConType = {
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
 * 获取对象代理映射
 * @returns
 */
export declare function getobjProxyMap(): WeakMap<any, any>;
/**
 * 创建一个代理对象
 * TODO 渐进式的，只有访问该对象的某个属性时才会对该属性添加深度代理
 * 会把对这个对象的get,set操作回调出去
 * 并且配合ProxyObjWatch收集相关依赖
 * @param obj 原始对象
 * @param con 对象被代理的操作
 * @param resSetD 重置禁用状态
 */
export declare function createProxyObj<T extends Record<string | symbol, any> = any>(obj: T, con?: proxyConType, resSetD?: boolean): T;
/**
 * 清除对象的代理
 * @param obj
 * @returns
 */
export declare function cleanProxyObjCon<T extends Record<string | symbol, any> = any>(obj: T): T;
/**
 *
 * TODO 以下是依赖收集和触发的内容
 * RO rely on 依赖 的缩写
 *
 */
/**
 * 依赖类型
 */
declare type ROKType = {
    /** 该对象键的key */
    key: string | symbol;
    /** 对象独有的key */
    objKey: symbol;
};
/**
 * 收集依赖
 * @param f
 */
export declare function ROCollect(f: Function): ROKType[];
/**
 * 删除某个依赖方法
 * @param f
 */
export declare function RORemove(f: Function): boolean;
/**
 * 自动执行某个带有依赖的方法
 * @param f
 * @param getROF
 */
export declare function autoROF(f: Function, getROF?: Function): void;
/**
 * 自动执行一次某个带有依赖的方法
 * @param f
 * @param getROF
 */
export declare function autoOneROF(f: Function, getROF?: Function): void;
export {};
//# sourceMappingURL=createProxyObj.d.ts.map