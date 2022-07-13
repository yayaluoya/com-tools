import { BaseEvent } from "../BaseEvent";
/**
 * 代理对象监听
 */
export declare class ProxyObjWatch<T> extends BaseEvent {
    /** 依赖列表 */
    protected relyOnList: symbol[][];
    /** 监听依赖列表 */
    protected watchRNList: {
        keys: symbol[];
        f: Function;
    }[];
    /** 代理对象 */
    private _proObj;
    get proObj(): T;
    set proObj(proObj: T);
    constructor(proObj?: T);
    /**
     * 获取某个函数执行用到的依赖
     * @param f
     */
    collectRelyOn(f: Function): symbol[];
    /**
     * 删除某个依赖方法
     * @param f
     */
    removeROF(f: Function): boolean;
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
//# sourceMappingURL=ProxyObj.d.ts.map