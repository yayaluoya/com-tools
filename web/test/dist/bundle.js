/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createMicroTasks.ts":
/*!*********************************!*\
  !*** ./src/createMicroTasks.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMicroTasks": () => (/* binding */ createMicroTasks)
/* harmony export */ });
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ "./src/env.ts");
/**
 * 来自vue源码
 */

let isUsingMicroTask = false;
/** 微任务执行队列 */
const callbacks = [];
/** 是否已经有任务了 */
let pending = false;
/** 执行所有注册的任务 */
function flushCallbacks() {
    pending = false;
    const copies = [...callbacks];
    callbacks.length = 0; //清空任务列表
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
/** 微任务执行器，在微任务中执行flushCallbacks方法 */
let timerFunc;
/**
 * 创建兼容性强的微任务执行器，并赋值给timerFunc
 */
/** 优先用promise来实现 */
if (typeof Promise !== 'undefined' && (0,_env__WEBPACK_IMPORTED_MODULE_0__.isNative)(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
    };
    isUsingMicroTask = true;
}
/** 其次用MutationObserver来实现，MutationObserver会在观察的元素发生更改时在微任务中执行注册的方法 */
else if (!_env__WEBPACK_IMPORTED_MODULE_0__.isIE && typeof MutationObserver !== 'undefined' && ((0,_env__WEBPACK_IMPORTED_MODULE_0__.isNative)(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
    isUsingMicroTask = true;
}
/**
 * 再用setImmediate来实现，该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数
 * 注意这个方法不是标准的方法，尽量不要使用
 */
else if (typeof window['setImmediate'] !== 'undefined' && (0,_env__WEBPACK_IMPORTED_MODULE_0__.isNative)(window['setImmediate'])) {
    timerFunc = () => {
        window['setImmediate'](flushCallbacks);
    };
}
/** 最后用setTimeout方法来实现，这个方法是性能最差的，而且它添加的是个宏任务 */
else {
    // Fallback to setTimeout.
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}
/**
 * 创建一个微任务
 * @param {*} cb 执行方法
 * @param {*} ctx 执行域
 */
function createMicroTasks(cb, ctx) {
    //推入任务到执行队列中
    let _resolve;
    callbacks.push(() => {
        //如果有回调函数就包装下，捕获异常
        if (cb) {
            try {
                cb.call(ctx);
            }
            catch (e) {
                console.error('微任务执行异常', e);
            }
        }
        //如果没有回调函数就解决返回的promice
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    //先判断下是否已经在执行执行任务了，若果在执行就不调用了，保证一次宏任务只执行一次
    if (!pending) {
        pending = true;
        //执行执行队列中的任务
        timerFunc();
    }
    //如果没有传入回调方法，且有Promise则返回一个promise实例，在回调被执行时解决
    if (typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}


/***/ }),

/***/ "./src/env.ts":
/*!********************!*\
  !*** ./src/env.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasProto": () => (/* binding */ hasProto),
/* harmony export */   "inBrowser": () => (/* binding */ inBrowser),
/* harmony export */   "inWeex": () => (/* binding */ inWeex),
/* harmony export */   "weexPlatform": () => (/* binding */ weexPlatform),
/* harmony export */   "UA": () => (/* binding */ UA),
/* harmony export */   "isIE": () => (/* binding */ isIE),
/* harmony export */   "isIE9": () => (/* binding */ isIE9),
/* harmony export */   "isEdge": () => (/* binding */ isEdge),
/* harmony export */   "isAndroid": () => (/* binding */ isAndroid),
/* harmony export */   "isIOS": () => (/* binding */ isIOS),
/* harmony export */   "isChrome": () => (/* binding */ isChrome),
/* harmony export */   "isPhantomJS": () => (/* binding */ isPhantomJS),
/* harmony export */   "isFF": () => (/* binding */ isFF),
/* harmony export */   "nativeWatch": () => (/* binding */ nativeWatch),
/* harmony export */   "supportsPassive": () => (/* binding */ supportsPassive),
/* harmony export */   "devtools": () => (/* binding */ devtools),
/* harmony export */   "isNative": () => (/* binding */ isNative),
/* harmony export */   "hasSymbol": () => (/* binding */ hasSymbol),
/* harmony export */   "_Set": () => (/* binding */ _Set)
/* harmony export */ });
/**
 * 来自vue源码
 */
// can we use __proto__?
const hasProto = '__proto__' in {};
// Browser environment sniffing
const inBrowser = typeof window !== 'undefined';
const inWeex = typeof window['WXEnvironment'] !== 'undefined' && !!window['WXEnvironment'].platform;
const weexPlatform = inWeex && window['WXEnvironment'].platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const isEdge = UA && UA.indexOf('edge/') > 0;
const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);
// Firefox has a "watch" function on Object.prototype...
const nativeWatch = ({})['watch'];
let supportsPassive = false;
if (inBrowser) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', ({
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            }
        })); // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
    }
    catch (e) { }
}
// detect devtools
const devtools = inBrowser && window['__VUE_DEVTOOLS_GLOBAL_HOOK__'];
/* istanbul ignore next */
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
const hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
let _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
}
else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = class Set {
        constructor() {
            this.set = Object.create(null);
        }
        has(key) {
            return this.set[key] === true;
        }
        add(key) {
            this.set[key] = true;
        }
        clear() {
            this.set = Object.create(null);
        }
    };
}



/***/ }),

/***/ "./src/http/createApiCon.ts":
/*!**********************************!*\
  !*** ./src/http/createApiCon.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createApiCon": () => (/* binding */ createApiCon)
/* harmony export */ });
/** 父对象键名 */
const parentObjKeyName = Symbol();
/** key值键名 */
const keyKeyName = Symbol();
/**
 * 创建api控制器
 * @param _rootPath 根路径
 * @param _apiObj api对象
 * @param _op 选项
 */
function createApiCon(_rootPath, _apiObj, _op) {
    //初始化
    _op = Object.assign({ pathNodeKeyName: 'pathNode' }, _op);
    /** 递归创建api控制器 */
    function traverse(_apiObj) {
        for (let [_i, _item] of Object.entries(_apiObj)) {
            //如果值是方法的话
            if (typeof _item == 'function') {
                //重新赋值一个绑定了代理对象的方法
                _apiObj[_i] = _item.bind(getPathObjProxy(_apiObj));
            }
            else if (typeof _item == 'object' && _item) {
                //设置父对象
                _item[parentObjKeyName] = _apiObj;
                //设置键名
                _item[keyKeyName] = _i;
                //递归
                traverse(_item);
            }
        }
    }
    /** 获取一个路径对象代理 */
    function getPathObjProxy(_apiObj) {
        return new Proxy({
            path: ''
        }, {
            get(_, p) {
                switch (true) {
                    case /^\$?(path|api)$/i.test(p):
                        //返回一个整理好的路径
                        return _rootPath.replace(/\/+$/, '') + '/' + byApiObjGetPath(_apiObj, _op.pathNodeKeyName).replace(/^\/+/, '').replace(/\/+/g, '/');
                }
            },
        });
    }
    //
    traverse(_apiObj);
    //
    return _apiObj;
}
/** 通过api对象获取路径 */
function byApiObjGetPath(_obj, _nodeName) {
    if (!_obj[parentObjKeyName]) {
        return '';
    }
    let _left = byApiObjGetPath(_obj[parentObjKeyName], _nodeName);
    return (_left ? `${_left}/` : '') + (_obj[_nodeName] || _obj[keyKeyName]);
}


/***/ }),

/***/ "./src/localData/BaseData.ts":
/*!***********************************!*\
  !*** ./src/localData/BaseData.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseData": () => (/* binding */ BaseData)
/* harmony export */ });
/**
 * 基类数据
 * 需要被数据代理器管理的数据必须重这里继承
 */
class BaseData {
}
//
Object.setPrototypeOf(BaseData.prototype, null);


/***/ }),

/***/ "./src/localData/BaseDataProxy.ts":
/*!****************************************!*\
  !*** ./src/localData/BaseDataProxy.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseDataProxy": () => (/* binding */ BaseDataProxy)
