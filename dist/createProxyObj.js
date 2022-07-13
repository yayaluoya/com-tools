"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanProxyObjFun = exports.createProxyObj = exports.getProxyObjKey = void 0;
/** 代理对象唯一key标识 */
var _proxyKey = Symbol('_proxyKey');
/** 代理对象回调执行方法标识 */
var _proxyFunKey = Symbol('_proxyFunKey');
/** 代理对象保留key标识 */
var _proxyKeepKeys = [_proxyKey, _proxyFunKey];
/** 关闭代理队列，此值只能在securityExeFun方法中被设置，这样才能保证它永远不会小于0 */
var _offProxyQueue = 0;
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
var _isProxy = function () {
    return _offProxyQueue === 0;
};
/** 获取代理对象唯一key */
function getProxyObjKey(obj) {
    return Reflect.get(obj, _proxyKey);
}
exports.getProxyObjKey = getProxyObjKey;
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
function createProxyObj(obj, _fun) {
    var _a;
    if (_fun === void 0) { _fun = null; }
    if (!obj || typeof obj != 'object') {
        return obj;
    }
    var _loop_1 = function (i) {
        //以安全的方式执行
        securityExeFun(function () {
            obj[i] = createProxyObj(obj[i], _fun);
        });
    };
    //递归添加代理
    for (var i in obj) {
        _loop_1(i);
    }
    //判断是否已经设置了代理了，没有设置的话就设置
    if (!getProxyObjKey(obj)) {
        //定义代理对象必备的不可配置不可枚举属性
        Object.defineProperties(obj, (_a = {},
            //唯一标识，不可写
            _a[_proxyKey] = {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Symbol(),
            },
            //执行回调，可写
            _a[_proxyFunKey] = {
                configurable: false,
                enumerable: false,
                writable: true,
            },
            _a));
        //
        obj = new Proxy(obj, {
            /** 数据被设置 */
            set: function (target, p, value, receiver) {
                var _a, _b;
                //
                if (_isProxy() && !_proxyKeepKeys.includes(p)) {
                    var _value = Reflect.get(target, p);
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
            get: function (target, p, receiver) {
                var _a, _b;
                var _value = Reflect.get(target, p, receiver);
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
            deleteProperty: function (target, p) {
                var _a, _b;
                //
                if (_isProxy()) {
                    var _value = Reflect.get(target, p);
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
exports.createProxyObj = createProxyObj;
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
    var _loop_2 = function (i) {
        //以安全的方式执行
        securityExeFun(function () {
            cleanProxyObjFun(obj[i]);
        });
    };
    //递归清理
    for (var i in obj) {
        _loop_2(i);
    }
    //
    setProxyObjBackF(obj, null);
}
exports.cleanProxyObjFun = cleanProxyObjFun;
