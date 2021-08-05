/**
 * localStorage工具类
 */
export default class localStorageTool {
    /** 获取本地的全部数据，直接用属性访问 */
    static get localData() {
        return new Proxy({}, {
            /** 获取 */
            get(target, p, receiver) {
                return localStorageTool.getItem(p);
            },
            /** 判断有没有 */
            has(target, p) {
                return localStorage.getItem(p) != null;
            },
            /** 设置 */
            set(target, p, value, receiver) {
                localStorageTool.setItem(p, value);
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
     * @param _ifAnew 是否重新获取
     */
    static getItemProxy(_index, _ifAnew = false) {
        if (_ifAnew) {
            this.datas[_index] = null;
        }
        return this.datas[_index] || (this.datas[_index] = new localStorageData(_index), this.datas[_index]);
    }
    /**
     * 获取数据对象
     * 这个对象是可能会动态更改的，所以要用的时候直接从这里获取就行不要另存一份
     * @param _index 数据键名
     * @param _default 默认值，如果没有的话就以默认值填充
     * @param _ifAnew 是否重新获取
     */
    static getItem(_index, _default = null, _ifAnew = false) {
        let _dataProxy = this.getItemProxy(_index, _ifAnew);
        if (_dataProxy.data === null && _default) {
            this.setItem(_index, _default);
        }
        return _dataProxy.data;
    }
    /**
     * 设置数据
     * @param _index 数据键名
     * @param _data 数据
     */
    static setItem(_index, _data) {
        if (typeof _data == 'object') {
            _data = JSON.stringify(_data);
        }
        else if (typeof _data == 'function') {
            _data = '';
        }
        //
        localStorage.setItem(_index, _data);
        //重新从本地获取数据
        this.datas[_index] && this.datas[_index].getData();
    }
}
/** 缓存数据列表 */
localStorageTool.datas = {};
/** 代理对象标识 */
const _proxyKey = Symbol('_proxyKey');
/**
 * 数据保存对象
 */
class localStorageData {
    /** 初始化 */
    constructor(key) {
        /** 记录是否编辑 */
        this.ifEdit = false;
        /** 监听器列表 */
        this.watchs = [];
        this.key = key;
        this.getData();
    }
    /** 获取数据 */
    get data() {
        return this.rootData;
    }
    /** 设置数据 */
    set data(data) {
        localStorageTool.setItem(this.key, data);
    }
    /** 获取数据 */
    getData() {
        let _data = localStorage.getItem(this.key);
        try {
            //反序列化数据，如果报错则说明是纯字符串，就不用管它了
            _data = JSON.parse(_data);
        }
        catch (_a) { }
        //获取一个代理数据，并添加监听
        this.rootData = createProxyObj(_data, (...arg) => {
            this.editBack(...arg);
        });
    }
    /** 数据修改回调 */
    editBack(target, p, value) {
        //触发监听
        this.watchs.forEach((item) => {
            if (target[_proxyKey] == item.objKey && item.key == p) {
                item.fun.call(item.this);
            }
        });
        if (this.ifEdit) {
            return;
        }
        this.ifEdit = true;
        //
        Promise.resolve().then(() => {
            this.save();
        });
    }
    /**
     * 监听数据
     * @param _this 执行域
     * @param _fun 执行方法
     * @param _obj 监听对象
     * @param _key 监听键
     */
    on(_this, _fun, _obj, _key) {
        if (!_obj[_proxyKey]) {
            return;
        }
        if (!Array.isArray(_key)) {
            _key = [_key];
        }
        _key.forEach((key) => {
            this.watchs.push({
                this: _this,
                fun: _fun,
                objKey: _obj[_proxyKey],
                key: key,
            });
        });
    }
    /**
     * 监听一次数据
     * @param _this 执行域
     * @param _fun 执行方法
     * @param _obj 监听对象
     * @param _key 监听键
     */
    once(_this, _fun, _obj, _key) {
        if (!_obj[_proxyKey]) {
            return;
        }
        if (!Array.isArray(_key)) {
            _key = [_key];
        }
        let __this = this;
        _key.forEach((key) => {
            //把_fun包装成一个执行了一次就删除掉自身的监听方法
            let __fun = function () {
                _fun.call(_this);
                __this.off(_this, __fun);
            };
            this.on(_this, __fun, _obj, key);
        });
    }
    /**
     * 取消监听数据
     * @param _this 执行域
     * @param _fun 执行方法
     */
    off(_this, _fun = undefined) {
        this.watchs = this.watchs.filter((item) => {
            return !(item.this == _this && (_fun ? item.fun == _fun : true));
        });
    }
    /** 保存数据 */
    save() {
        if (!this.ifEdit) {
            return;
        }
        ;
        this.ifEdit = false;
        //
        localStorage.setItem(this.key, JSON.stringify(this.rootData));
    }
}
/** 代理对象回调执行方法 */
const _proxyFunKey = Symbol('_proxyFunKey');
/**
 * 创建一个代理对象
 * @param obj 原始对象
 * @param _setFun 修改回调
 */
function createProxyObj(obj, _setFun = null) {
    if (!obj || typeof obj != 'object') {
        return obj;
    }
    //递归添加代理
    for (let i in obj) {
        obj[i] = createProxyObj(obj[i], _setFun);
    }
    //判断是否已经设置了代理了，没有设置的话就设置
    if (!obj[_proxyKey]) {
        //定义代理对象必备的不可配置不可枚举属性
        Object.defineProperties(obj, {
            //唯一标识，不可写
            [_proxyKey]: {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Symbol(),
            },
            //添加一个执行回调，可写
            [_proxyFunKey]: {
                configurable: false,
                enumerable: false,
                writable: true,
            }
        });
        /** 回调函数 */
        let _setBackF = (target, p, value) => {
            let _f = Reflect.get(target, _proxyFunKey);
            _f && typeof _f == 'function' && _f(target, p, value);
        };
        /** 获取回调函数，再代理内部就不能直接使用闭包中的回调函数了 */
        let _getBackF = (target) => {
            return Reflect.get(target, _proxyFunKey);
        };
        //
        obj = new Proxy(obj, {
            /** 数据被设置 */
            set(target, p, value, receiver) {
                //先为旧值清理监听
                CleanProxyObjFun(Reflect.get(target, p));
                //再为新值添加监听
                value = createProxyObj(value, _getBackF(target));
                //调用回调
                _setBackF(target, p, value);
                //
                return Reflect.set(target, p, value, receiver);
            },
            /** 数据被获取 */
            get(target, p, receiver) {
                //根据当前对象的回调函数动态设置一下子对象的回调函数
                return createProxyObj(Reflect.get(target, p, receiver), _getBackF(target));
            },
            /** 数据被删除 */
            deleteProperty(target, p) {
                //清理监听
                CleanProxyObjFun(Reflect.get(target, p));
                //调用回调
                _setBackF(target, p, undefined);
                //
                return Reflect.deleteProperty(target, p);
            },
        });
    }
    //定义执行监听回调
    obj[_proxyFunKey] = _setFun;
    //
    return obj;
}
/**
 * 清理代理对象执行回调
 * @param obj 目标对象
 */
function CleanProxyObjFun(obj) {
    if (!obj || typeof obj != 'object') {
        return;
    }
    if (!obj[_proxyFunKey]) {
        return;
    }
    //递归清理
    for (let i in obj) {
        CleanProxyObjFun(obj[i]);
    }
    //
    obj[_proxyFunKey] = null;
}
