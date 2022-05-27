import { BaseEvent } from "../BaseEvent";
import { ILocalStorage_ } from "./ILocalStorage_";
/**
 * 基类本地数据代理
 * 一个通用的版本，需要根据不同的应用场景封装
 */
export declare abstract class BaseDataProxy<D = any> extends BaseEvent {
    /** 数据 */
    private _data;
    /** 是否编辑 */
    private _ifEdit;
    /** 状态码 */
    private stateCode;
    abstract LocalStorage_: ILocalStorage_;
    /** 保存的名字，默认是类名 */
    protected get name(): string;
    /** 数据 */
    get data(): D;
    /** 设置数据，要注意之前加的监听将会失去意义 */
    set data(_d: D);
    /** 获取一份克隆数据 */
    get cloneData(): D;
    constructor();
    /**
     * 获取本地数据
     * 这里暴露给派生类是为了方便对该方法加以修饰，不要重写
     * @param _data 指定一个数据，如果不存在且本地没有数据的话则会调用获取数据的方法获取数据
     */
    protected getLocalData(_data?: any): void;
    /** 数据修改回调 */
    private setBack;
    /** 更新 */
    private update;
    /** 保存数据 */
    save(): void;
    /** 获取一份新数据 */
    protected abstract getNewData(): D | null;
    /** 数据处理，可以在数据被获取和设置前做加密解密操作 */
    protected dataHandle(str: string, type: 'get' | 'set'): string;
}