/* harmony export */ });
/* harmony import */ var _LocalStorage___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/LocalStorage_ */ "./src/localData/_/LocalStorage_.ts");

/**
 * 基类数据代理器
 */
class BaseDataProxy {
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
        return _LocalStorage___WEBPACK_IMPORTED_MODULE_0__.LocalStorage_.getItemProxy(this._key);
    }
    /** 获取数据 */
    get data() {
        return _LocalStorage___WEBPACK_IMPORTED_MODULE_0__.LocalStorage_.getItem(this._key, this.getDefaultData());
    }
    /** 设置数据 */
    set data(_data) {
        _LocalStorage___WEBPACK_IMPORTED_MODULE_0__.LocalStorage_.setItem(this._key, _data);
    }
}


/***/ }),

/***/ "./src/localData/_/LocalStorageDataProxy.ts":
/*!**************************************************!*\
  !*** ./src/localData/_/LocalStorageDataProxy.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageDataProxy": () => (/* binding */ LocalStorageDataProxy)
/* harmony export */ });
/* harmony import */ var _createMicroTasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../createMicroTasks */ "./src/createMicroTasks.ts");
/* harmony import */ var _createProxyObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createProxyObj */ "./src/localData/_/createProxyObj.ts");


/**
 * 本地数据代理
 */
class LocalStorageDataProxy {
    /** 初始化 */
    constructor(key) {
        /** 状态码 */
        this.stateCode = 0;
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
    set data(_data) {
        if (this.rootData == _data) {
            return;
        }
        // 清理掉上一个对象上绑定的回调
        (0,_createProxyObj__WEBPACK_IMPORTED_MODULE_1__.cleanProxyObjFun)(this.rootData);
        //
        this._save(_data);
        //重新获取数据
        this.getData();
        //修改编辑状态
        this.ifEdit = false;
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
        this.rootData = (0,_createProxyObj__WEBPACK_IMPORTED_MODULE_1__.createProxyObj)(_data, {
            set: (...arg) => {
                this.setBack(...arg);
            },
        });
        //递增状态码
        this.stateCode++;
    }
    /** 数据修改回调 */
    setBack(target, p, newValue, value) {
        let _objKey = (0,_createProxyObj__WEBPACK_IMPORTED_MODULE_1__.getProxyObjKey)(target);
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
        let _stateCode = this.stateCode;
        //用微任务来执行保存方法
        (0,_createMicroTasks__WEBPACK_IMPORTED_MODULE_0__.createMicroTasks)(() => {
            /** 状态码不一样了的话说明根数据发送的变化，此时就不用在保存之前的根数据了 */
            if (_stateCode != this.stateCode) {
                return;
            }
            //
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
        let _objKey = (0,_createProxyObj__WEBPACK_IMPORTED_MODULE_1__.getProxyObjKey)(_obj);
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
        let _objKey = (0,_createProxyObj__WEBPACK_IMPORTED_MODULE_1__.getProxyObjKey)(_obj);
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
    /**
     * 强制保存数据
     */
    forceSave() {
        this._save(this.rootData);
    }
    /** 保存数据 */
    save() {
        if (!this.ifEdit) {
            return;
        }
        ;
        this.ifEdit = false;
        //
        this._save(this.rootData);
    }
    /** 保存数据到本地 */
    _save(_data) {
        if (typeof _data == 'object') {
            _data = JSON.stringify(_data);
        }
        else if (typeof _data == 'function') {
            _data = '';
        }
        //
        localStorage.setItem(this.key, _data);
    }
}


/***/ }),

/***/ "./src/localData/_/LocalStorage_.ts":
/*!******************************************!*\
  !*** ./src/localData/_/LocalStorage_.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorage_": () => (/* binding */ LocalStorage_)
/* harmony export */ });
/* harmony import */ var _LocalStorageDataProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocalStorageDataProxy */ "./src/localData/_/LocalStorageDataProxy.ts");

/**
 * 本地数据类
 * * 一个localStorage的镜像类，有着差不多的方法，但是从这里获取的数据是带有自动保存的功能的。
 * 缓存用到的数据，不用每次获取时就去读取
 */
class LocalStorage_ {
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
        return this.catchDataProxys[_index] || (this.catchDataProxys[_index] = new _LocalStorageDataProxy__WEBPACK_IMPORTED_MODULE_0__.LocalStorageDataProxy(_index));
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


/***/ }),

/***/ "./src/localData/_/createProxyObj.ts":
/*!*******************************************!*\
  !*** ./src/localData/_/createProxyObj.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getProxyObjKey": () => (/* binding */ getProxyObjKey),
/* harmony export */   "createProxyObj": () => (/* binding */ createProxyObj),
/* harmony export */   "cleanProxyObjFun": () => (/* binding */ cleanProxyObjFun)
/* harmony export */ });
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
 * 创建一个代理对象
 * 会把对这个对象的各种操作回调出去
 * @param obj 原始对象
 * @param _fun 数据被设置时的回调
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
                var _a, _b;
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    let _value = Reflect.get(target, p);
                    //为新值添加监听
                    value = createProxyObj(value, getProxyObjBackF(target));
                    //新旧值不一样时触发回调
                    if (_value !== value) {
                        //先为旧值清理代理回调
                        cleanProxyObjFun(_value);
                        //调用回调
                        (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, value, _value);
                    }
                }
                //
                return Reflect.set(target, p, value, receiver);
            },
            /** 数据被获取 */
            get(target, p, receiver) {
                var _a, _b;
                let _value = Reflect.get(target, p, receiver);
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    //调用回调
                    (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, target, p);
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
                var _a, _b;
                //
                if (_isProxy()) {
                    let _value = Reflect.get(target, p);
                    //清理代理回调
                    cleanProxyObjFun(_value);
                    //调用回调
                    (_b = (_a = getProxyObjBackF(target)) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, undefined, _value);
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


/***/ }),

/***/ "./test/localData/testDataProxy.ts":
/*!*****************************************!*\
  !*** ./test/localData/testDataProxy.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestDataProxy": () => (/* binding */ TestDataProxy)
/* harmony export */ });
/* harmony import */ var _src_localData_BaseData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/localData/BaseData */ "./src/localData/BaseData.ts");
/* harmony import */ var _src_localData_BaseDataProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/localData/BaseDataProxy */ "./src/localData/BaseDataProxy.ts");


class Data extends _src_localData_BaseData__WEBPACK_IMPORTED_MODULE_0__.BaseData {
    constructor() {
        super(...arguments);
        this.a = 1;
        this.b = 'b';
    }
}
class TestDataProxy extends _src_localData_BaseDataProxy__WEBPACK_IMPORTED_MODULE_1__.BaseDataProxy {
    /** 获取新数据 */
    getDefaultData() {
        return new Data();
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./test/index.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_http_createApiCon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/http/createApiCon */ "./src/http/createApiCon.ts");
/* harmony import */ var _localData_testDataProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localData/testDataProxy */ "./test/localData/testDataProxy.ts");


