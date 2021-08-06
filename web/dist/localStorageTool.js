/**
 * localStorage工具类
 */
class localStorageTool {
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
        this.rootData = createProxyObj(_data, {
            set: (...arg) => {
                this.setBack(...arg);
            },
        });
    }
    /** 数据修改回调 */
    setBack(target, p, newValue, value) {
        let _objKey = getProxyObjKey(target);
        //触发监听
        this.watchs.forEach((item) => {
            if (_objKey == item.objKey && item.key == p) {
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
        let _objKey = getProxyObjKey(_obj);
        if (!_objKey) {
            return;
        }
        if (!Array.isArray(_key)) {
            _key = [_key];
        }
        _key.forEach((key) => {
            this.watchs.push({
                this: _this,
                fun: _fun,
                objKey: _objKey,
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
        let _objKey = getProxyObjKey(_obj);
        if (!_objKey) {
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
/** 代理对象唯一key标识 */
const _proxyKey = Symbol('_proxyKey');
/** 代理对象回调执行方法标识 */
const _proxyFunKey = Symbol('_proxyFunKey');
/** 代理对象保留key标识 */
const _proxyKeepKeys = [_proxyKey, _proxyFunKey];
/** 关闭代理队列，此值只能在securityExeFun方法中被设置，这样才能保证它永远不会小于0 */
let _offProxyQueue = 0;
/**
 * 以安全的方式执行某个方法
 * 就是说执行这个方法的期间触发的代理操作都不会产生副作用
 * @param _f 目标方法
 */
function securityExeFun(_f) {
    _offProxyQueue++;
    _f(); //执行目标方法
    _offProxyQueue--;
}
/** 是否能执行代理副作用操作 */
let _isProxy = () => {
    return _offProxyQueue === 0;
};
/**
 * 创建一个代理对象
 * @param obj 原始对象
 * @param _fun 回调
 */
function createProxyObj(obj, _fun = null) {
    if (!obj || typeof obj != 'object') {
        return obj;
    }
    //递归添加代理
    for (let i in obj) {
        //以安全的方式执行
        securityExeFun(() => {
            obj[i] = createProxyObj(obj[i], _fun);
        });
    }
    //判断是否已经设置了代理了，没有设置的话就设置
    if (!getProxyObjKey(obj)) {
        //定义代理对象必备的不可配置不可枚举属性
        Object.defineProperties(obj, {
            //唯一标识，不可写
            [_proxyKey]: {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Symbol(),
            },
            //执行回调，可写
            [_proxyFunKey]: {
                configurable: false,
                enumerable: false,
                writable: true,
            }
        });
        //
        obj = new Proxy(obj, {
            /** 数据被设置 */
            set(target, p, value, receiver) {
                var _a, _b, _c;
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    let _value = Reflect.get(target, p);
                    //先为旧值清理代理回调
                    cleanProxyObjFun(_value);
                    //再为新值添加监听
                    value = createProxyObj(value, getProxyObjBackF(target));
                    //调用回调
                    (_c = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : (_b = _a).set) === null || _c === void 0 ? void 0 : _c.call(_b, target, p, value, _value);
                }
                //
                return Reflect.set(target, p, value, receiver);
            },
            /** 数据被获取 */
            get(target, p, receiver) {
                var _a, _b, _c;
                let _value = Reflect.get(target, p, receiver);
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    //调用回调
                    (_c = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : (_b = _a).get) === null || _c === void 0 ? void 0 : _c.call(_b, target, p);
                    //根据当前对象的回调函数动态设置一下子对象的回调函数
                    if (_value && typeof _value == 'object' && getProxyObjBackF(_value) != getProxyObjBackF(target)) {
                        //定义执行监听回调
                        setProxyObjBackF(_value, getProxyObjBackF(target));
                    }
                }
                return _value;
            },
            /** 数据被删除 */
            deleteProperty(target, p) {
                var _a, _b, _c;
                //
                if (_isProxy()) {
                    let _value = Reflect.get(target, p);
                    //清理代理回调
                    cleanProxyObjFun(_value);
                    //调用回调
                    (_c = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : (_b = _a).set) === null || _c === void 0 ? void 0 : _c.call(_b, target, p, undefined, _value);
                }
                //
                return Reflect.deleteProperty(target, p);
            },
        });
    }
    //定义执行监听回调
    setProxyObjBackF(obj, _fun);
    //
    return obj;
}
/** 获取代理对象唯一key */
function getProxyObjKey(obj) {
    return Reflect.get(obj, _proxyKey);
}
/** 获取代理对象回调函数 */
function getProxyObjBackF(obj) {
    return Reflect.get(obj, _proxyFunKey);
}
/** 设置代理对象回调函数 */
function setProxyObjBackF(obj, _fun) {
    Reflect.set(obj, _proxyFunKey, _fun);
}
/**
 * 清理代理对象回调函数
 * @param obj 目标对象
 */
function cleanProxyObjFun(obj) {
    if (!obj || typeof obj != 'object') {
        return;
    }
    if (!getProxyObjBackF(obj)) {
        return;
    }
    //递归清理
    for (let i in obj) {
        //以安全的方式执行
        securityExeFun(() => {
            cleanProxyObjFun(obj[i]);
        });
    }
    //
    setProxyObjBackF(obj, null);
}
//# sourceMappingURL=localStorageTool.js.map