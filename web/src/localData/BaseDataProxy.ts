import { BaseData } from "./BaseData";
import { LocalStorageDataProxy } from "./_/LocalStorageDataProxy";
import { LocalStorage_ } from "./_/LocalStorage_";

/**
 * 基类数据代理器
 */
export abstract class BaseDataProxy<Data extends BaseData> {
    /** 保存时的名字，继承以覆盖 */
    protected get key(): string {
        return this.constructor.name;
    }
    /** 保存时的版本，继承以覆盖 */
    protected get v(): string {
        return '1.0';
    }
    /** 保存时用的组合名字 */
    private get _key(): string {
        return `${this.key}@${this.v}`;
    }

    /** 获取代理器 */
    public get proxy(): LocalStorageDataProxy {
        return LocalStorage_.getItemProxy(this._key);
    }
    /** 获取数据 */
    public get data(): Data {
        return LocalStorage_.getItem(this._key, this.getDefaultData());
    }
    /** 设置数据 */
    public set data(_data: Data) {
        LocalStorage_.setItem(this._key, _data);
    }

    /** 获取默认数据 */
    protected abstract getDefaultData(): Data;
}