/** 测试脚本 */
console.log('哈哈2');
let testData = new _localData_testDataProxy__WEBPACK_IMPORTED_MODULE_1__.TestDataProxy();
//注入到全局方便设置
window['testData'] = testData;
console.log(testData.data.a);
let apiCon = (0,src_http_createApiCon__WEBPACK_IMPORTED_MODULE_0__.createApiCon)('www.baidu.com', {
    a: {
        getA() {
            return this.path;
        },
    },
    b: {
        getB() {
            return this.path;
        },
        c: {
            getC(_op) {
                //相当于fetch('www.baidu.com/b/c');
                fetch(this.path).then(() => { });
            },
        },
    },
});
window['apiCon'] = apiCon;
console.log(apiCon.b.c.getC('获取c接口数据'));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksbUVBQWEsRUFBRSxDQUFDO0FBQ25DLFdBQVc7QUFDWCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU3QixJQUFJLE1BQU0sR0FBRyxtRUFBWSxDQUFDLGVBQWUsRUFBRTtJQUN2QyxDQUFDLEVBQUU7UUFDQyxJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7S0FDSjtJQUNELENBQUMsRUFBRTtRQUNDLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELENBQUMsRUFBRTtZQUNDLElBQUksQ0FBQyxHQUFXO2dCQUNaLGdDQUFnQztnQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi9zcmMvY3JlYXRlTWljcm9UYXNrcy50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvZW52LnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9odHRwL2NyZWF0ZUFwaUNvbi50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvbG9jYWxEYXRhL0Jhc2VEYXRhLnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvQmFzZURhdGFQcm94eS50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvbG9jYWxEYXRhL18vTG9jYWxTdG9yYWdlRGF0YVByb3h5LnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvXy9Mb2NhbFN0b3JhZ2VfLnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvXy9jcmVhdGVQcm94eU9iai50cyIsIndlYnBhY2s6Ly93ZWIvLi90ZXN0L2xvY2FsRGF0YS90ZXN0RGF0YVByb3h5LnRzIiwid2VicGFjazovL3dlYi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi8uL3Rlc3QvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOadpeiHqnZ1Zea6kOeggVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGlzSUUsIGlzTmF0aXZlIH0gZnJvbSBcIi4vZW52XCI7XHJcblxyXG5sZXQgaXNVc2luZ01pY3JvVGFzazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuLyoqIOW+ruS7u+WKoeaJp+ihjOmYn+WIlyAqL1xyXG5jb25zdCBjYWxsYmFja3MgPSBbXTtcclxuLyoqIOaYr+WQpuW3sue7j+acieS7u+WKoeS6hiAqL1xyXG5sZXQgcGVuZGluZyA9IGZhbHNlO1xyXG5cclxuLyoqIOaJp+ihjOaJgOacieazqOWGjOeahOS7u+WKoSAqL1xyXG5mdW5jdGlvbiBmbHVzaENhbGxiYWNrcygpIHtcclxuICAgIHBlbmRpbmcgPSBmYWxzZVxyXG4gICAgY29uc3QgY29waWVzID0gWy4uLmNhbGxiYWNrc107XHJcbiAgICBjYWxsYmFja3MubGVuZ3RoID0gMC8v5riF56m65Lu75Yqh5YiX6KGoXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvcGllc1tpXSgpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiDlvq7ku7vliqHmiafooYzlmajvvIzlnKjlvq7ku7vliqHkuK3miafooYxmbHVzaENhbGxiYWNrc+aWueazlSAqL1xyXG5sZXQgdGltZXJGdW5jO1xyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuWFvOWuueaAp+W8uueahOW+ruS7u+WKoeaJp+ihjOWZqO+8jOW5tui1i+WAvOe7mXRpbWVyRnVuY1xyXG4gKi9cclxuXHJcbi8qKiDkvJjlhYjnlKhwcm9taXNl5p2l5a6e546wICovXHJcbmlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcclxuICAgIGNvbnN0IHAgPSBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHAudGhlbihmbHVzaENhbGxiYWNrcyk7XHJcbiAgICB9XHJcbiAgICBpc1VzaW5nTWljcm9UYXNrID0gdHJ1ZVxyXG59XHJcbi8qKiDlhbbmrKHnlKhNdXRhdGlvbk9ic2VydmVy5p2l5a6e546w77yMTXV0YXRpb25PYnNlcnZlcuS8muWcqOinguWvn+eahOWFg+e0oOWPkeeUn+abtOaUueaXtuWcqOW+ruS7u+WKoeS4reaJp+ihjOazqOWGjOeahOaWueazlSAqL1xyXG5lbHNlIGlmICghaXNJRSAmJiB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxyXG4gICAgaXNOYXRpdmUoTXV0YXRpb25PYnNlcnZlcikgfHxcclxuICAgIE11dGF0aW9uT2JzZXJ2ZXIudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTXV0YXRpb25PYnNlcnZlckNvbnN0cnVjdG9yXSdcclxuKSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZsdXNoQ2FsbGJhY2tzKVxyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY291bnRlcikpXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxyXG4gICAgfSlcclxuICAgIHRpbWVyRnVuYyA9ICgpID0+IHtcclxuICAgICAgICBjb3VudGVyID0gKGNvdW50ZXIgKyAxKSAlIDJcclxuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gU3RyaW5nKGNvdW50ZXIpXHJcbiAgICB9XHJcbiAgICBpc1VzaW5nTWljcm9UYXNrID0gdHJ1ZVxyXG59XHJcbi8qKiBcclxuICog5YaN55Soc2V0SW1tZWRpYXRl5p2l5a6e546w77yM6K+l5pa55rOV55So5p2l5oqK5LiA5Lqb6ZyA6KaB6ZW/5pe26Ze06L+Q6KGM55qE5pON5L2c5pS+5Zyo5LiA5Liq5Zue6LCD5Ye95pWw6YeM77yM5Zyo5rWP6KeI5Zmo5a6M5oiQ5ZCO6Z2i55qE5YW25LuW6K+t5Y+l5ZCO77yM5bCx56uL5Yi75omn6KGM6L+Z5Liq5Zue6LCD5Ye95pWwIFxyXG4gKiDms6jmhI/ov5nkuKrmlrnms5XkuI3mmK/moIflh4bnmoTmlrnms5XvvIzlsL3ph4/kuI3opoHkvb/nlKhcclxuICovXHJcbmVsc2UgaWYgKHR5cGVvZiB3aW5kb3dbJ3NldEltbWVkaWF0ZSddICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZSh3aW5kb3dbJ3NldEltbWVkaWF0ZSddKSkge1xyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvd1snc2V0SW1tZWRpYXRlJ10oZmx1c2hDYWxsYmFja3MpXHJcbiAgICB9XHJcbn1cclxuLyoqIOacgOWQjueUqHNldFRpbWVvdXTmlrnms5XmnaXlrp7njrDvvIzov5nkuKrmlrnms5XmmK/mgKfog73mnIDlt67nmoTvvIzogIzkuJTlroPmt7vliqDnmoTmmK/kuKrlro/ku7vliqEgKi9cclxuZWxzZSB7XHJcbiAgICAvLyBGYWxsYmFjayB0byBzZXRUaW1lb3V0LlxyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZmx1c2hDYWxsYmFja3MsIDApXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliJvlu7rkuIDkuKrlvq7ku7vliqFcclxuICogQHBhcmFtIHsqfSBjYiDmiafooYzmlrnms5VcclxuICogQHBhcmFtIHsqfSBjdHgg5omn6KGM5Z+fXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWljcm9UYXNrcyhjYj86IEZ1bmN0aW9uLCBjdHg/OiBPYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy/mjqjlhaXku7vliqHliLDmiafooYzpmJ/liJfkuK1cclxuICAgIGxldCBfcmVzb2x2ZVxyXG4gICAgY2FsbGJhY2tzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5Zue6LCD5Ye95pWw5bCx5YyF6KOF5LiL77yM5o2V6I635byC5bi4XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGN0eClcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5b6u5Lu75Yqh5omn6KGM5byC5bi4JywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmsqHmnInlm57osIPlh73mlbDlsLHop6PlhrPov5Tlm57nmoRwcm9taWNlXHJcbiAgICAgICAgZWxzZSBpZiAoX3Jlc29sdmUpIHtcclxuICAgICAgICAgICAgX3Jlc29sdmUoY3R4KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvL+WFiOWIpOaWreS4i+aYr+WQpuW3sue7j+WcqOaJp+ihjOaJp+ihjOS7u+WKoeS6hu+8jOiLpeaenOWcqOaJp+ihjOWwseS4jeiwg+eUqOS6hu+8jOS/neivgeS4gOasoeWuj+S7u+WKoeWPquaJp+ihjOS4gOasoVxyXG4gICAgaWYgKCFwZW5kaW5nKSB7XHJcbiAgICAgICAgcGVuZGluZyA9IHRydWVcclxuICAgICAgICAvL+aJp+ihjOaJp+ihjOmYn+WIl+S4reeahOS7u+WKoVxyXG4gICAgICAgIHRpbWVyRnVuYygpXHJcbiAgICB9XHJcbiAgICAvL+WmguaenOayoeacieS8oOWFpeWbnuiwg+aWueazle+8jOS4lOaciVByb21pc2XliJnov5Tlm57kuIDkuKpwcm9taXNl5a6e5L6L77yM5Zyo5Zue6LCD6KKr5omn6KGM5pe26Kej5YazXHJcbiAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIOadpeiHqnZ1Zea6kOeggVxyXG4gKi9cclxuXHJcbi8vIGNhbiB3ZSB1c2UgX19wcm90b19fP1xyXG5leHBvcnQgY29uc3QgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fVxyXG5cclxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xyXG5leHBvcnQgY29uc3QgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuZXhwb3J0IGNvbnN0IGluV2VleCA9IHR5cGVvZiB3aW5kb3dbJ1dYRW52aXJvbm1lbnQnXSAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3dbJ1dYRW52aXJvbm1lbnQnXS5wbGF0Zm9ybVxyXG5leHBvcnQgY29uc3Qgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIHdpbmRvd1snV1hFbnZpcm9ubWVudCddLnBsYXRmb3JtLnRvTG93ZXJDYXNlKClcclxuZXhwb3J0IGNvbnN0IFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcclxuZXhwb3J0IGNvbnN0IGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKVxyXG5leHBvcnQgY29uc3QgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMFxyXG5leHBvcnQgY29uc3QgaXNFZGdlID0gVUEgJiYgVUEuaW5kZXhPZignZWRnZS8nKSA+IDBcclxuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpXHJcbmV4cG9ydCBjb25zdCBpc0lPUyA9IChVQSAmJiAvaXBob25lfGlwYWR8aXBvZHxpb3MvLnRlc3QoVUEpKSB8fCAod2VleFBsYXRmb3JtID09PSAnaW9zJylcclxuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gVUEgJiYgL2Nocm9tZVxcL1xcZCsvLnRlc3QoVUEpICYmICFpc0VkZ2VcclxuZXhwb3J0IGNvbnN0IGlzUGhhbnRvbUpTID0gVUEgJiYgL3BoYW50b21qcy8udGVzdChVQSlcclxuZXhwb3J0IGNvbnN0IGlzRkYgPSBVQSAmJiBVQS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pXHJcblxyXG4vLyBGaXJlZm94IGhhcyBhIFwid2F0Y2hcIiBmdW5jdGlvbiBvbiBPYmplY3QucHJvdG90eXBlLi4uXHJcbmV4cG9ydCBjb25zdCBuYXRpdmVXYXRjaCA9ICh7fSlbJ3dhdGNoJ107XHJcblxyXG5leHBvcnQgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlXHJcbmlmIChpbkJyb3dzZXIpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHt9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pKSAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdC1wYXNzaXZlJywgbnVsbCwgb3B0cylcclxuICB9IGNhdGNoIChlKSB7IH1cclxufVxyXG5cclxuLy8gZGV0ZWN0IGRldnRvb2xzXHJcbmV4cG9ydCBjb25zdCBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3dbJ19fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX18nXTtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05hdGl2ZShDdG9yOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdHlwZW9mIEN0b3IgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KEN0b3IudG9TdHJpbmcoKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhc1N5bWJvbCA9XHJcbiAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxyXG4gIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpXHJcblxyXG5sZXQgX1NldFxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXHJcbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XHJcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXHJcbiAgX1NldCA9IFNldFxyXG59IGVsc2Uge1xyXG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cclxuICBfU2V0ID0gY2xhc3MgU2V0IGltcGxlbWVudHMgU2ltcGxlU2V0IHtcclxuICAgIHNldDogT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxyXG4gICAgfVxyXG4gICAgaGFzKGtleTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXHJcbiAgICB9XHJcbiAgICBhZGQoa2V5OiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgdGhpcy5zZXRba2V5XSA9IHRydWVcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlU2V0IHtcclxuICBoYXMoa2V5OiBzdHJpbmcgfCBudW1iZXIpO1xyXG4gIGFkZChrZXk6IHN0cmluZyB8IG51bWJlcik7XHJcbiAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHsgX1NldCB9XHJcbiIsIi8qKiDniLblr7nosaHplK7lkI0gKi9cclxuY29uc3QgcGFyZW50T2JqS2V5TmFtZTogc3ltYm9sID0gU3ltYm9sKCk7XHJcbi8qKiBrZXnlgLzplK7lkI0gKi9cclxuY29uc3Qga2V5S2V5TmFtZTogc3ltYm9sID0gU3ltYm9sKCk7XHJcblxyXG4vKipcclxuICog5Yib5bu6YXBp5o6n5Yi25ZmoXHJcbiAqIEBwYXJhbSBfcm9vdFBhdGgg5qC56Lev5b6EXHJcbiAqIEBwYXJhbSBfYXBpT2JqIGFwaeWvueixoVxyXG4gKiBAcGFyYW0gX29wIOmAiemhuVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwaUNvbjxBcGlPYmogZXh0ZW5kcyBvYmplY3QgPSB7fT4oX3Jvb3RQYXRoOiBzdHJpbmcsIF9hcGlPYmo6IEFwaU9iaiwgX29wPzoge1xyXG4gICAgLyoqIOi3r+W+hOiKgueCuemUruWQjSAqL1xyXG4gICAgcGF0aE5vZGVLZXlOYW1lPzogc3RyaW5nLFxyXG59KTogQXBpT2JqIHtcclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICBfb3AgPSB7XHJcbiAgICAgICAgcGF0aE5vZGVLZXlOYW1lOiAncGF0aE5vZGUnLFxyXG4gICAgICAgIC4uLl9vcCxcclxuICAgIH07XHJcbiAgICAvKiog6YCS5b2S5Yib5bu6YXBp5o6n5Yi25ZmoICovXHJcbiAgICBmdW5jdGlvbiB0cmF2ZXJzZShfYXBpT2JqOiBvYmplY3QpIHtcclxuICAgICAgICBmb3IgKGxldCBbX2ksIF9pdGVtXSBvZiBPYmplY3QuZW50cmllcyhfYXBpT2JqKSkge1xyXG4gICAgICAgICAgICAvL+WmguaenOWAvOaYr+aWueazleeahOivnVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIF9pdGVtID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIC8v6YeN5paw6LWL5YC85LiA5Liq57uR5a6a5LqG5Luj55CG5a+56LGh55qE5pa55rOVXHJcbiAgICAgICAgICAgICAgICBfYXBpT2JqW19pXSA9IChfaXRlbSBhcyBGdW5jdGlvbikuYmluZChnZXRQYXRoT2JqUHJveHkoX2FwaU9iaikpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfaXRlbSA9PSAnb2JqZWN0JyAmJiBfaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7niLblr7nosaFcclxuICAgICAgICAgICAgICAgIF9pdGVtW3BhcmVudE9iaktleU5hbWVdID0gX2FwaU9iajtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u6ZSu5ZCNXHJcbiAgICAgICAgICAgICAgICBfaXRlbVtrZXlLZXlOYW1lXSA9IF9pO1xyXG4gICAgICAgICAgICAgICAgLy/pgJLlvZJcclxuICAgICAgICAgICAgICAgIHRyYXZlcnNlKF9pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKiDojrflj5bkuIDkuKrot6/lvoTlr7nosaHku6PnkIYgKi9cclxuICAgIGZ1bmN0aW9uIGdldFBhdGhPYmpQcm94eShfYXBpT2JqOiBvYmplY3QpOiB7XHJcbiAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgfSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7XHJcbiAgICAgICAgICAgIHBhdGg6ICcnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBnZXQoXywgcDogc3RyaW5nIHwgc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIC9eXFwkPyhwYXRofGFwaSkkL2kudGVzdChwIGFzIHN0cmluZyk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+U5Zue5LiA5Liq5pW055CG5aW955qE6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcm9vdFBhdGgucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBieUFwaU9iakdldFBhdGgoX2FwaU9iaiwgX29wLnBhdGhOb2RlS2V5TmFtZSkucmVwbGFjZSgvXlxcLysvLCAnJykucmVwbGFjZSgvXFwvKy9nLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgdHJhdmVyc2UoX2FwaU9iaik7XHJcbiAgICAvL1xyXG4gICAgcmV0dXJuIF9hcGlPYmo7XHJcbn1cclxuXHJcbi8qKiDpgJrov4dhcGnlr7nosaHojrflj5bot6/lvoQgKi9cclxuZnVuY3Rpb24gYnlBcGlPYmpHZXRQYXRoKF9vYmo6IG9iamVjdCwgX25vZGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFfb2JqW3BhcmVudE9iaktleU5hbWVdKSB7IHJldHVybiAnJzsgfVxyXG4gICAgbGV0IF9sZWZ0ID0gYnlBcGlPYmpHZXRQYXRoKF9vYmpbcGFyZW50T2JqS2V5TmFtZV0sIF9ub2RlTmFtZSk7XHJcbiAgICByZXR1cm4gKF9sZWZ0ID8gYCR7X2xlZnR9L2AgOiAnJykgKyAoX29ialtfbm9kZU5hbWVdIHx8IF9vYmpba2V5S2V5TmFtZV0pO1xyXG59IiwiLyoqIFxyXG4gKiDln7rnsbvmlbDmja5cclxuICog6ZyA6KaB6KKr5pWw5o2u5Luj55CG5Zmo566h55CG55qE5pWw5o2u5b+F6aG76YeN6L+Z6YeM57un5om/XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURhdGEgeyB9XHJcblxyXG4vL1xyXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoQmFzZURhdGEucHJvdG90eXBlLCBudWxsKTsiLCJpbXBvcnQgeyBCYXNlRGF0YSB9IGZyb20gXCIuL0Jhc2VEYXRhXCI7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZURhdGFQcm94eSB9IGZyb20gXCIuL18vTG9jYWxTdG9yYWdlRGF0YVByb3h5XCI7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZV8gfSBmcm9tIFwiLi9fL0xvY2FsU3RvcmFnZV9cIjtcclxuXHJcbi8qKlxyXG4gKiDln7rnsbvmlbDmja7ku6PnkIblmahcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGF0YVByb3h5PERhdGEgZXh0ZW5kcyBCYXNlRGF0YT4ge1xyXG4gICAgLyoqIOS/neWtmOaXtueahOWQjeWtl++8jOe7p+aJv+S7peimhuebliAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBrZXkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqIOS/neWtmOaXtueahOeJiOacrO+8jOe7p+aJv+S7peimhuebliAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCB2KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcxLjAnO1xyXG4gICAgfVxyXG4gICAgLyoqIOS/neWtmOaXtueUqOeahOe7hOWQiOWQjeWtlyAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgX2tleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmtleX1AJHt0aGlzLnZ9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W5Luj55CG5ZmoICovXHJcbiAgICBwdWJsaWMgZ2V0IHByb3h5KCk6IExvY2FsU3RvcmFnZURhdGFQcm94eSB7XHJcbiAgICAgICAgcmV0dXJuIExvY2FsU3RvcmFnZV8uZ2V0SXRlbVByb3h5KHRoaXMuX2tleSk7XHJcbiAgICB9XHJcbiAgICAvKiog6I635Y+W5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIExvY2FsU3RvcmFnZV8uZ2V0SXRlbSh0aGlzLl9rZXksIHRoaXMuZ2V0RGVmYXVsdERhdGEoKSk7XHJcbiAgICB9XHJcbiAgICAvKiog6K6+572u5pWw5o2uICovXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEoX2RhdGE6IERhdGEpIHtcclxuICAgICAgICBMb2NhbFN0b3JhZ2VfLnNldEl0ZW0odGhpcy5fa2V5LCBfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiOt+WPlum7mOiupOaVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldERlZmF1bHREYXRhKCk6IERhdGE7XHJcbn0iLCJpbXBvcnQgeyBjcmVhdGVNaWNyb1Rhc2tzIH0gZnJvbSBcIi4uLy4uL2NyZWF0ZU1pY3JvVGFza3NcIjtcclxuaW1wb3J0IHsgY2xlYW5Qcm94eU9iakZ1biwgY3JlYXRlUHJveHlPYmosIGdldFByb3h5T2JqS2V5IH0gZnJvbSBcIi4vY3JlYXRlUHJveHlPYmpcIjtcclxuXHJcbi8qKlxyXG4gKiDmnKzlnLDmlbDmja7ku6PnkIZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VEYXRhUHJveHkge1xyXG4gIC8qKiDplK7lkI0gKi9cclxuICBwcml2YXRlIGtleTogc3RyaW5nO1xyXG4gIC8qKiByb2905pWw5o2uICovXHJcbiAgcHJpdmF0ZSByb290RGF0YTogYW55O1xyXG4gIC8qKiDnirbmgIHnoIEgKi9cclxuICBwcml2YXRlIHN0YXRlQ29kZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqIOiusOW9leaYr+WQpue8lui+kSAqL1xyXG4gIHByaXZhdGUgaWZFZGl0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKiDnm5HlkKzlmajliJfooaggKi9cclxuICBwcml2YXRlIHdhdGNoczoge1xyXG4gICAgdGhpczogYW55LFxyXG4gICAgZnVuOiBGdW5jdGlvbixcclxuICAgIG9iaktleTogc3ltYm9sLFxyXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wsXHJcbiAgfVtdID0gW107XHJcblxyXG4gIC8qKiDojrflj5bmlbDmja4gKi9cclxuICBnZXQgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3REYXRhO1xyXG4gIH1cclxuICAvKiog6K6+572u5pWw5o2uICovXHJcbiAgc2V0IGRhdGEoX2RhdGE6IGFueSkge1xyXG4gICAgaWYgKHRoaXMucm9vdERhdGEgPT0gX2RhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAvLyDmuIXnkIbmjonkuIrkuIDkuKrlr7nosaHkuIrnu5HlrprnmoTlm57osINcclxuICAgIGNsZWFuUHJveHlPYmpGdW4odGhpcy5yb290RGF0YSk7XHJcbiAgICAvL1xyXG4gICAgdGhpcy5fc2F2ZShfZGF0YSk7XHJcbiAgICAvL+mHjeaWsOiOt+WPluaVsOaNrlxyXG4gICAgdGhpcy5nZXREYXRhKCk7XHJcbiAgICAvL+S/ruaUuee8lui+keeKtuaAgVxyXG4gICAgdGhpcy5pZkVkaXQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKiDliJ3lp4vljJYgKi9cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZykge1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB0aGlzLmdldERhdGEoKTtcclxuICB9XHJcblxyXG4gIC8qKiDojrflj5bmlbDmja4gKi9cclxuICBwdWJsaWMgZ2V0RGF0YSgpIHtcclxuICAgIGxldCBfZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8v5Y+N5bqP5YiX5YyW5pWw5o2u77yM5aaC5p6c5oql6ZSZ5YiZ6K+05piO5piv57qv5a2X56ym5Liy77yM5bCx5LiN55So566h5a6D5LqGXHJcbiAgICAgIF9kYXRhID0gSlNPTi5wYXJzZShfZGF0YSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCB7IH1cclxuICAgIC8v6I635Y+W5LiA5Liq5Luj55CG5pWw5o2u77yM5bm25re75Yqg55uR5ZCsXHJcbiAgICB0aGlzLnJvb3REYXRhID0gY3JlYXRlUHJveHlPYmooX2RhdGEsIHtcclxuICAgICAgc2V0OiAoLi4uYXJnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRCYWNrKC4uLmFyZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIC8v6YCS5aKe54q25oCB56CBXHJcbiAgICB0aGlzLnN0YXRlQ29kZSsrO1xyXG4gIH1cclxuXHJcbiAgLyoqIOaVsOaNruS/ruaUueWbnuiwgyAqL1xyXG4gIHByaXZhdGUgc2V0QmFjayh0YXJnZXQ6IGFueSwgcDogc3RyaW5nIHwgc3ltYm9sLCBuZXdWYWx1ZTogYW55LCB2YWx1ZTogYW55KSB7XHJcbiAgICBsZXQgX29iaktleTogc3ltYm9sID0gZ2V0UHJveHlPYmpLZXkodGFyZ2V0KTtcclxuICAgIC8v6Kem5Y+R55uR5ZCsXHJcbiAgICB0aGlzLndhdGNocy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChfb2JqS2V5ID09IGl0ZW0ub2JqS2V5ICYmIGl0ZW0ua2V5ID09IHApIHtcclxuICAgICAgICBpdGVtLmZ1bi5jYWxsKGl0ZW0udGhpcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuaWZFZGl0KSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5pZkVkaXQgPSB0cnVlO1xyXG4gICAgbGV0IF9zdGF0ZUNvZGU6IG51bWJlciA9IHRoaXMuc3RhdGVDb2RlO1xyXG4gICAgLy/nlKjlvq7ku7vliqHmnaXmiafooYzkv53lrZjmlrnms5VcclxuICAgIGNyZWF0ZU1pY3JvVGFza3MoKCkgPT4ge1xyXG4gICAgICAvKiog54q25oCB56CB5LiN5LiA5qC35LqG55qE6K+d6K+05piO5qC55pWw5o2u5Y+R6YCB55qE5Y+Y5YyW77yM5q2k5pe25bCx5LiN55So5Zyo5L+d5a2Y5LmL5YmN55qE5qC55pWw5o2u5LqGICovXHJcbiAgICAgIGlmIChfc3RhdGVDb2RlICE9IHRoaXMuc3RhdGVDb2RlKSB7IHJldHVybjsgfVxyXG4gICAgICAvL1xyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5pWw5o2uXHJcbiAgICogQHBhcmFtIF90aGlzIOaJp+ihjOWfn1xyXG4gICAqIEBwYXJhbSBfZnVuIOaJp+ihjOaWueazlVxyXG4gICAqIEBwYXJhbSBfb2JqIOebkeWQrOWvueixoVxyXG4gICAqIEBwYXJhbSBfa2V5IOebkeWQrOmUrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbihfdGhpczogYW55LCBfZnVuOiBGdW5jdGlvbiwgX29iajogYW55LCBfa2V5OiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgbGV0IF9vYmpLZXk6IHN5bWJvbCA9IGdldFByb3h5T2JqS2V5KF9vYmopO1xyXG4gICAgaWYgKCFfb2JqS2V5KSB7IHJldHVybjsgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KF9rZXkpKSB7IF9rZXkgPSBbX2tleV07IH1cclxuICAgIF9rZXkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIHRoaXMud2F0Y2hzLnB1c2goe1xyXG4gICAgICAgIHRoaXM6IF90aGlzLFxyXG4gICAgICAgIGZ1bjogX2Z1bixcclxuICAgICAgICBvYmpLZXk6IF9vYmpLZXksXHJcbiAgICAgICAga2V5OiBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOebkeWQrOS4gOasoeaVsOaNrlxyXG4gICAqIEBwYXJhbSBfdGhpcyDmiafooYzln59cclxuICAgKiBAcGFyYW0gX2Z1biDmiafooYzmlrnms5VcclxuICAgKiBAcGFyYW0gX29iaiDnm5HlkKzlr7nosaFcclxuICAgKiBAcGFyYW0gX2tleSDnm5HlkKzplK5cclxuICAgKi9cclxuICBwdWJsaWMgb25jZShfdGhpczogYW55LCBfZnVuOiBGdW5jdGlvbiwgX29iajogYW55LCBfa2V5OiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgbGV0IF9vYmpLZXk6IHN5bWJvbCA9IGdldFByb3h5T2JqS2V5KF9vYmopO1xyXG4gICAgaWYgKCFfb2JqS2V5KSB7IHJldHVybjsgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KF9rZXkpKSB7IF9rZXkgPSBbX2tleV07IH1cclxuICAgIGxldCBfX3RoaXMgPSB0aGlzO1xyXG4gICAgX2tleS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgLy/miopfZnVu5YyF6KOF5oiQ5LiA5Liq5omn6KGM5LqG5LiA5qyh5bCx5Yig6Zmk5o6J6Ieq6Lqr55qE55uR5ZCs5pa55rOVXHJcbiAgICAgIGxldCBfX2Z1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfZnVuLmNhbGwoX3RoaXMpO1xyXG4gICAgICAgIF9fdGhpcy5vZmYoX3RoaXMsIF9fZnVuKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uKF90aGlzLCBfX2Z1biwgX29iaiwga2V5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDlj5bmtojnm5HlkKzmlbDmja5cclxuICAgKiBAcGFyYW0gX3RoaXMg5omn6KGM5Z+fXHJcbiAgICogQHBhcmFtIF9mdW4g5omn6KGM5pa55rOVXHJcbiAgICovXHJcbiAgcHVibGljIG9mZihfdGhpczogYW55LCBfZnVuOiBGdW5jdGlvbiA9IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy53YXRjaHMgPSB0aGlzLndhdGNocy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuICEoaXRlbS50aGlzID09IF90aGlzICYmIChfZnVuID8gaXRlbS5mdW4gPT0gX2Z1biA6IHRydWUpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFxyXG4gICAqIOW8uuWItuS/neWtmOaVsOaNrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBmb3JjZVNhdmUoKSB7XHJcbiAgICB0aGlzLl9zYXZlKHRoaXMucm9vdERhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOS/neWtmOaVsOaNriAqL1xyXG4gIHByaXZhdGUgc2F2ZSgpIHtcclxuICAgIGlmICghdGhpcy5pZkVkaXQpIHsgcmV0dXJuOyB9O1xyXG4gICAgdGhpcy5pZkVkaXQgPSBmYWxzZTtcclxuICAgIC8vXHJcbiAgICB0aGlzLl9zYXZlKHRoaXMucm9vdERhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOS/neWtmOaVsOaNruWIsOacrOWcsCAqL1xyXG4gIHByaXZhdGUgX3NhdmUoX2RhdGE6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBfZGF0YSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIF9kYXRhID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgX2RhdGEgPSAnJztcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgX2RhdGEpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IExvY2FsU3RvcmFnZURhdGFQcm94eSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZURhdGFQcm94eVwiO1xyXG5cclxuLyoqXHJcbiAqIOacrOWcsOaVsOaNruexu1xyXG4gKiAqIOS4gOS4qmxvY2FsU3RvcmFnZeeahOmVnOWDj+exu++8jOacieedgOW3ruS4jeWkmueahOaWueazle+8jOS9huaYr+S7jui/memHjOiOt+WPlueahOaVsOaNruaYr+W4puacieiHquWKqOS/neWtmOeahOWKn+iDveeahOOAglxyXG4gKiDnvJPlrZjnlKjliLDnmoTmlbDmja7vvIzkuI3nlKjmr4/mrKHojrflj5bml7blsLHljrvor7vlj5ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VfIHtcclxuICAvKiog57yT5a2Y5pWw5o2u5Luj55CG5YiX6KGoICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY2F0Y2hEYXRhUHJveHlzOiB7XHJcbiAgICBbaW5kZXg6IHN0cmluZ106IExvY2FsU3RvcmFnZURhdGFQcm94eTtcclxuICB9ID0ge307XHJcblxyXG4gIC8qKiDojrflj5bmnKzlnLDnmoTlhajpg6jmlbDmja7vvIznm7TmjqXnlKjlsZ7mgKforr/pl64gKi9cclxuICBwdWJsaWMgc3RhdGljIGdldCBkYXRhcygpOiB7XHJcbiAgICBbaW5kZXg6IHN0cmluZ106IGFueVxyXG4gIH0ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAvKiogaW7mk43kvZznrKYg5Yik5pat5pyJ5rKh5pyJICovXHJcbiAgICAgIGhhcyh0YXJnZXQ6IGFueSwgcDogc3RyaW5nIHwgc3ltYm9sKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShwIGFzIHN0cmluZykgIT0gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgLyoqIOiOt+WPliAqL1xyXG4gICAgICBnZXQodGFyZ2V0OiBhbnksIHA6IHN0cmluZyB8IHN5bWJvbCwgcmVjZWl2ZXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShwIGFzIHN0cmluZyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8qKiDorr7nva4gKi9cclxuICAgICAgc2V0KHRhcmdldDogYW55LCBwOiBzdHJpbmcgfCBzeW1ib2wsIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLnNldEl0ZW0ocCBhcyBzdHJpbmcsIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5pWw5o2u5Luj55CGXHJcbiAgICog6L+Z5Liq5a+56LGh5piv5Y+v6IO95Lya5Yqo5oCB5pu05pS555qE77yM5omA5Lul6KaB55So55qE5pe25YCZ55u05o6l5LuO6L+Z6YeM6I635Y+W5bCx6KGM5LiN6KaB5Y+m5a2Y5LiA5Lu9XHJcbiAgICog5pWw5o2u5Luj55CG5Y+v5Lul55uR5ZCs5pWw5o2u55qE5pu05pS577yM5LuO6ICM5YGa5Ye65YW25LuW5pON5L2cXHJcbiAgICog5Lmf5Y+v5Lul55u05o6l5pu05pS5ZGF0YVxyXG4gICAqIEBwYXJhbSBfaW5kZXgg5pWw5o2u6ZSu5ZCNXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJdGVtUHJveHkoX2luZGV4OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmNhdGNoRGF0YVByb3h5c1tfaW5kZXhdIHx8ICh0aGlzLmNhdGNoRGF0YVByb3h5c1tfaW5kZXhdID0gbmV3IExvY2FsU3RvcmFnZURhdGFQcm94eShfaW5kZXgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluaVsOaNruWvueixoVxyXG4gICAqIOi/meS4quWvueixoeaYr+WPr+iDveS8muWKqOaAgeabtOaUueeahO+8jOaJgOS7peimgeeUqOeahOaXtuWAmeebtOaOpeS7jui/memHjOiOt+WPluWwseihjOS4jeimgeWPpuWtmOS4gOS7vVxyXG4gICAqIEBwYXJhbSBfaW5kZXgg5pWw5o2u6ZSu5ZCNXHJcbiAgICogQHBhcmFtIF9kZWZhdWx0IOm7mOiupOWAvO+8jOWmguaenOayoeacieeahOivneWwseS7pem7mOiupOWAvOWhq+WFhVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SXRlbShfaW5kZXg6IHN0cmluZywgX2RlZmF1bHQ6IG9iamVjdCB8IHN0cmluZyA9IG51bGwpIHtcclxuICAgIGxldCBfZGF0YVByb3h5ID0gdGhpcy5nZXRJdGVtUHJveHkoX2luZGV4KTtcclxuICAgIGlmIChfZGF0YVByb3h5LmRhdGEgPT09IG51bGwgJiYgX2RlZmF1bHQpIHtcclxuICAgICAgdGhpcy5zZXRJdGVtKF9pbmRleCwgX2RlZmF1bHQpO1xyXG4gICAgfVxyXG4gICAgLy/ov5Tlm57lhbbkuK3nmoTmlbDmja5cclxuICAgIHJldHVybiBfZGF0YVByb3h5LmRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7mlbDmja5cclxuICAgKiBAcGFyYW0gX2luZGV4IOaVsOaNrumUruWQjVxyXG4gICAqIEBwYXJhbSBfZGF0YSDmlbDmja5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHNldEl0ZW0oX2luZGV4OiBzdHJpbmcsIF9kYXRhOiBvYmplY3QgfCBzdHJpbmcpIHtcclxuICAgIC8v5YWI6I635Y+W5a6D55qE5Luj55CG5ZmoXHJcbiAgICB0aGlzLmdldEl0ZW1Qcm94eShfaW5kZXgpLmRhdGEgPSBfZGF0YTtcclxuICB9XHJcbn0iLCIvKiog5Luj55CG5a+56LGh5ZSv5LiAa2V55qCH6K+GICovXHJcbmNvbnN0IF9wcm94eUtleSA9IFN5bWJvbCgnX3Byb3h5S2V5Jyk7XHJcbi8qKiDku6PnkIblr7nosaHlm57osIPmiafooYzmlrnms5XmoIfor4YgKi9cclxuY29uc3QgX3Byb3h5RnVuS2V5ID0gU3ltYm9sKCdfcHJveHlGdW5LZXknKTtcclxuLyoqIOS7o+eQhuWvueixoeS/neeVmWtleeagh+ivhiAqL1xyXG5jb25zdCBfcHJveHlLZWVwS2V5czogc3ltYm9sW10gPSBbX3Byb3h5S2V5LCBfcHJveHlGdW5LZXldO1xyXG5cclxuLyoqIOWFs+mXreS7o+eQhumYn+WIl++8jOatpOWAvOWPquiDveWcqHNlY3VyaXR5RXhlRnVu5pa55rOV5Lit6KKr6K6+572u77yM6L+Z5qC35omN6IO95L+d6K+B5a6D5rC46L+c5LiN5Lya5bCP5LqOMCAqL1xyXG5sZXQgX29mZlByb3h5UXVldWU6IG51bWJlciA9IDA7XHJcbi8qKlxyXG4gKiDku6XlronlhajnmoTmlrnlvI/miafooYzmn5DkuKrmlrnms5VcclxuICog5bCx5piv6K+05omn6KGM6L+Z5Liq5pa55rOV55qE5pyf6Ze06Kem5Y+R55qE5Luj55CG5pON5L2c6YO95LiN5Lya5Lqn55Sf5Ymv5L2c55SoXHJcbiAqIEBwYXJhbSBfZiDnm67moIfmlrnms5VcclxuICovXHJcbmZ1bmN0aW9uIHNlY3VyaXR5RXhlRnVuKF9mOiBGdW5jdGlvbikge1xyXG4gICAgX29mZlByb3h5UXVldWUrKztcclxuICAgIF9mKCk7Ly/miafooYznm67moIfmlrnms5VcclxuICAgIF9vZmZQcm94eVF1ZXVlLS07XHJcbn1cclxuXHJcbi8qKiDmmK/lkKbog73miafooYzku6PnkIblia/kvZznlKjmk43kvZwgKi9cclxubGV0IF9pc1Byb3h5OiAoKSA9PiBib29sZWFuID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuIF9vZmZQcm94eVF1ZXVlID09PSAwO1xyXG59XHJcblxyXG4vKiog5Luj55CG5a+56LGh55qE5Zue6LCD5omn6KGM5pa55rOV57G75Z6LICovXHJcbnR5cGUgcHJveHlGdW5UeXBlID0ge1xyXG4gICAgLyoqIOaVsOaNruiiq+iuvue9rueahOWbnuiwgyAqL1xyXG4gICAgc2V0PzogKHRhcmdldCwgcDogc3RyaW5nIHwgc3ltYm9sLCBuZXdWYWx1ZSwgdmFsdWUpID0+IHZvaWQ7XHJcbiAgICAvKiog5pWw5o2u6KKr6I635Y+W5pe255qE5Zue6LCDICovXHJcbiAgICBnZXQ/OiAodGFyZ2V0LCBwOiBzdHJpbmcgfCBzeW1ib2wpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vKiog6I635Y+W5Luj55CG5a+56LGh5ZSv5LiAa2V5ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm94eU9iaktleShvYmopOiBzeW1ib2wge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KG9iaiwgX3Byb3h5S2V5KTtcclxufVxyXG4vKiog6I635Y+W5Luj55CG5a+56LGh5Zue6LCD5Ye95pWwICovXHJcbmZ1bmN0aW9uIGdldFByb3h5T2JqQmFja0Yob2JqKTogcHJveHlGdW5UeXBlIHtcclxuICAgIHJldHVybiBSZWZsZWN0LmdldChvYmosIF9wcm94eUZ1bktleSk7XHJcbn1cclxuLyoqIOiuvue9ruS7o+eQhuWvueixoeWbnuiwg+WHveaVsCAqL1xyXG5mdW5jdGlvbiBzZXRQcm94eU9iakJhY2tGKG9iaiwgX2Z1bjogcHJveHlGdW5UeXBlKSB7XHJcbiAgICBSZWZsZWN0LnNldChvYmosIF9wcm94eUZ1bktleSwgX2Z1bik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliJvlu7rkuIDkuKrku6PnkIblr7nosaFcclxuICog5Lya5oqK5a+56L+Z5Liq5a+56LGh55qE5ZCE56eN5pON5L2c5Zue6LCD5Ye65Y67XHJcbiAqIEBwYXJhbSBvYmog5Y6f5aeL5a+56LGhXHJcbiAqIEBwYXJhbSBfZnVuIOaVsOaNruiiq+iuvue9ruaXtueahOWbnuiwg1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5T2JqKG9iajogYW55LCBfZnVuOiBwcm94eUZ1blR5cGUgPSBudWxsKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9ICdvYmplY3QnKSB7IHJldHVybiBvYmo7IH1cclxuXHJcbiAgICAvL+mAkuW9kua3u+WKoOS7o+eQhlxyXG4gICAgZm9yIChsZXQgaSBpbiBvYmopIHtcclxuICAgICAgICAvL+S7peWuieWFqOeahOaWueW8j+aJp+ihjFxyXG4gICAgICAgIHNlY3VyaXR5RXhlRnVuKCgpID0+IHtcclxuICAgICAgICAgICAgb2JqW2ldID0gY3JlYXRlUHJveHlPYmoob2JqW2ldLCBfZnVuKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIpOaWreaYr+WQpuW3sue7j+iuvue9ruS6huS7o+eQhuS6hu+8jOayoeacieiuvue9rueahOivneWwseiuvue9rlxyXG4gICAgaWYgKCFnZXRQcm94eU9iaktleShvYmopKSB7XHJcbiAgICAgICAgLy/lrprkuYnku6PnkIblr7nosaHlv4XlpIfnmoTkuI3lj6/phY3nva7kuI3lj6/mnprkuL7lsZ7mgKdcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHtcclxuICAgICAgICAgICAgLy/llK/kuIDmoIfor4bvvIzkuI3lj6/lhplcclxuICAgICAgICAgICAgW19wcm94eUtleV06IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBTeW1ib2woKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/miafooYzlm57osIPvvIzlj6/lhplcclxuICAgICAgICAgICAgW19wcm94eUZ1bktleV06IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgb2JqID0gbmV3IFByb3h5KG9iaiwge1xyXG4gICAgICAgICAgICAvKiog5pWw5o2u6KKr6K6+572uICovXHJcbiAgICAgICAgICAgIHNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlmIChfaXNQcm94eSgpICYmICFfcHJveHlLZWVwS2V5cy5pbmNsdWRlcyhwIGFzIGFueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX3ZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+S4uuaWsOWAvOa3u+WKoOebkeWQrFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY3JlYXRlUHJveHlPYmoodmFsdWUsIGdldFByb3h5T2JqQmFja0YodGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mlrDml6flgLzkuI3kuIDmoLfml7bop6blj5Hlm57osINcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3ZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WFiOS4uuaXp+WAvOa4heeQhuS7o+eQhuWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhblByb3h5T2JqRnVuKF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByb3h5T2JqQmFja0YodGFyZ2V0KT8uc2V0Py4odGFyZ2V0LCBwIGFzIGFueSwgdmFsdWUsIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKiDmlbDmja7ooqvojrflj5YgKi9cclxuICAgICAgICAgICAgZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzUHJveHkoKSAmJiAhX3Byb3h5S2VlcEtleXMuaW5jbHVkZXMocCBhcyBhbnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osINcclxuICAgICAgICAgICAgICAgICAgICBnZXRQcm94eU9iakJhY2tGKHRhcmdldCk/LmdldD8uKHRhcmdldCwgcCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5qC55o2u5b2T5YmN5a+56LGh55qE5Zue6LCD5Ye95pWw5Yqo5oCB6K6+572u5LiA5LiL5a2Q5a+56LGh55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF92YWx1ZSAmJiB0eXBlb2YgX3ZhbHVlID09ICdvYmplY3QnICYmIGdldFByb3h5T2JqQmFja0YoX3ZhbHVlKSAhPSBnZXRQcm94eU9iakJhY2tGKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lrprkuYnmiafooYznm5HlkKzlm57osINcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJveHlPYmpCYWNrRihfdmFsdWUsIGdldFByb3h5T2JqQmFja0YodGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqIOaVsOaNruiiq+WIoOmZpCAqL1xyXG4gICAgICAgICAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHApIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzUHJveHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfdmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5riF55CG5Luj55CG5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5Qcm94eU9iakZ1bihfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UHJveHlPYmpCYWNrRih0YXJnZXQpPy5zZXQ/Lih0YXJnZXQsIHAgYXMgYW55LCB1bmRlZmluZWQsIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8v5a6a5LmJ5omn6KGM55uR5ZCs5Zue6LCDXHJcbiAgICBzZXRQcm94eU9iakJhY2tGKG9iaiwgX2Z1bik7XHJcbiAgICAvL1xyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIOa4heeQhuS7o+eQhuWvueixoeWbnuiwg+WHveaVsFxyXG4gKiBAcGFyYW0gb2JqIOebruagh+WvueixoVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuUHJveHlPYmpGdW4ob2JqOiBhbnkpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT0gJ29iamVjdCcpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoIWdldFByb3h5T2JqQmFja0Yob2JqKSkgeyByZXR1cm47IH1cclxuICAgIC8v6YCS5b2S5riF55CGXHJcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xyXG4gICAgICAgIC8v5Lul5a6J5YWo55qE5pa55byP5omn6KGMXHJcbiAgICAgICAgc2VjdXJpdHlFeGVGdW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhblByb3h5T2JqRnVuKG9ialtpXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgc2V0UHJveHlPYmpCYWNrRihvYmosIG51bGwpO1xyXG59IiwiaW1wb3J0IHsgQmFzZURhdGEgfSBmcm9tIFwiLi4vLi4vc3JjL2xvY2FsRGF0YS9CYXNlRGF0YVwiO1xyXG5pbXBvcnQgeyBCYXNlRGF0YVByb3h5IH0gZnJvbSBcIi4uLy4uL3NyYy9sb2NhbERhdGEvQmFzZURhdGFQcm94eVwiO1xyXG5cclxuY2xhc3MgRGF0YSBleHRlbmRzIEJhc2VEYXRhIHtcclxuICAgIGE6IG51bWJlciA9IDE7XHJcbiAgICBiOiBzdHJpbmcgPSAnYic7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0RGF0YVByb3h5IGV4dGVuZHMgQmFzZURhdGFQcm94eTxEYXRhPiB7XHJcbiAgICAvKiog6I635Y+W5paw5pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdERhdGEoKTogRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRhKCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUFwaUNvbiB9IGZyb20gXCJzcmMvaHR0cC9jcmVhdGVBcGlDb25cIjtcclxuaW1wb3J0IHsgVGVzdERhdGFQcm94eSB9IGZyb20gXCIuL2xvY2FsRGF0YS90ZXN0RGF0YVByb3h5XCI7XHJcblxyXG4vKiog5rWL6K+V6ISa5pysICovXHJcbmNvbnNvbGUubG9nKCflk4jlk4gyJyk7XHJcblxyXG5sZXQgdGVzdERhdGEgPSBuZXcgVGVzdERhdGFQcm94eSgpO1xyXG4vL+azqOWFpeWIsOWFqOWxgOaWueS+v+iuvue9rlxyXG53aW5kb3dbJ3Rlc3REYXRhJ10gPSB0ZXN0RGF0YTtcclxuXHJcbmNvbnNvbGUubG9nKHRlc3REYXRhLmRhdGEuYSk7XHJcblxyXG5sZXQgYXBpQ29uID0gY3JlYXRlQXBpQ29uKCd3d3cuYmFpZHUuY29tJywge1xyXG4gICAgYToge1xyXG4gICAgICAgIGdldEEoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBiOiB7XHJcbiAgICAgICAgZ2V0QigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGM6IHtcclxuICAgICAgICAgICAgZ2V0Qyhfb3A6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgLy/nm7jlvZPkuo5mZXRjaCgnd3d3LmJhaWR1LmNvbS9iL2MnKTtcclxuICAgICAgICAgICAgICAgIGZldGNoKHRoaXMucGF0aCkudGhlbigoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbndpbmRvd1snYXBpQ29uJ10gPSBhcGlDb247XHJcblxyXG5jb25zb2xlLmxvZyhhcGlDb24uYi5jLmdldEMoJ+iOt+WPlmPmjqXlj6PmlbDmja4nKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9