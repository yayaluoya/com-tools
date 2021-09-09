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
                switch (p) {
                    case 'path':
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
                return this.path + '/' + _op;
            },
        },
    },
});
window['apiCon'] = apiCon;
console.log(apiCon.b.c.getC('获取c接口数据'));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBVztBQUNYLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUM7QUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTdCLElBQUksTUFBTSxHQUFHLG1FQUFZLENBQUMsZUFBZSxFQUFFO0lBQ3ZDLENBQUMsRUFBRTtRQUNDLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztLQUNKO0lBQ0QsQ0FBQyxFQUFFO1FBQ0MsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0QsQ0FBQyxFQUFFO1lBQ0MsSUFBSSxDQUFDLEdBQVc7Z0JBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDakMsQ0FBQztTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi9zcmMvY3JlYXRlTWljcm9UYXNrcy50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvZW52LnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9odHRwL2NyZWF0ZUFwaUNvbi50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvbG9jYWxEYXRhL0Jhc2VEYXRhLnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvQmFzZURhdGFQcm94eS50cyIsIndlYnBhY2s6Ly93ZWIvLi9zcmMvbG9jYWxEYXRhL18vTG9jYWxTdG9yYWdlRGF0YVByb3h5LnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvXy9Mb2NhbFN0b3JhZ2VfLnRzIiwid2VicGFjazovL3dlYi8uL3NyYy9sb2NhbERhdGEvXy9jcmVhdGVQcm94eU9iai50cyIsIndlYnBhY2s6Ly93ZWIvLi90ZXN0L2xvY2FsRGF0YS90ZXN0RGF0YVByb3h5LnRzIiwid2VicGFjazovL3dlYi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi8uL3Rlc3QvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOadpeiHqnZ1Zea6kOeggVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGlzSUUsIGlzTmF0aXZlIH0gZnJvbSBcIi4vZW52XCI7XHJcblxyXG5sZXQgaXNVc2luZ01pY3JvVGFzazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuLyoqIOW+ruS7u+WKoeaJp+ihjOmYn+WIlyAqL1xyXG5jb25zdCBjYWxsYmFja3MgPSBbXTtcclxuLyoqIOaYr+WQpuW3sue7j+acieS7u+WKoeS6hiAqL1xyXG5sZXQgcGVuZGluZyA9IGZhbHNlO1xyXG5cclxuLyoqIOaJp+ihjOaJgOacieazqOWGjOeahOS7u+WKoSAqL1xyXG5mdW5jdGlvbiBmbHVzaENhbGxiYWNrcygpIHtcclxuICAgIHBlbmRpbmcgPSBmYWxzZVxyXG4gICAgY29uc3QgY29waWVzID0gWy4uLmNhbGxiYWNrc107XHJcbiAgICBjYWxsYmFja3MubGVuZ3RoID0gMC8v5riF56m65Lu75Yqh5YiX6KGoXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvcGllc1tpXSgpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiDlvq7ku7vliqHmiafooYzlmajvvIzlnKjlvq7ku7vliqHkuK3miafooYxmbHVzaENhbGxiYWNrc+aWueazlSAqL1xyXG5sZXQgdGltZXJGdW5jO1xyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuWFvOWuueaAp+W8uueahOW+ruS7u+WKoeaJp+ihjOWZqO+8jOW5tui1i+WAvOe7mXRpbWVyRnVuY1xyXG4gKi9cclxuXHJcbi8qKiDkvJjlhYjnlKhwcm9taXNl5p2l5a6e546wICovXHJcbmlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcclxuICAgIGNvbnN0IHAgPSBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHAudGhlbihmbHVzaENhbGxiYWNrcyk7XHJcbiAgICB9XHJcbiAgICBpc1VzaW5nTWljcm9UYXNrID0gdHJ1ZVxyXG59XHJcbi8qKiDlhbbmrKHnlKhNdXRhdGlvbk9ic2VydmVy5p2l5a6e546w77yMTXV0YXRpb25PYnNlcnZlcuS8muWcqOinguWvn+eahOWFg+e0oOWPkeeUn+abtOaUueaXtuWcqOW+ruS7u+WKoeS4reaJp+ihjOazqOWGjOeahOaWueazlSAqL1xyXG5lbHNlIGlmICghaXNJRSAmJiB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxyXG4gICAgaXNOYXRpdmUoTXV0YXRpb25PYnNlcnZlcikgfHxcclxuICAgIE11dGF0aW9uT2JzZXJ2ZXIudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTXV0YXRpb25PYnNlcnZlckNvbnN0cnVjdG9yXSdcclxuKSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZsdXNoQ2FsbGJhY2tzKVxyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY291bnRlcikpXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxyXG4gICAgfSlcclxuICAgIHRpbWVyRnVuYyA9ICgpID0+IHtcclxuICAgICAgICBjb3VudGVyID0gKGNvdW50ZXIgKyAxKSAlIDJcclxuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gU3RyaW5nKGNvdW50ZXIpXHJcbiAgICB9XHJcbiAgICBpc1VzaW5nTWljcm9UYXNrID0gdHJ1ZVxyXG59XHJcbi8qKiBcclxuICog5YaN55Soc2V0SW1tZWRpYXRl5p2l5a6e546w77yM6K+l5pa55rOV55So5p2l5oqK5LiA5Lqb6ZyA6KaB6ZW/5pe26Ze06L+Q6KGM55qE5pON5L2c5pS+5Zyo5LiA5Liq5Zue6LCD5Ye95pWw6YeM77yM5Zyo5rWP6KeI5Zmo5a6M5oiQ5ZCO6Z2i55qE5YW25LuW6K+t5Y+l5ZCO77yM5bCx56uL5Yi75omn6KGM6L+Z5Liq5Zue6LCD5Ye95pWwIFxyXG4gKiDms6jmhI/ov5nkuKrmlrnms5XkuI3mmK/moIflh4bnmoTmlrnms5XvvIzlsL3ph4/kuI3opoHkvb/nlKhcclxuICovXHJcbmVsc2UgaWYgKHR5cGVvZiB3aW5kb3dbJ3NldEltbWVkaWF0ZSddICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZSh3aW5kb3dbJ3NldEltbWVkaWF0ZSddKSkge1xyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvd1snc2V0SW1tZWRpYXRlJ10oZmx1c2hDYWxsYmFja3MpXHJcbiAgICB9XHJcbn1cclxuLyoqIOacgOWQjueUqHNldFRpbWVvdXTmlrnms5XmnaXlrp7njrDvvIzov5nkuKrmlrnms5XmmK/mgKfog73mnIDlt67nmoTvvIzogIzkuJTlroPmt7vliqDnmoTmmK/kuKrlro/ku7vliqEgKi9cclxuZWxzZSB7XHJcbiAgICAvLyBGYWxsYmFjayB0byBzZXRUaW1lb3V0LlxyXG4gICAgdGltZXJGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZmx1c2hDYWxsYmFja3MsIDApXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliJvlu7rkuIDkuKrlvq7ku7vliqFcclxuICogQHBhcmFtIHsqfSBjYiDmiafooYzmlrnms5VcclxuICogQHBhcmFtIHsqfSBjdHgg5omn6KGM5Z+fXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWljcm9UYXNrcyhjYj86IEZ1bmN0aW9uLCBjdHg/OiBPYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy/mjqjlhaXku7vliqHliLDmiafooYzpmJ/liJfkuK1cclxuICAgIGxldCBfcmVzb2x2ZVxyXG4gICAgY2FsbGJhY2tzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5Zue6LCD5Ye95pWw5bCx5YyF6KOF5LiL77yM5o2V6I635byC5bi4XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGN0eClcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5b6u5Lu75Yqh5omn6KGM5byC5bi4JywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmsqHmnInlm57osIPlh73mlbDlsLHop6PlhrPov5Tlm57nmoRwcm9taWNlXHJcbiAgICAgICAgZWxzZSBpZiAoX3Jlc29sdmUpIHtcclxuICAgICAgICAgICAgX3Jlc29sdmUoY3R4KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvL+WFiOWIpOaWreS4i+aYr+WQpuW3sue7j+WcqOaJp+ihjOaJp+ihjOS7u+WKoeS6hu+8jOiLpeaenOWcqOaJp+ihjOWwseS4jeiwg+eUqOS6hu+8jOS/neivgeS4gOasoeWuj+S7u+WKoeWPquaJp+ihjOS4gOasoVxyXG4gICAgaWYgKCFwZW5kaW5nKSB7XHJcbiAgICAgICAgcGVuZGluZyA9IHRydWVcclxuICAgICAgICAvL+aJp+ihjOaJp+ihjOmYn+WIl+S4reeahOS7u+WKoVxyXG4gICAgICAgIHRpbWVyRnVuYygpXHJcbiAgICB9XHJcbiAgICAvL+WmguaenOayoeacieS8oOWFpeWbnuiwg+aWueazle+8jOS4lOaciVByb21pc2XliJnov5Tlm57kuIDkuKpwcm9taXNl5a6e5L6L77yM5Zyo5Zue6LCD6KKr5omn6KGM5pe26Kej5YazXHJcbiAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIOadpeiHqnZ1Zea6kOeggVxyXG4gKi9cclxuXHJcbi8vIGNhbiB3ZSB1c2UgX19wcm90b19fP1xyXG5leHBvcnQgY29uc3QgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fVxyXG5cclxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xyXG5leHBvcnQgY29uc3QgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuZXhwb3J0IGNvbnN0IGluV2VleCA9IHR5cGVvZiB3aW5kb3dbJ1dYRW52aXJvbm1lbnQnXSAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3dbJ1dYRW52aXJvbm1lbnQnXS5wbGF0Zm9ybVxyXG5leHBvcnQgY29uc3Qgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIHdpbmRvd1snV1hFbnZpcm9ubWVudCddLnBsYXRmb3JtLnRvTG93ZXJDYXNlKClcclxuZXhwb3J0IGNvbnN0IFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcclxuZXhwb3J0IGNvbnN0IGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKVxyXG5leHBvcnQgY29uc3QgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMFxyXG5leHBvcnQgY29uc3QgaXNFZGdlID0gVUEgJiYgVUEuaW5kZXhPZignZWRnZS8nKSA+IDBcclxuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpXHJcbmV4cG9ydCBjb25zdCBpc0lPUyA9IChVQSAmJiAvaXBob25lfGlwYWR8aXBvZHxpb3MvLnRlc3QoVUEpKSB8fCAod2VleFBsYXRmb3JtID09PSAnaW9zJylcclxuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gVUEgJiYgL2Nocm9tZVxcL1xcZCsvLnRlc3QoVUEpICYmICFpc0VkZ2VcclxuZXhwb3J0IGNvbnN0IGlzUGhhbnRvbUpTID0gVUEgJiYgL3BoYW50b21qcy8udGVzdChVQSlcclxuZXhwb3J0IGNvbnN0IGlzRkYgPSBVQSAmJiBVQS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pXHJcblxyXG4vLyBGaXJlZm94IGhhcyBhIFwid2F0Y2hcIiBmdW5jdGlvbiBvbiBPYmplY3QucHJvdG90eXBlLi4uXHJcbmV4cG9ydCBjb25zdCBuYXRpdmVXYXRjaCA9ICh7fSlbJ3dhdGNoJ107XHJcblxyXG5leHBvcnQgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlXHJcbmlmIChpbkJyb3dzZXIpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHt9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pKSAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdC1wYXNzaXZlJywgbnVsbCwgb3B0cylcclxuICB9IGNhdGNoIChlKSB7IH1cclxufVxyXG5cclxuLy8gZGV0ZWN0IGRldnRvb2xzXHJcbmV4cG9ydCBjb25zdCBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3dbJ19fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX18nXTtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05hdGl2ZShDdG9yOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdHlwZW9mIEN0b3IgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KEN0b3IudG9TdHJpbmcoKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhc1N5bWJvbCA9XHJcbiAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxyXG4gIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpXHJcblxyXG5sZXQgX1NldFxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXHJcbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XHJcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXHJcbiAgX1NldCA9IFNldFxyXG59IGVsc2Uge1xyXG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cclxuICBfU2V0ID0gY2xhc3MgU2V0IGltcGxlbWVudHMgU2ltcGxlU2V0IHtcclxuICAgIHNldDogT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxyXG4gICAgfVxyXG4gICAgaGFzKGtleTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXHJcbiAgICB9XHJcbiAgICBhZGQoa2V5OiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgdGhpcy5zZXRba2V5XSA9IHRydWVcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlU2V0IHtcclxuICBoYXMoa2V5OiBzdHJpbmcgfCBudW1iZXIpO1xyXG4gIGFkZChrZXk6IHN0cmluZyB8IG51bWJlcik7XHJcbiAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHsgX1NldCB9XHJcbiIsIi8qKiDniLblr7nosaHplK7lkI0gKi9cclxuY29uc3QgcGFyZW50T2JqS2V5TmFtZTogc3ltYm9sID0gU3ltYm9sKCk7XHJcbi8qKiBrZXnlgLzplK7lkI0gKi9cclxuY29uc3Qga2V5S2V5TmFtZTogc3ltYm9sID0gU3ltYm9sKCk7XHJcblxyXG4vKipcclxuICog5Yib5bu6YXBp5o6n5Yi25ZmoXHJcbiAqIEBwYXJhbSBfcm9vdFBhdGgg5qC56Lev5b6EXHJcbiAqIEBwYXJhbSBfYXBpT2JqIGFwaeWvueixoVxyXG4gKiBAcGFyYW0gX29wIOmAiemhuVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwaUNvbjxBcGlPYmogZXh0ZW5kcyBvYmplY3QgPSB7fT4oX3Jvb3RQYXRoOiBzdHJpbmcsIF9hcGlPYmo6IEFwaU9iaiwgX29wPzoge1xyXG4gICAgLyoqIOi3r+W+hOiKgueCuemUruWQjSAqL1xyXG4gICAgcGF0aE5vZGVLZXlOYW1lPzogc3RyaW5nLFxyXG59KTogQXBpT2JqIHtcclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICBfb3AgPSB7XHJcbiAgICAgICAgcGF0aE5vZGVLZXlOYW1lOiAncGF0aE5vZGUnLFxyXG4gICAgICAgIC4uLl9vcCxcclxuICAgIH07XHJcbiAgICAvKiog6YCS5b2S5Yib5bu6YXBp5o6n5Yi25ZmoICovXHJcbiAgICBmdW5jdGlvbiB0cmF2ZXJzZShfYXBpT2JqOiBvYmplY3QpIHtcclxuICAgICAgICBmb3IgKGxldCBbX2ksIF9pdGVtXSBvZiBPYmplY3QuZW50cmllcyhfYXBpT2JqKSkge1xyXG4gICAgICAgICAgICAvL+WmguaenOWAvOaYr+aWueazleeahOivnVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIF9pdGVtID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIC8v6YeN5paw6LWL5YC85LiA5Liq57uR5a6a5LqG5Luj55CG5a+56LGh55qE5pa55rOVXHJcbiAgICAgICAgICAgICAgICBfYXBpT2JqW19pXSA9IChfaXRlbSBhcyBGdW5jdGlvbikuYmluZChnZXRQYXRoT2JqUHJveHkoX2FwaU9iaikpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfaXRlbSA9PSAnb2JqZWN0JyAmJiBfaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7niLblr7nosaFcclxuICAgICAgICAgICAgICAgIF9pdGVtW3BhcmVudE9iaktleU5hbWVdID0gX2FwaU9iajtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u6ZSu5ZCNXHJcbiAgICAgICAgICAgICAgICBfaXRlbVtrZXlLZXlOYW1lXSA9IF9pO1xyXG4gICAgICAgICAgICAgICAgLy/pgJLlvZJcclxuICAgICAgICAgICAgICAgIHRyYXZlcnNlKF9pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKiDojrflj5bkuIDkuKrot6/lvoTlr7nosaHku6PnkIYgKi9cclxuICAgIGZ1bmN0aW9uIGdldFBhdGhPYmpQcm94eShfYXBpT2JqOiBvYmplY3QpOiB7XHJcbiAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgfSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7XHJcbiAgICAgICAgICAgIHBhdGg6ICcnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBnZXQoXywgcDogc3RyaW5nIHwgc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXRoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ov5Tlm57kuIDkuKrmlbTnkIblpb3nmoTot6/lvoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yb290UGF0aC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIGJ5QXBpT2JqR2V0UGF0aChfYXBpT2JqLCBfb3AucGF0aE5vZGVLZXlOYW1lKS5yZXBsYWNlKC9eXFwvKy8sICcnKS5yZXBsYWNlKC9cXC8rL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICB0cmF2ZXJzZShfYXBpT2JqKTtcclxuICAgIC8vXHJcbiAgICByZXR1cm4gX2FwaU9iajtcclxufVxyXG5cclxuLyoqIOmAmui/h2FwaeWvueixoeiOt+WPlui3r+W+hCAqL1xyXG5mdW5jdGlvbiBieUFwaU9iakdldFBhdGgoX29iajogb2JqZWN0LCBfbm9kZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIV9vYmpbcGFyZW50T2JqS2V5TmFtZV0pIHsgcmV0dXJuICcnOyB9XHJcbiAgICBsZXQgX2xlZnQgPSBieUFwaU9iakdldFBhdGgoX29ialtwYXJlbnRPYmpLZXlOYW1lXSwgX25vZGVOYW1lKTtcclxuICAgIHJldHVybiAoX2xlZnQgPyBgJHtfbGVmdH0vYCA6ICcnKSArIChfb2JqW19ub2RlTmFtZV0gfHwgX29ialtrZXlLZXlOYW1lXSk7XHJcbn0iLCIvKiogXHJcbiAqIOWfuuexu+aVsOaNrlxyXG4gKiDpnIDopoHooqvmlbDmja7ku6PnkIblmajnrqHnkIbnmoTmlbDmja7lv4Xpobvph43ov5nph4znu6fmib9cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGF0YSB7IH1cclxuXHJcbi8vXHJcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCYXNlRGF0YS5wcm90b3R5cGUsIG51bGwpOyIsImltcG9ydCB7IEJhc2VEYXRhIH0gZnJvbSBcIi4vQmFzZURhdGFcIjtcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlRGF0YVByb3h5IH0gZnJvbSBcIi4vXy9Mb2NhbFN0b3JhZ2VEYXRhUHJveHlcIjtcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlXyB9IGZyb20gXCIuL18vTG9jYWxTdG9yYWdlX1wiO1xyXG5cclxuLyoqXHJcbiAqIOWfuuexu+aVsOaNruS7o+eQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEYXRhUHJveHk8RGF0YSBleHRlbmRzIEJhc2VEYXRhPiB7XHJcbiAgICAvKiog5L+d5a2Y5pe255qE5ZCN5a2X77yM57un5om/5Lul6KaG55uWICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGtleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB9XHJcbiAgICAvKiog5L+d5a2Y5pe255qE54mI5pys77yM57un5om/5Lul6KaG55uWICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHYoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJzEuMCc7XHJcbiAgICB9XHJcbiAgICAvKiog5L+d5a2Y5pe255So55qE57uE5ZCI5ZCN5a2XICovXHJcbiAgICBwcml2YXRlIGdldCBfa2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMua2V5fUAke3RoaXMudn1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDojrflj5bku6PnkIblmaggKi9cclxuICAgIHB1YmxpYyBnZXQgcHJveHkoKTogTG9jYWxTdG9yYWdlRGF0YVByb3h5IHtcclxuICAgICAgICByZXR1cm4gTG9jYWxTdG9yYWdlXy5nZXRJdGVtUHJveHkodGhpcy5fa2V5KTtcclxuICAgIH1cclxuICAgIC8qKiDojrflj5bmlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBEYXRhIHtcclxuICAgICAgICByZXR1cm4gTG9jYWxTdG9yYWdlXy5nZXRJdGVtKHRoaXMuX2tleSwgdGhpcy5nZXREZWZhdWx0RGF0YSgpKTtcclxuICAgIH1cclxuICAgIC8qKiDorr7nva7mlbDmja4gKi9cclxuICAgIHB1YmxpYyBzZXQgZGF0YShfZGF0YTogRGF0YSkge1xyXG4gICAgICAgIExvY2FsU3RvcmFnZV8uc2V0SXRlbSh0aGlzLl9rZXksIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W6buY6K6k5pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0RGVmYXVsdERhdGEoKTogRGF0YTtcclxufSIsImltcG9ydCB7IGNyZWF0ZU1pY3JvVGFza3MgfSBmcm9tIFwiLi4vLi4vY3JlYXRlTWljcm9UYXNrc1wiO1xyXG5pbXBvcnQgeyBjbGVhblByb3h5T2JqRnVuLCBjcmVhdGVQcm94eU9iaiwgZ2V0UHJveHlPYmpLZXkgfSBmcm9tIFwiLi9jcmVhdGVQcm94eU9ialwiO1xyXG5cclxuLyoqXHJcbiAqIOacrOWcsOaVsOaNruS7o+eQhlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZURhdGFQcm94eSB7XHJcbiAgLyoqIOmUruWQjSAqL1xyXG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XHJcbiAgLyoqIHJvb3TmlbDmja4gKi9cclxuICBwcml2YXRlIHJvb3REYXRhOiBhbnk7XHJcbiAgLyoqIOeKtuaAgeeggSAqL1xyXG4gIHByaXZhdGUgc3RhdGVDb2RlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKiog6K6w5b2V5piv5ZCm57yW6L6RICovXHJcbiAgcHJpdmF0ZSBpZkVkaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqIOebkeWQrOWZqOWIl+ihqCAqL1xyXG4gIHByaXZhdGUgd2F0Y2hzOiB7XHJcbiAgICB0aGlzOiBhbnksXHJcbiAgICBmdW46IEZ1bmN0aW9uLFxyXG4gICAgb2JqS2V5OiBzeW1ib2wsXHJcbiAgICBrZXk6IHN0cmluZyB8IHN5bWJvbCxcclxuICB9W10gPSBbXTtcclxuXHJcbiAgLyoqIOiOt+WPluaVsOaNriAqL1xyXG4gIGdldCBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdERhdGE7XHJcbiAgfVxyXG4gIC8qKiDorr7nva7mlbDmja4gKi9cclxuICBzZXQgZGF0YShfZGF0YTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5yb290RGF0YSA9PSBfZGF0YSkgeyByZXR1cm47IH1cclxuICAgIC8vIOa4heeQhuaOieS4iuS4gOS4quWvueixoeS4iue7keWumueahOWbnuiwg1xyXG4gICAgY2xlYW5Qcm94eU9iakZ1bih0aGlzLnJvb3REYXRhKTtcclxuICAgIC8vXHJcbiAgICB0aGlzLl9zYXZlKF9kYXRhKTtcclxuICAgIC8v6YeN5paw6I635Y+W5pWw5o2uXHJcbiAgICB0aGlzLmdldERhdGEoKTtcclxuICAgIC8v5L+u5pS557yW6L6R54q25oCBXHJcbiAgICB0aGlzLmlmRWRpdCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWIneWni+WMliAqL1xyXG4gIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIHRoaXMuZ2V0RGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOiOt+WPluaVsOaNriAqL1xyXG4gIHB1YmxpYyBnZXREYXRhKCkge1xyXG4gICAgbGV0IF9kYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy/lj43luo/liJfljJbmlbDmja7vvIzlpoLmnpzmiqXplJnliJnor7TmmI7mmK/nuq/lrZfnrKbkuLLvvIzlsLHkuI3nlKjnrqHlroPkuoZcclxuICAgICAgX2RhdGEgPSBKU09OLnBhcnNlKF9kYXRhKTtcclxuICAgIH1cclxuICAgIGNhdGNoIHsgfVxyXG4gICAgLy/ojrflj5bkuIDkuKrku6PnkIbmlbDmja7vvIzlubbmt7vliqDnm5HlkKxcclxuICAgIHRoaXMucm9vdERhdGEgPSBjcmVhdGVQcm94eU9iaihfZGF0YSwge1xyXG4gICAgICBzZXQ6ICguLi5hcmcpID0+IHtcclxuICAgICAgICB0aGlzLnNldEJhY2soLi4uYXJnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgLy/pgJLlop7nirbmgIHnoIFcclxuICAgIHRoaXMuc3RhdGVDb2RlKys7XHJcbiAgfVxyXG5cclxuICAvKiog5pWw5o2u5L+u5pS55Zue6LCDICovXHJcbiAgcHJpdmF0ZSBzZXRCYWNrKHRhcmdldDogYW55LCBwOiBzdHJpbmcgfCBzeW1ib2wsIG5ld1ZhbHVlOiBhbnksIHZhbHVlOiBhbnkpIHtcclxuICAgIGxldCBfb2JqS2V5OiBzeW1ib2wgPSBnZXRQcm94eU9iaktleSh0YXJnZXQpO1xyXG4gICAgLy/op6blj5Hnm5HlkKxcclxuICAgIHRoaXMud2F0Y2hzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKF9vYmpLZXkgPT0gaXRlbS5vYmpLZXkgJiYgaXRlbS5rZXkgPT0gcCkge1xyXG4gICAgICAgIGl0ZW0uZnVuLmNhbGwoaXRlbS50aGlzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5pZkVkaXQpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLmlmRWRpdCA9IHRydWU7XHJcbiAgICBsZXQgX3N0YXRlQ29kZTogbnVtYmVyID0gdGhpcy5zdGF0ZUNvZGU7XHJcbiAgICAvL+eUqOW+ruS7u+WKoeadpeaJp+ihjOS/neWtmOaWueazlVxyXG4gICAgY3JlYXRlTWljcm9UYXNrcygoKSA9PiB7XHJcbiAgICAgIC8qKiDnirbmgIHnoIHkuI3kuIDmoLfkuobnmoTor53or7TmmI7moLnmlbDmja7lj5HpgIHnmoTlj5jljJbvvIzmraTml7blsLHkuI3nlKjlnKjkv53lrZjkuYvliY3nmoTmoLnmlbDmja7kuoYgKi9cclxuICAgICAgaWYgKF9zdGF0ZUNvZGUgIT0gdGhpcy5zdGF0ZUNvZGUpIHsgcmV0dXJuOyB9XHJcbiAgICAgIC8vXHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnm5HlkKzmlbDmja5cclxuICAgKiBAcGFyYW0gX3RoaXMg5omn6KGM5Z+fXHJcbiAgICogQHBhcmFtIF9mdW4g5omn6KGM5pa55rOVXHJcbiAgICogQHBhcmFtIF9vYmog55uR5ZCs5a+56LGhXHJcbiAgICogQHBhcmFtIF9rZXkg55uR5ZCs6ZSuXHJcbiAgICovXHJcbiAgcHVibGljIG9uKF90aGlzOiBhbnksIF9mdW46IEZ1bmN0aW9uLCBfb2JqOiBhbnksIF9rZXk6IHN0cmluZyB8IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgX29iaktleTogc3ltYm9sID0gZ2V0UHJveHlPYmpLZXkoX29iaik7XHJcbiAgICBpZiAoIV9vYmpLZXkpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoX2tleSkpIHsgX2tleSA9IFtfa2V5XTsgfVxyXG4gICAgX2tleS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgdGhpcy53YXRjaHMucHVzaCh7XHJcbiAgICAgICAgdGhpczogX3RoaXMsXHJcbiAgICAgICAgZnVuOiBfZnVuLFxyXG4gICAgICAgIG9iaktleTogX29iaktleSxcclxuICAgICAgICBrZXk6IGtleSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5LiA5qyh5pWw5o2uXHJcbiAgICogQHBhcmFtIF90aGlzIOaJp+ihjOWfn1xyXG4gICAqIEBwYXJhbSBfZnVuIOaJp+ihjOaWueazlVxyXG4gICAqIEBwYXJhbSBfb2JqIOebkeWQrOWvueixoVxyXG4gICAqIEBwYXJhbSBfa2V5IOebkeWQrOmUrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbmNlKF90aGlzOiBhbnksIF9mdW46IEZ1bmN0aW9uLCBfb2JqOiBhbnksIF9rZXk6IHN0cmluZyB8IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgX29iaktleTogc3ltYm9sID0gZ2V0UHJveHlPYmpLZXkoX29iaik7XHJcbiAgICBpZiAoIV9vYmpLZXkpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoX2tleSkpIHsgX2tleSA9IFtfa2V5XTsgfVxyXG4gICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcbiAgICBfa2V5LmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAvL+aKil9mdW7ljIXoo4XmiJDkuIDkuKrmiafooYzkuobkuIDmrKHlsLHliKDpmaTmjonoh6rouqvnmoTnm5HlkKzmlrnms5VcclxuICAgICAgbGV0IF9fZnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9mdW4uY2FsbChfdGhpcyk7XHJcbiAgICAgICAgX190aGlzLm9mZihfdGhpcywgX19mdW4pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub24oX3RoaXMsIF9fZnVuLCBfb2JqLCBrZXkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWPlua2iOebkeWQrOaVsOaNrlxyXG4gICAqIEBwYXJhbSBfdGhpcyDmiafooYzln59cclxuICAgKiBAcGFyYW0gX2Z1biDmiafooYzmlrnms5VcclxuICAgKi9cclxuICBwdWJsaWMgb2ZmKF90aGlzOiBhbnksIF9mdW46IEZ1bmN0aW9uID0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLndhdGNocyA9IHRoaXMud2F0Y2hzLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gIShpdGVtLnRoaXMgPT0gX3RoaXMgJiYgKF9mdW4gPyBpdGVtLmZ1biA9PSBfZnVuIDogdHJ1ZSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogXHJcbiAgICog5by65Yi25L+d5a2Y5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGZvcmNlU2F2ZSgpIHtcclxuICAgIHRoaXMuX3NhdmUodGhpcy5yb290RGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKiog5L+d5a2Y5pWw5o2uICovXHJcbiAgcHJpdmF0ZSBzYXZlKCkge1xyXG4gICAgaWYgKCF0aGlzLmlmRWRpdCkgeyByZXR1cm47IH07XHJcbiAgICB0aGlzLmlmRWRpdCA9IGZhbHNlO1xyXG4gICAgLy9cclxuICAgIHRoaXMuX3NhdmUodGhpcy5yb290RGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKiog5L+d5a2Y5pWw5o2u5Yiw5pys5ZywICovXHJcbiAgcHJpdmF0ZSBfc2F2ZShfZGF0YTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIF9kYXRhID09ICdvYmplY3QnKSB7XHJcbiAgICAgIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgX2RhdGEgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBfZGF0YSA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy9cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBfZGF0YSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTG9jYWxTdG9yYWdlRGF0YVByb3h5IH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlRGF0YVByb3h5XCI7XHJcblxyXG4vKipcclxuICog5pys5Zyw5pWw5o2u57G7XHJcbiAqICog5LiA5LiqbG9jYWxTdG9yYWdl55qE6ZWc5YOP57G777yM5pyJ552A5beu5LiN5aSa55qE5pa55rOV77yM5L2G5piv5LuO6L+Z6YeM6I635Y+W55qE5pWw5o2u5piv5bim5pyJ6Ieq5Yqo5L+d5a2Y55qE5Yqf6IO955qE44CCXHJcbiAqIOe8k+WtmOeUqOWIsOeahOaVsOaNru+8jOS4jeeUqOavj+asoeiOt+WPluaXtuWwseWOu+ivu+WPllxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZV8ge1xyXG4gIC8qKiDnvJPlrZjmlbDmja7ku6PnkIbliJfooaggKi9cclxuICBwcml2YXRlIHN0YXRpYyBjYXRjaERhdGFQcm94eXM6IHtcclxuICAgIFtpbmRleDogc3RyaW5nXTogTG9jYWxTdG9yYWdlRGF0YVByb3h5O1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgLyoqIOiOt+WPluacrOWcsOeahOWFqOmDqOaVsOaNru+8jOebtOaOpeeUqOWxnuaAp+iuv+mXriAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGRhdGFzKCk6IHtcclxuICAgIFtpbmRleDogc3RyaW5nXTogYW55XHJcbiAgfSB7XHJcbiAgICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgIC8qKiBpbuaTjeS9nOespiDliKTmlq3mnInmsqHmnIkgKi9cclxuICAgICAgaGFzKHRhcmdldDogYW55LCBwOiBzdHJpbmcgfCBzeW1ib2wpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKHAgYXMgc3RyaW5nKSAhPSBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICAvKiog6I635Y+WICovXHJcbiAgICAgIGdldCh0YXJnZXQ6IGFueSwgcDogc3RyaW5nIHwgc3ltYm9sLCByZWNlaXZlcjogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKHAgYXMgc3RyaW5nKTtcclxuICAgICAgfSxcclxuICAgICAgLyoqIOiuvue9riAqL1xyXG4gICAgICBzZXQodGFyZ2V0OiBhbnksIHA6IHN0cmluZyB8IHN5bWJvbCwgdmFsdWU6IGFueSwgcmVjZWl2ZXI6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbShwIGFzIHN0cmluZywgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmlbDmja7ku6PnkIZcclxuICAgKiDov5nkuKrlr7nosaHmmK/lj6/og73kvJrliqjmgIHmm7TmlLnnmoTvvIzmiYDku6XopoHnlKjnmoTml7blgJnnm7TmjqXku47ov5nph4zojrflj5blsLHooYzkuI3opoHlj6blrZjkuIDku71cclxuICAgKiDmlbDmja7ku6PnkIblj6/ku6Xnm5HlkKzmlbDmja7nmoTmm7TmlLnvvIzku47ogIzlgZrlh7rlhbbku5bmk43kvZxcclxuICAgKiDkuZ/lj6/ku6Xnm7TmjqXmm7TmlLlkYXRhXHJcbiAgICogQHBhcmFtIF9pbmRleCDmlbDmja7plK7lkI1cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEl0ZW1Qcm94eShfaW5kZXg6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuY2F0Y2hEYXRhUHJveHlzW19pbmRleF0gfHwgKHRoaXMuY2F0Y2hEYXRhUHJveHlzW19pbmRleF0gPSBuZXcgTG9jYWxTdG9yYWdlRGF0YVByb3h5KF9pbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5pWw5o2u5a+56LGhXHJcbiAgICog6L+Z5Liq5a+56LGh5piv5Y+v6IO95Lya5Yqo5oCB5pu05pS555qE77yM5omA5Lul6KaB55So55qE5pe25YCZ55u05o6l5LuO6L+Z6YeM6I635Y+W5bCx6KGM5LiN6KaB5Y+m5a2Y5LiA5Lu9XHJcbiAgICogQHBhcmFtIF9pbmRleCDmlbDmja7plK7lkI1cclxuICAgKiBAcGFyYW0gX2RlZmF1bHQg6buY6K6k5YC877yM5aaC5p6c5rKh5pyJ55qE6K+d5bCx5Lul6buY6K6k5YC85aGr5YWFXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJdGVtKF9pbmRleDogc3RyaW5nLCBfZGVmYXVsdDogb2JqZWN0IHwgc3RyaW5nID0gbnVsbCkge1xyXG4gICAgbGV0IF9kYXRhUHJveHkgPSB0aGlzLmdldEl0ZW1Qcm94eShfaW5kZXgpO1xyXG4gICAgaWYgKF9kYXRhUHJveHkuZGF0YSA9PT0gbnVsbCAmJiBfZGVmYXVsdCkge1xyXG4gICAgICB0aGlzLnNldEl0ZW0oX2luZGV4LCBfZGVmYXVsdCk7XHJcbiAgICB9XHJcbiAgICAvL+i/lOWbnuWFtuS4reeahOaVsOaNrlxyXG4gICAgcmV0dXJuIF9kYXRhUHJveHkuZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiuvue9ruaVsOaNrlxyXG4gICAqIEBwYXJhbSBfaW5kZXgg5pWw5o2u6ZSu5ZCNXHJcbiAgICogQHBhcmFtIF9kYXRhIOaVsOaNrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc2V0SXRlbShfaW5kZXg6IHN0cmluZywgX2RhdGE6IG9iamVjdCB8IHN0cmluZykge1xyXG4gICAgLy/lhYjojrflj5blroPnmoTku6PnkIblmahcclxuICAgIHRoaXMuZ2V0SXRlbVByb3h5KF9pbmRleCkuZGF0YSA9IF9kYXRhO1xyXG4gIH1cclxufSIsIi8qKiDku6PnkIblr7nosaHllK/kuIBrZXnmoIfor4YgKi9cclxuY29uc3QgX3Byb3h5S2V5ID0gU3ltYm9sKCdfcHJveHlLZXknKTtcclxuLyoqIOS7o+eQhuWvueixoeWbnuiwg+aJp+ihjOaWueazleagh+ivhiAqL1xyXG5jb25zdCBfcHJveHlGdW5LZXkgPSBTeW1ib2woJ19wcm94eUZ1bktleScpO1xyXG4vKiog5Luj55CG5a+56LGh5L+d55WZa2V55qCH6K+GICovXHJcbmNvbnN0IF9wcm94eUtlZXBLZXlzOiBzeW1ib2xbXSA9IFtfcHJveHlLZXksIF9wcm94eUZ1bktleV07XHJcblxyXG4vKiog5YWz6Zet5Luj55CG6Zif5YiX77yM5q2k5YC85Y+q6IO95Zyoc2VjdXJpdHlFeGVGdW7mlrnms5XkuK3ooqvorr7nva7vvIzov5nmoLfmiY3og73kv53or4HlroPmsLjov5zkuI3kvJrlsI/kuo4wICovXHJcbmxldCBfb2ZmUHJveHlRdWV1ZTogbnVtYmVyID0gMDtcclxuLyoqXHJcbiAqIOS7peWuieWFqOeahOaWueW8j+aJp+ihjOafkOS4quaWueazlVxyXG4gKiDlsLHmmK/or7TmiafooYzov5nkuKrmlrnms5XnmoTmnJ/pl7Top6blj5HnmoTku6PnkIbmk43kvZzpg73kuI3kvJrkuqfnlJ/lia/kvZznlKhcclxuICogQHBhcmFtIF9mIOebruagh+aWueazlVxyXG4gKi9cclxuZnVuY3Rpb24gc2VjdXJpdHlFeGVGdW4oX2Y6IEZ1bmN0aW9uKSB7XHJcbiAgICBfb2ZmUHJveHlRdWV1ZSsrO1xyXG4gICAgX2YoKTsvL+aJp+ihjOebruagh+aWueazlVxyXG4gICAgX29mZlByb3h5UXVldWUtLTtcclxufVxyXG5cclxuLyoqIOaYr+WQpuiDveaJp+ihjOS7o+eQhuWJr+S9nOeUqOaTjeS9nCAqL1xyXG5sZXQgX2lzUHJveHk6ICgpID0+IGJvb2xlYW4gPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gX29mZlByb3h5UXVldWUgPT09IDA7XHJcbn1cclxuXHJcbi8qKiDku6PnkIblr7nosaHnmoTlm57osIPmiafooYzmlrnms5XnsbvlnosgKi9cclxudHlwZSBwcm94eUZ1blR5cGUgPSB7XHJcbiAgICAvKiog5pWw5o2u6KKr6K6+572u55qE5Zue6LCDICovXHJcbiAgICBzZXQ/OiAodGFyZ2V0LCBwOiBzdHJpbmcgfCBzeW1ib2wsIG5ld1ZhbHVlLCB2YWx1ZSkgPT4gdm9pZDtcclxuICAgIC8qKiDmlbDmja7ooqvojrflj5bml7bnmoTlm57osIMgKi9cclxuICAgIGdldD86ICh0YXJnZXQsIHA6IHN0cmluZyB8IHN5bWJvbCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8qKiDojrflj5bku6PnkIblr7nosaHllK/kuIBrZXkgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3h5T2JqS2V5KG9iaik6IHN5bWJvbCB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXQob2JqLCBfcHJveHlLZXkpO1xyXG59XHJcbi8qKiDojrflj5bku6PnkIblr7nosaHlm57osIPlh73mlbAgKi9cclxuZnVuY3Rpb24gZ2V0UHJveHlPYmpCYWNrRihvYmopOiBwcm94eUZ1blR5cGUge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KG9iaiwgX3Byb3h5RnVuS2V5KTtcclxufVxyXG4vKiog6K6+572u5Luj55CG5a+56LGh5Zue6LCD5Ye95pWwICovXHJcbmZ1bmN0aW9uIHNldFByb3h5T2JqQmFja0Yob2JqLCBfZnVuOiBwcm94eUZ1blR5cGUpIHtcclxuICAgIFJlZmxlY3Quc2V0KG9iaiwgX3Byb3h5RnVuS2V5LCBfZnVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuS4gOS4quS7o+eQhuWvueixoVxyXG4gKiDkvJrmiorlr7nov5nkuKrlr7nosaHnmoTlkITnp43mk43kvZzlm57osIPlh7rljrtcclxuICogQHBhcmFtIG9iaiDljp/lp4vlr7nosaFcclxuICogQHBhcmFtIF9mdW4g5pWw5o2u6KKr6K6+572u5pe255qE5Zue6LCDXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHlPYmoob2JqOiBhbnksIF9mdW46IHByb3h5RnVuVHlwZSA9IG51bGwpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT0gJ29iamVjdCcpIHsgcmV0dXJuIG9iajsgfVxyXG5cclxuICAgIC8v6YCS5b2S5re75Yqg5Luj55CGXHJcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xyXG4gICAgICAgIC8v5Lul5a6J5YWo55qE5pa55byP5omn6KGMXHJcbiAgICAgICAgc2VjdXJpdHlFeGVGdW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaV0gPSBjcmVhdGVQcm94eU9iaihvYmpbaV0sIF9mdW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5piv5ZCm5bey57uP6K6+572u5LqG5Luj55CG5LqG77yM5rKh5pyJ6K6+572u55qE6K+d5bCx6K6+572uXHJcbiAgICBpZiAoIWdldFByb3h5T2JqS2V5KG9iaikpIHtcclxuICAgICAgICAvL+WumuS5ieS7o+eQhuWvueixoeW/heWkh+eahOS4jeWPr+mFjee9ruS4jeWPr+aemuS4vuWxnuaAp1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwge1xyXG4gICAgICAgICAgICAvL+WUr+S4gOagh+ivhu+8jOS4jeWPr+WGmVxyXG4gICAgICAgICAgICBbX3Byb3h5S2V5XToge1xyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFN5bWJvbCgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aJp+ihjOWbnuiwg++8jOWPr+WGmVxyXG4gICAgICAgICAgICBbX3Byb3h5RnVuS2V5XToge1xyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICBvYmogPSBuZXcgUHJveHkob2JqLCB7XHJcbiAgICAgICAgICAgIC8qKiDmlbDmja7ooqvorr7nva4gKi9cclxuICAgICAgICAgICAgc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pc1Byb3h5KCkgJiYgIV9wcm94eUtlZXBLZXlzLmluY2x1ZGVzKHAgYXMgYW55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfdmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Li65paw5YC85re75Yqg55uR5ZCsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjcmVhdGVQcm94eU9iaih2YWx1ZSwgZ2V0UHJveHlPYmpCYWNrRih0YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aWsOaXp+WAvOS4jeS4gOagt+aXtuinpuWPkeWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YWI5Li65pen5YC85riF55CG5Luj55CG5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuUHJveHlPYmpGdW4oX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osINcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UHJveHlPYmpCYWNrRih0YXJnZXQpPy5zZXQ/Lih0YXJnZXQsIHAgYXMgYW55LCB2YWx1ZSwgX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqIOaVsOaNruiiq+iOt+WPliAqL1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwLCByZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IF92YWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpO1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlmIChfaXNQcm94eSgpICYmICFfcHJveHlLZWVwS2V5cy5pbmNsdWRlcyhwIGFzIGFueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFByb3h5T2JqQmFja0YodGFyZ2V0KT8uZ2V0Py4odGFyZ2V0LCBwIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/moLnmja7lvZPliY3lr7nosaHnmoTlm57osIPlh73mlbDliqjmgIHorr7nva7kuIDkuIvlrZDlr7nosaHnmoTlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3ZhbHVlICYmIHR5cGVvZiBfdmFsdWUgPT0gJ29iamVjdCcgJiYgZ2V0UHJveHlPYmpCYWNrRihfdmFsdWUpICE9IGdldFByb3h5T2JqQmFja0YodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WumuS5ieaJp+ihjOebkeWQrOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQcm94eU9iakJhY2tGKF92YWx1ZSwgZ2V0UHJveHlPYmpCYWNrRih0YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKiog5pWw5o2u6KKr5Yig6ZmkICovXHJcbiAgICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlmIChfaXNQcm94eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF92YWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muIXnkIbku6PnkIblm57osINcclxuICAgICAgICAgICAgICAgICAgICBjbGVhblByb3h5T2JqRnVuKF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osINcclxuICAgICAgICAgICAgICAgICAgICBnZXRQcm94eU9iakJhY2tGKHRhcmdldCk/LnNldD8uKHRhcmdldCwgcCBhcyBhbnksIHVuZGVmaW5lZCwgX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy/lrprkuYnmiafooYznm5HlkKzlm57osINcclxuICAgIHNldFByb3h5T2JqQmFja0Yob2JqLCBfZnVuKTtcclxuICAgIC8vXHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICog5riF55CG5Luj55CG5a+56LGh5Zue6LCD5Ye95pWwXHJcbiAqIEBwYXJhbSBvYmog55uu5qCH5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5Qcm94eU9iakZ1bihvYmo6IGFueSkge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPSAnb2JqZWN0JykgeyByZXR1cm47IH1cclxuICAgIGlmICghZ2V0UHJveHlPYmpCYWNrRihvYmopKSB7IHJldHVybjsgfVxyXG4gICAgLy/pgJLlvZLmuIXnkIZcclxuICAgIGZvciAobGV0IGkgaW4gb2JqKSB7XHJcbiAgICAgICAgLy/ku6XlronlhajnmoTmlrnlvI/miafooYxcclxuICAgICAgICBzZWN1cml0eUV4ZUZ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFuUHJveHlPYmpGdW4ob2JqW2ldKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBzZXRQcm94eU9iakJhY2tGKG9iaiwgbnVsbCk7XHJcbn0iLCJpbXBvcnQgeyBCYXNlRGF0YSB9IGZyb20gXCIuLi8uLi9zcmMvbG9jYWxEYXRhL0Jhc2VEYXRhXCI7XHJcbmltcG9ydCB7IEJhc2VEYXRhUHJveHkgfSBmcm9tIFwiLi4vLi4vc3JjL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5XCI7XHJcblxyXG5jbGFzcyBEYXRhIGV4dGVuZHMgQmFzZURhdGEge1xyXG4gICAgYTogbnVtYmVyID0gMTtcclxuICAgIGI6IHN0cmluZyA9ICdiJztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlc3REYXRhUHJveHkgZXh0ZW5kcyBCYXNlRGF0YVByb3h5PERhdGE+IHtcclxuICAgIC8qKiDojrflj5bmlrDmlbDmja4gKi9cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RGF0YSgpOiBEYXRhIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGEoKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQXBpQ29uIH0gZnJvbSBcInNyYy9odHRwL2NyZWF0ZUFwaUNvblwiO1xyXG5pbXBvcnQgeyBUZXN0RGF0YVByb3h5IH0gZnJvbSBcIi4vbG9jYWxEYXRhL3Rlc3REYXRhUHJveHlcIjtcclxuXHJcbi8qKiDmtYvor5XohJrmnKwgKi9cclxuY29uc29sZS5sb2coJ+WTiOWTiDInKTtcclxuXHJcbmxldCB0ZXN0RGF0YSA9IG5ldyBUZXN0RGF0YVByb3h5KCk7XHJcbi8v5rOo5YWl5Yiw5YWo5bGA5pa55L6/6K6+572uXHJcbndpbmRvd1sndGVzdERhdGEnXSA9IHRlc3REYXRhO1xyXG5cclxuY29uc29sZS5sb2codGVzdERhdGEuZGF0YS5hKTtcclxuXHJcbmxldCBhcGlDb24gPSBjcmVhdGVBcGlDb24oJ3d3dy5iYWlkdS5jb20nLCB7XHJcbiAgICBhOiB7XHJcbiAgICAgICAgZ2V0QSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGI6IHtcclxuICAgICAgICBnZXRCKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYzoge1xyXG4gICAgICAgICAgICBnZXRDKF9vcDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoICsgJy8nICsgX29wO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbndpbmRvd1snYXBpQ29uJ10gPSBhcGlDb247XHJcblxyXG5jb25zb2xlLmxvZyhhcGlDb24uYi5jLmdldEMoJ+iOt+WPlmPmjqXlj6PmlbDmja4nKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9