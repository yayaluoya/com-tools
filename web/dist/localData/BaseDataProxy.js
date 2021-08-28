import { LocalStorage_ } from "./_/LocalStorage_";
/**
 * 基类数据代理器
 */
export class BaseDataProxy {
    /** 保存时的名字，继承以覆盖 */
    get key() {
        return this.constructor.name;
    }
    /** 保存时的版本，继承以覆盖 */
    get v() {
        return '1.0';
    }
    /** 保存时用的组合名字 */
    get _key() {
        return `${this.key}@${this.v}`;
    }
    /** 获取代理器 */
    get proxy() {
        return LocalStorage_.getItemProxy(this._key);
    }
    /** 获取数据 */
    get data() {
        return LocalStorage_.getItem(this._key);
    }
    /** 设置数据 */
    set data(_data) {
        LocalStorage_.setItem(this._key, _data);
    }
}
//# sourceMappingURL=BaseDataProxy.js.map