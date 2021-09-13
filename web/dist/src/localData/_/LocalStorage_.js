import { LocalStorageDataProxy } from "./LocalStorageDataProxy";
/**
 * 本地数据类
 * * 一个localStorage的镜像类，有着差不多的方法，但是从这里获取的数据是带有自动保存的功能的。
 * 缓存用到的数据，不用每次获取时就去读取
 */
export class LocalStorage_ {
    /** 获取本地的全部数据，直接用属性访问 */
    static get datas() {
        return new Proxy({}, {
            /** in操作符 判断有没有 */
            has(target, p) {
                return this.getItem(p) != null;
            },
            /** 获取 */
            get(target, p, receiver) {
                return this.getItem(p);
            },
            /** 设置 */
            set(target, p, value, receiver) {
                this.setItem(p, value);
                return true;
            },
        });
    }
    /**
     * 获取数据代理
     * 这个对象是可能会动态更改的，所以要用的时候直接从这里获取就行不要另存一份
     * 数据代理可以监听数据的更改，从而做出其他操作
     * 也可以直接更改data
     * @param _index 数据键名
     */
    static getItemProxy(_index) {
        return this.catchDataProxys[_index] || (this.catchDataProxys[_index] = new LocalStorageDataProxy(_index));
    }
    /**
     * 获取数据对象
     * 这个对象是可能会动态更改的，所以要用的时候直接从这里获取就行不要另存一份
     * @param _index 数据键名
     * @param _default 默认值，如果没有的话就以默认值填充
     */
    static getItem(_index, _default = null) {
        let _dataProxy = this.getItemProxy(_index);
        if (_dataProxy.data === null && _default) {
            this.setItem(_index, _default);
        }
        //返回其中的数据
        return _dataProxy.data;
    }
    /**
     * 设置数据
     * @param _index 数据键名
     * @param _data 数据
     */
    static setItem(_index, _data) {
        //先获取它的代理器
        this.getItemProxy(_index).data = _data;
    }
}
/** 缓存数据代理列表 */
LocalStorage_.catchDataProxys = {};
//# sourceMappingURL=LocalStorage_.js.map