import { BaseDataProxy as BaseDataProxy_ } from "../../localData/BaseDataProxy";
import { LocalStorage_ } from "./LocalStorage_";
/**
 * 基类本地数据代理
 */
export declare abstract class BaseDataProxy<D = any> extends BaseDataProxy_ {
    LocalStorage_: typeof LocalStorage_;
}
