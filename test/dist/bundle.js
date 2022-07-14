/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/ArrayUtils.js":
/*!*****************************!*\
  !*** ../dist/ArrayUtils.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayUtils = void 0;
/**
 * 数组工具
 */
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    /**
     * 获取数组的某个元素
     * @param array
     * @param _n 索引，可以是负数
     */
    ArrayUtils.at = function (array, _n) {
        if (array.at) {
            return array.at(_n);
        }
        // console.log(_n);
        if (_n >= 0) {
            return array[_n];
        }
        else {
            return array[array.length + _n];
        }
    };
    /**
     * 判断两个数组内容是否相同
     * @param x x数组
     * @param y y数组
     */
    ArrayUtils.same = function (x, y) {
        var e_1, _a;
        if (!(x) || !(y))
            return false;
        if (x.length != y.length)
            return false;
        //方法： 用一个mop来统计x数组各个元素出现的次数，再用y数组来递减各元素出现的次数，如果最终结果为0则两个数组相同
        var m = new Map();
        x.forEach(function (item) {
            m.set(item, (m.has(item) ? m.get(item) : 0) + 1);
        });
        y.forEach(function (item) {
            m.set(item, (m.has(item) ? m.get(item) : 0) - 1);
        });
        //只要其中一元素的统计不为0就返回false
        var b = true;
        try {
            for (var m_1 = __values(m), m_1_1 = m_1.next(); !m_1_1.done; m_1_1 = m_1.next()) {
                var _b = __read(m_1_1.value, 2), _ = _b[0], _number = _b[1];
                if (_number != 0) {
                    b = false;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (m_1_1 && !m_1_1.done && (_a = m_1.return)) _a.call(m_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return b;
    };
    /**
     * 数组是否包含某个数据
     * @param arr
     * @param op
     */
    ArrayUtils.has = function (arr, op) {
        var index = -1;
        if (typeof op == 'function') {
            index = arr.findIndex(function (_) { return op(_); });
        }
        else {
            index = arr.indexOf(op);
        }
        return index >= 0;
    };
    /**
     * 随机打乱数组
     * @param _array 目标数组
     */
    ArrayUtils.upset = function (_array) {
        //乱序
        return _array.sort(function () {
            return Math.random() - 0.5;
        });
    };
    /**
     * 随机获取数组中的随机值，可指定长度
     * @param _array 原数组
     * @param _n 随机个数
     * @param _weight 权重列表
     */
    ArrayUtils.random = function (_array, _n, _weight) {
        if (_n === void 0) { _n = 1; }
        if (_weight === void 0) { _weight = _array.map(function (item) { return 1; }); }
        if (_array.length <= 0) {
            return;
        }
        var _rootArray = [];
        var _newArray = [];
        //权重索引列表
        var _indexArray = [];
        //找到最小的权重
        var _minWeight = _weight[0];
        _weight.forEach(function (item) {
            _minWeight = Math.min(_minWeight, item);
        });
        _weight = _weight.map(function (item) {
            return Math.floor(item * (1 / _minWeight));
        });
        _array.forEach(function (item, index) {
            _rootArray.push(item);
            //
            for (var _i = 0; _i < _weight[index]; _i++) {
                _indexArray.push(index);
            }
        });
        var _index;
        for (var _i = 0; _i < _n; _i++) {
            if (_rootArray.length <= 0) {
                break;
            }
            _index = Math.floor(Math.random() * _indexArray.length);
            _indexArray = _indexArray.filter(function (item) {
                return item != _index;
            });
            _newArray.push(_rootArray.splice(_indexArray[_index], 1)[0]);
        }
        //
        return _newArray;
    };
    /**
     * 剔除掉数组指定内容
     * @param {*} array 原数组
     * @param {*} v 验证方式 可以是方法和正则，如果都不是的话采用==来验证，这些条件都可以是数组
     */
    ArrayUtils.eliminate = function (array, v) {
        if (!Array.isArray(v)) {
            v = [v];
        }
        v.forEach(function (v) {
            var _if = true;
            //循环删除查找到的满足条件的元素，直到找不到为止
            while (_if) {
                var index = void 0;
                switch (true) {
                    case typeof v == 'function':
                        index = array.findIndex(v);
                        break;
                    case v instanceof RegExp:
                        index = array.findIndex(function (_) { return v.test(_); });
                        break;
                    default:
                        index = array.findIndex(function (_) { return _ == v; });
                        break;
                }
                if (index == -1) {
                    _if = false;
                }
                else {
                    array.splice(index, 1);
                }
            }
        });
        return array;
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;


/***/ }),

/***/ "../dist/BaseEvent.js":
/*!****************************!*\
  !*** ../dist/BaseEvent.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEvent = void 0;
/**
 * 事件基类
 * 继承此类就可以成为事件调度者了
 */
var BaseEvent = /** @class */ (function () {
    function BaseEvent() {
        /** 事件执行列表 */
        this.eventList = [];
        /** 延迟触发事件列表 */
        this._eventList = [];
    }
    /**
     * 监听事件
     * @param key 唯一key
     */
    BaseEvent.prototype.on = function (key, _this, f) {
        if (!key) {
            return;
        }
        //
        this.eventList.push({
            key: key,
            _this: _this,
            f: f,
        });
    };
    /**
     * 监听一次事件
     * @param key 唯一key
     */
    BaseEvent.prototype.onOnce = function (key, _this, f) {
        if (!key) {
            return;
        }
        var _that = this;
        //重新包装下该函数
        var _f = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            //清理调该函数
            _that.off(key, _this, _f);
            //
            f.call.apply(f, __spreadArray([this], __read(arg), false));
        };
        //
        this.eventList.push({
            key: key,
            _this: _this,
            f: _f,
        });
    };
    /**
     * 取消监听
     * 这些参数可以不传，传了就表示要对该参数做判断
     * @param key
     * @param _this
     * @param f
     */
    BaseEvent.prototype.off = function (key, _this, f) {
        this.eventList = this.eventList.filter(function (item) {
            return !((key ? key == item.key : true) &&
                (_this ? _this == item._this : true) &&
                (f ? f == item.f : true));
        });
    };
    /**
     * 触发事件
     * @param key 唯一key
     * @param arg 需要传递的参数
     */
    BaseEvent.prototype.emit = function (key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        this.eventList.forEach(function (item) {
            var _a;
            if (item.key === key) {
                (_a = item.f).call.apply(_a, __spreadArray([item._this], __read(arg), false));
            }
        });
    };
    /** 延迟触发 */
    BaseEvent.prototype.deferEmit = function (key) {
        var _this_1 = this;
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        this._eventList.push(function () {
            _this_1.emit.apply(_this_1, __spreadArray([key], __read(arg), false));
        });
    };
    /** 执行延迟触发 */
    BaseEvent.prototype.exeDeferEmit = function () {
        this._eventList.forEach(function (f) {
            f();
        });
        //
        this.clearDeferEmit();
    };
    /** 清理延迟触发事件 */
    BaseEvent.prototype.clearDeferEmit = function () {
        this._eventList.length = 0;
    };
    return BaseEvent;
}());
exports.BaseEvent = BaseEvent;


/***/ }),

/***/ "../dist/is.js":
/*!*********************!*\
  !*** ../dist/is.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isUrl = exports.isClient = exports.isServer = exports.isMap = exports.isElement = exports.isWindow = exports.isArray = exports.isRegExp = exports.isBoolean = exports.isFunction = exports.isString = exports.isPromise = exports.isNumber = exports.isNullOrUnDef = exports.isNullAndUnDef = exports.isNull = exports.isDate = exports.isEmpty = exports.isObject = exports.isUnDef = exports.isDef = exports.is = void 0;
var toString = Object.prototype.toString;
function is(val, type) {
    return toString.call(val) === "[object ".concat(type, "]");
}
exports.is = is;
function isDef(val) {
    return typeof val !== 'undefined';
}
exports.isDef = isDef;
function isUnDef(val) {
    return !isDef(val);
}
exports.isUnDef = isUnDef;
function isObject(val) {
    return val !== null && is(val, 'Object');
}
exports.isObject = isObject;
function isEmpty(val) {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false;
}
exports.isEmpty = isEmpty;
function isDate(val) {
    return is(val, 'Date');
}
exports.isDate = isDate;
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
function isNullAndUnDef(val) {
    return isUnDef(val) && isNull(val);
}
exports.isNullAndUnDef = isNullAndUnDef;
function isNullOrUnDef(val) {
    return isUnDef(val) || isNull(val);
}
exports.isNullOrUnDef = isNullOrUnDef;
function isNumber(val) {
    return is(val, 'Number');
}
exports.isNumber = isNumber;
function isPromise(val) {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
exports.isPromise = isPromise;
function isString(val) {
    return is(val, 'String');
}
exports.isString = isString;
function isFunction(val) {
    return typeof val === 'function';
}
exports.isFunction = isFunction;
function isBoolean(val) {
    return is(val, 'Boolean');
}
exports.isBoolean = isBoolean;
function isRegExp(val) {
    return is(val, 'RegExp');
}
exports.isRegExp = isRegExp;
function isArray(val) {
    return val && Array.isArray(val);
}
exports.isArray = isArray;
function isWindow(val) {
    return typeof window !== 'undefined' && is(val, 'Window');
}
exports.isWindow = isWindow;
function isElement(val) {
    return isObject(val) && !!val.tagName;
}
exports.isElement = isElement;
function isMap(val) {
    return is(val, 'Map');
}
exports.isMap = isMap;
exports.isServer = typeof window === 'undefined';
exports.isClient = !exports.isServer;
function isUrl(path) {
    var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}
exports.isUrl = isUrl;


/***/ }),

/***/ "../dist/localData/BaseDataProxy.js":
/*!******************************************!*\
  !*** ../dist/localData/BaseDataProxy.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseDataProxy = void 0;
var BaseEvent_1 = __webpack_require__(/*! ../BaseEvent */ "../dist/BaseEvent.js");
var createProxyObj_1 = __webpack_require__(/*! ../obj/createProxyObj */ "../dist/obj/createProxyObj.js");
var ObjectUtils_1 = __webpack_require__(/*! ../obj/ObjectUtils */ "../dist/obj/ObjectUtils.js");
/**
 * 基类本地数据代理
 * 一个通用的版本，需要根据不同的应用场景封装
 */
var BaseDataProxy = /** @class */ (function (_super) {
    __extends(BaseDataProxy, _super);
    //
    function BaseDataProxy() {
        var _this = _super.call(this) || this;
        /** 是否编辑 */
        _this._ifEdit = false;
        /** 状态码 */
        _this.stateCode = 0;
        _this.getLocalData();
        return _this;
    }
    Object.defineProperty(BaseDataProxy.prototype, "name", {
        /** 保存的名字，默认是类名 */
        get: function () {
            return "".concat(this.constructor.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseDataProxy.prototype, "data", {
        /** 数据 */
        get: function () {
            return this._data;
        },
        /** 设置数据，要注意之前加的监听将会失去意义 */
        set: function (_d) {
            if (this._data !== _d) {
                this.getLocalData(_d);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseDataProxy.prototype, "cloneData", {
        /** 获取一份克隆数据 */
        get: function () {
            return ObjectUtils_1.ObjectUtils.clone_(this._data);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取本地数据
     * TODO 这里暴露给派生类是为了方便对该方法加以修饰，不要重写
     * @param _data 指定一个数据，如果不存在且本地没有数据的话则会调用获取数据的方法获取数据
     */
    BaseDataProxy.prototype.getLocalData = function (_data) {
        var _this = this;
        var data;
        if (_data) {
            (0, createProxyObj_1.cleanProxyObjCon)(this._data);
            this.LocalStorage_.setItem(this.name, _data, function (s) {
                return _this.dataHandle(s, 'set');
            });
            data = _data;
            this.update(true);
        }
        else {
            data = this.LocalStorage_.getItem(this.name, function (s) {
                return _this.dataHandle(s, 'get');
            });
            if (!data) {
                data = this.getNewData();
                this.update(true);
            }
        }
        //
        this._data = (0, createProxyObj_1.createProxyObj)(data, {
            set: function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                _this.setBack.apply(_this, __spreadArray([], __read(arg), false));
            },
        });
    };
    /** 数据修改回调 */
    BaseDataProxy.prototype.setBack = function (target, p, newValue, value, objKey) {
        if (target === void 0) { target = null; }
        if (p === void 0) { p = ''; }
        if (newValue === void 0) { newValue = null; }
        if (value === void 0) { value = null; }
        //触发事件
        this.emit('set', target, p, newValue, value, objKey);
        //
        this.update(false);
    };
    /** 更新 */
    BaseDataProxy.prototype.update = function (f) {
        var _this = this;
        if (f === void 0) { f = false; }
        if (f) {
            this.stateCode++;
            this._ifEdit = false;
        }
        if (this._ifEdit) {
            return;
        }
        this.emit('update');
        this._ifEdit = true;
        var _stateCode = this.stateCode;
        //用微任务来执行保存方法
        Promise.resolve().then(function () {
            /** 状态码不一样了的话说明根数据发生了变化，此时就不用在保存之前的数据了 */
            if (_stateCode != _this.stateCode) {
                return;
            }
            _this._ifEdit = false;
            //
            _this.save();
        });
    };
    /** 保存数据 */
    BaseDataProxy.prototype.save = function () {
        var _this = this;
        this.LocalStorage_.setItem(this.name, this.data, function (s) {
            return _this.dataHandle(s, 'set');
        });
        this.emit('save');
    };
    /** 数据处理，可以在数据被获取和设置前做加密解密操作 */
    BaseDataProxy.prototype.dataHandle = function (str, type) {
        return str;
    };
    return BaseDataProxy;
}(BaseEvent_1.BaseEvent));
exports.BaseDataProxy = BaseDataProxy;


/***/ }),

/***/ "../dist/obj/ObjectUtils.js":
/*!**********************************!*\
  !*** ../dist/obj/ObjectUtils.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectUtils = void 0;
var is_1 = __webpack_require__(/*! ../is */ "../dist/is.js");
/**
 * 对象工具类
 */
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    /**
     * 获取一个对象的属性
     * @param obj
     * @param key 目标属性，可以是方法，正则表达式，其它的采用==号匹配
     */
    ObjectUtils.getPro = function (obj, key) {
        if (typeof obj != 'object') {
            return;
        }
        var is;
        for (var i in obj) {
            is = false;
            switch (true) {
                case typeof key == 'function':
                    is = key(i);
                    break;
                case key instanceof RegExp:
                    is = key.test(i);
                    break;
                default:
                    is = i == key;
                    break;
            }
            //
            if (is) {
                return obj[i];
            }
        }
    };
    /**
     * 克隆一个对象
     * 采用序列化和反序列化的方式，function不会被克隆
     * @param _O 该对象
     */
    ObjectUtils.clone = function (_data) {
        return JSON.parse(JSON.stringify(_data));
    };
    /**
     * 克隆一个对象
     * 递归克隆
     */
    ObjectUtils.clone_ = function (data) {
        var _this = this;
        if (typeof data == 'object' && data) {
            if (Array.isArray(data)) {
                return data.reduce(function (a, b) {
                    a.push(_this.clone_(b));
                    return a;
                }, []);
            }
            var _data = {};
            for (var i in data) {
                _data[i] = this.clone_(data[i]);
            }
            return _data;
        }
        return data;
    };
    /**
     * 属性提取
     * @param {*} obj
     * @param {*} props
     */
    ObjectUtils.propGet = function (obj, props) {
        var e_1, _a;
        if (!Array.isArray(props)) {
            props = [props];
        }
        var o = {};
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var key = props_1_1.value;
                o[key] = obj[key];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return o;
    };
    /**
     * 在a对象上合并b对象的值
     * 类型以b对象上的为准
     * @param a
     * @param bs
     */
    ObjectUtils.merge = function (a) {
        var e_2, _a;
        var bs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bs[_i - 1] = arguments[_i];
        }
        try {
            for (var bs_1 = __values(bs), bs_1_1 = bs_1.next(); !bs_1_1.done; bs_1_1 = bs_1.next()) {
                var b = bs_1_1.value;
                for (var i in b) {
                    // 如果双方都是数组的话，直接合并
                    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
                        a[i] = __spreadArray(__spreadArray([], __read(a[i]), false), __read(b[i]), false);
                        continue;
                    }
                    // 如果双方都是对象的话则递归
                    if ((0, is_1.isObject)(a[i]) && (0, is_1.isObject)(b[i])) {
                        ObjectUtils.merge(a[i], b[i]);
                        continue;
                    }
                    //
                    a[i] = b[i];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (bs_1_1 && !bs_1_1.done && (_a = bs_1.return)) _a.call(bs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return a;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;


/***/ }),

/***/ "../dist/obj/createProxyObj.js":
/*!*************************************!*\
  !*** ../dist/obj/createProxyObj.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoOneROF = exports.autoROF = exports.RORemove = exports.ROCollect = exports.cleanProxyObjCon = exports.createProxyObj = exports.getobjProxyMap = void 0;
var ArrayUtils_1 = __webpack_require__(/*! ../ArrayUtils */ "../dist/ArrayUtils.js");
/** 对象->代理对象映射 */
var obj_proxy_Map = new WeakMap();
// const obj_proxy_Map = new Map<any, any>();
/**
 * 获取对象代理映射
 * @returns
 */
function getobjProxyMap() {
    return obj_proxy_Map;
}
exports.getobjProxyMap = getobjProxyMap;
/**
 * 代理对象的标识key，可以通过这个key获取和设置代理对象的标识对象
 * TODO 这个key也是判断代理对象的关键
 */
var proxySignKey = Symbol();
/**
 * 是否是一个对象
 * @param obj
 * @returns
 */
function isObject(obj) {
    return typeof obj == 'object' && obj;
}
/**
 * 创建一个代理对象
 * TODO 渐进式的，只有访问该对象的某个属性时才会对该属性添加深度代理
 * 会把对这个对象的get,set操作回调出去
 * 并且配合ProxyObjWatch收集相关依赖
 * @param obj 原始对象
 * @param con 对象被代理的操作
 * @param resSetD 重置禁用状态
 */
function createProxyObj(obj, con, resSetD) {
    if (resSetD === void 0) { resSetD = true; }
    if (!isObject(obj)) {
        return obj;
    }
    // 先在缓存中找
    var proxyObj;
    var sign;
    if (obj_proxy_Map.has(obj)) {
        proxyObj = obj_proxy_Map.get(obj);
        sign = proxyObj[proxySignKey];
        sign.con = con;
        if (resSetD) {
            sign.d = false;
        }
        return proxyObj;
    }
    // 新建一个sign
    sign = {
        key: Symbol(),
        con: con,
        d: false,
    };
    proxyObj = new Proxy(obj, {
        deleteProperty: function (target, p) {
            var _a, _b;
            var passValue = Reflect.get(target, p);
            cleanProxyObjCon(obj_proxy_Map.get(passValue));
            var setResult = Reflect.deleteProperty(target, p);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, undefined, passValue, sign.key));
            sign.d || ROSet({
                key: p,
                objKey: sign.key,
            });
            return setResult;
        },
        get: function (target, p, receiver) {
            var _a, _b;
            if (p == proxySignKey) {
                return sign;
            }
            var value = Reflect.get(target, p, receiver);
            value = createProxyObj(value, sign.con, false);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, sign.key));
            sign.d || ROGet({
                key: p,
                objKey: sign.key,
            });
            return value;
        },
        set: function (target, p, value, receiver) {
            var _a, _b;
            var passValue = Reflect.get(target, p, receiver);
            cleanProxyObjCon(obj_proxy_Map.get(passValue));
            var setResult = Reflect.set(target, p, value, receiver);
            sign.d || ((_b = (_a = sign.con) === null || _a === void 0 ? void 0 : _a.set) === null || _b === void 0 ? void 0 : _b.call(_a, target, p, value, passValue, sign.key));
            sign.d || ROSet({
                key: p,
                objKey: sign.key,
            });
            return setResult;
        },
    });
    // 设置到缓存中
    obj_proxy_Map.set(obj, proxyObj);
    return proxyObj;
}
exports.createProxyObj = createProxyObj;
/**
 * 清除对象的代理
 * @param obj
 * @returns
 */
function cleanProxyObjCon(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var sign = obj[proxySignKey];
    if (sign) {
        sign.d = true;
        sign.con = null;
    }
    for (var i in obj) {
        cleanProxyObjCon(obj[i]);
    }
    return obj;
}
exports.cleanProxyObjCon = cleanProxyObjCon;
/** 依赖列表 */
var relyOnList = [];
/** 监听依赖列表 */
var watchRNList = [];
/**
 * 触发依赖
 * TODO 由createProxyObj模块驱动
 * @param key
 */
function ROSet(key) {
    watchRNList.forEach(function (item) {
        if (ArrayUtils_1.ArrayUtils.has(item.keys, function (_) { return _.objKey == key.objKey && _.key == key.key; })) {
            //TODO 这里不直接执行，而是执行并重新收集依赖
            autoROF(item.f);
        }
    });
}
/**
 * 依赖收集
 * TODO 由createProxyObj模块驱动
 * @param key
 */
function ROGet(key) {
    //收集依赖
    if (relyOnList.length > 0) {
        ArrayUtils_1.ArrayUtils.at(relyOnList, -1).push(key);
    }
}
/**
 * 收集依赖
 * @param f
 */
function ROCollect(f) {
    var list = [];
    relyOnList.push(list);
    try {
        f();
    }
    catch (e) {
        console.error('获取依赖方法执行错误', e);
        list.length = 0;
    }
    if (list !== relyOnList.pop()) {
        console.error('收集到的依赖有偏差');
    }
    return list;
}
exports.ROCollect = ROCollect;
/**
 * 删除某个依赖方法
 * @param f
 */
function RORemove(f) {
    var length = watchRNList.length;
    ArrayUtils_1.ArrayUtils.eliminate(watchRNList, function (_) { return _.f === f; });
    return watchRNList.length != length;
}
exports.RORemove = RORemove;
/**
 * 自动执行某个带有依赖的方法
 * @param f
 * @param getROF
 */
function autoROF(f, getROF) {
    var _ROF = getROF || f;
    //先删除之前的依赖
    RORemove(f);
    var ROs = ROCollect(_ROF);
    watchRNList.push({
        keys: ROs,
        f: f,
    });
}
exports.autoROF = autoROF;
/**
 * 自动执行一次某个带有依赖的方法
 * @param f
 * @param getROF
 */
function autoOneROF(f, getROF) {
    autoROF(f, getROF);
    RORemove(f);
}
exports.autoOneROF = autoOneROF;


/***/ }),

/***/ "../dist/web/Clipboard.js":
/*!********************************!*\
  !*** ../dist/web/Clipboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Clipboard = void 0;
/**
 * 剪切板工具
 */
var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    /**
     * 设置一段字符串到剪切板
     * @param _str 需要复制的字符串
     */
    Clipboard.set = function (_str) {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(_str).then(function () {
                    r(true);
                }).then(function () {
                    r(false);
                });
            }
            else {
                try {
                    var input = document.createElement('input');
                    input.value = _str;
                    document.body.append(input);
                    input.select();
                    document.execCommand('copy');
                    input.remove();
                    r(true);
                }
                catch (_a) {
                    r(false);
                }
            }
        });
    };
    /**
     * 从剪切板获取内容
     */
    Clipboard.get = function () {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard.readText().then(function (value) {
                    r(value);
                }).then(function () {
                    r('');
                });
            }
            else {
                r('');
            }
        });
    };
    return Clipboard;
}());
exports.Clipboard = Clipboard;


/***/ }),

/***/ "../dist/web/localData/BaseDataProxy.js":
/*!**********************************************!*\
  !*** ../dist/web/localData/BaseDataProxy.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseDataProxy = void 0;
var BaseDataProxy_1 = __webpack_require__(/*! ../../localData/BaseDataProxy */ "../dist/localData/BaseDataProxy.js");
var LocalStorage_1 = __webpack_require__(/*! ./LocalStorage_ */ "../dist/web/localData/LocalStorage_.js");
/**
 * 基类本地数据代理
 */
var BaseDataProxy = /** @class */ (function (_super) {
    __extends(BaseDataProxy, _super);
    function BaseDataProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseDataProxy.prototype, "LocalStorage_", {
        get: function () {
            return LocalStorage_1.LocalStorage_;
        },
        enumerable: false,
        configurable: true
    });
    return BaseDataProxy;
}(BaseDataProxy_1.BaseDataProxy));
exports.BaseDataProxy = BaseDataProxy;


/***/ }),

/***/ "../dist/web/localData/LocalStorage_.js":
/*!**********************************************!*\
  !*** ../dist/web/localData/LocalStorage_.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStorage_ = void 0;
/**
 * 封装后的本地数据类
 * 将把会数据以json的格式保存
 */
var LocalStorage_ = /** @class */ (function () {
    function LocalStorage_() {
    }
    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    LocalStorage_.setItem = function (key, value, _f) {
        //直接保存为json数据
        localStorage.setItem(key, _f ? _f(JSON.stringify(value)) : JSON.stringify(value));
    };
    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    LocalStorage_.getItem = function (key, _f) {
        try {
            return JSON.parse(_f ? _f(localStorage.getItem(key)) : localStorage.getItem(key));
        }
        catch (_a) {
            //如果有异常就直接删除这条数据并返回null
            this.removeItem(key);
            return null;
        }
    };
    /**
     * 删除数据
     * @param key 名字
     */
    LocalStorage_.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    /**
     * 清理本地的全部数据
     */
    LocalStorage_.clear = function () {
        localStorage.clear();
    };
    return LocalStorage_;
}());
exports.LocalStorage_ = LocalStorage_;


/***/ }),

/***/ "./src/web/objProxy.js":
/*!*****************************!*\
  !*** ./src/web/objProxy.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { createProxyObj, cleanProxyObjCon, autoROF, getobjProxyMap } = __webpack_require__(/*! yayaluoya-tool/dist/obj/createProxyObj */ "../dist/obj/createProxyObj.js");
const { BaseDataProxy } = __webpack_require__(/*! yayaluoya-tool/dist/web/localData/BaseDataProxy */ "../dist/web/localData/BaseDataProxy.js");

let testData = createProxyObj({
    a: 10,
    b: [1, 2, 3],
    c: {
        a: 10,
        b: [1, 2, 3],
    },
    d: true,
    e: null,
}, {
    set(...arg) {
        // console.log('set', ...arg);
    },
    get(...arg) {
        // console.log('get', ...arg);
    },
});

window.testData = testData;

autoROF(() => {
    // console.log('自动依赖执行', testData.c.a);
});

class A extends BaseDataProxy {
    getNewData() {
        return {
            a: 10,
            b: [1, 2, 3],
            c: {
                a: 10,
                b: [1, 2, 3],
            },
            d: true,
            e: null,
        };
    }
}

window.localTestData = new A();

window.cleanProxyObjCon = cleanProxyObjCon;

// 弱引用测试
let f = async () => {
    for (let i = 0; i < 10; i++) {
        await new Promise((r) => {
            setTimeout(() => {
                testData.c = { a: 20 };
                testData.c;
                r();
            }, 0);
        });
    }
    //
    setTimeout(() => {
        console.log(getobjProxyMap());
    }, 1000);
}
f();

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
const { Clipboard } = __webpack_require__(/*! yayaluoya-tool/dist/web/Clipboard */ "../dist/web/Clipboard.js");

console.log('web端的测试');

__webpack_require__(/*! ./objProxy */ "./src/web/objProxy.js");
// require('./base64');
// require('./URLTool');

window.Clipboard = Clipboard;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGFBQWE7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGVBQWU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGtDQUFrQyx1Q0FBdUMsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFCQUFxQjtBQUNsRDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsbUJBQW1CO0FBQ2xGO0FBQ0E7QUFDQSwrREFBK0QsZ0JBQWdCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUN2TUw7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLE9BQU87QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix1QkFBdUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpQkFBaUI7Ozs7Ozs7Ozs7OztBQ3pJSjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxHQUFHLGlCQUFpQixHQUFHLGdCQUFnQixHQUFHLGVBQWUsR0FBRyxnQkFBZ0IsR0FBRyxpQkFBaUIsR0FBRyxrQkFBa0IsR0FBRyxnQkFBZ0IsR0FBRyxpQkFBaUIsR0FBRyxnQkFBZ0IsR0FBRyxxQkFBcUIsR0FBRyxzQkFBc0IsR0FBRyxjQUFjLEdBQUcsY0FBYyxHQUFHLGVBQWUsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsYUFBYSxHQUFHLFVBQVU7QUFDelo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQjtBQUNBLDBDQUEwQyxnREFBZ0QsMkRBQTJEO0FBQ3JKO0FBQ0E7QUFDQSxhQUFhOzs7Ozs7Ozs7Ozs7QUMvRkE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQixzQ0FBc0Msa0JBQWtCO0FBQ3ZGLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLE9BQU87QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLGtCQUFrQixtQkFBTyxDQUFDLDBDQUFjO0FBQ3hDLHVCQUF1QixtQkFBTyxDQUFDLDREQUF1QjtBQUN0RCxvQkFBb0IsbUJBQU8sQ0FBQyxzREFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHVCQUF1QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyw0QkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxxQkFBcUI7Ozs7Ozs7Ozs7OztBQ2xMUjtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkUsT0FBTztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkIsV0FBVyxtQkFBTyxDQUFDLDRCQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLGlCQUFpQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELG1CQUFtQjs7Ozs7Ozs7Ozs7O0FDNUtOO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGVBQWUsR0FBRyxnQkFBZ0IsR0FBRyxpQkFBaUIsR0FBRyx3QkFBd0IsR0FBRyxzQkFBc0IsR0FBRyxzQkFBc0I7QUFDeEosbUJBQW1CLG1CQUFPLENBQUMsNENBQWU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxvREFBb0Q7QUFDdEg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxtQkFBbUI7QUFDckY7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ2hOTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpQkFBaUI7Ozs7Ozs7Ozs7OztBQ3pESjtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCLHNDQUFzQyxrQkFBa0I7QUFDdkYsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIsc0JBQXNCLG1CQUFPLENBQUMseUVBQStCO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLCtEQUFpQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0QscUJBQXFCOzs7Ozs7Ozs7Ozs7QUNyQ1I7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHFCQUFxQjs7Ozs7Ozs7Ozs7QUNsRHJCLFFBQVEsNERBQTRELEVBQUUsbUJBQU8sQ0FBQyw2RUFBd0M7QUFDdEgsUUFBUSxnQkFBZ0IsRUFBRSxtQkFBTyxDQUFDLCtGQUFpRDtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7VUM5REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsbUVBQW1DO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMseUNBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3QvQXJyYXlVdGlscy5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3QvQmFzZUV2ZW50LmpzIiwid2VicGFjazovL3Rlc3QvLi4vZGlzdC9pcy5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3QvbG9jYWxEYXRhL0Jhc2VEYXRhUHJveHkuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L29iai9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3Qvb2JqL2NyZWF0ZVByb3h5T2JqLmpzIiwid2VicGFjazovL3Rlc3QvLi4vZGlzdC93ZWIvQ2xpcGJvYXJkLmpzIiwid2VicGFjazovL3Rlc3QvLi4vZGlzdC93ZWIvbG9jYWxEYXRhL0Jhc2VEYXRhUHJveHkuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L3dlYi9sb2NhbERhdGEvTG9jYWxTdG9yYWdlXy5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9vYmpQcm94eS5qcyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufTtcclxudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQXJyYXlVdGlscyA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIOaVsOe7hOW3peWFt1xyXG4gKi9cclxudmFyIEFycmF5VXRpbHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcnJheVV0aWxzKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbDnu4TnmoTmn5DkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBhcnJheVxyXG4gICAgICogQHBhcmFtIF9uIOe0ouW8le+8jOWPr+S7peaYr+i0n+aVsFxyXG4gICAgICovXHJcbiAgICBBcnJheVV0aWxzLmF0ID0gZnVuY3Rpb24gKGFycmF5LCBfbikge1xyXG4gICAgICAgIGlmIChhcnJheS5hdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuYXQoX24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfbik7XHJcbiAgICAgICAgaWYgKF9uID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W19uXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggKyBfbl07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5Lik5Liq5pWw57uE5YaF5a655piv5ZCm55u45ZCMXHJcbiAgICAgKiBAcGFyYW0geCB45pWw57uEXHJcbiAgICAgKiBAcGFyYW0geSB55pWw57uEXHJcbiAgICAgKi9cclxuICAgIEFycmF5VXRpbHMuc2FtZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgdmFyIGVfMSwgX2E7XHJcbiAgICAgICAgaWYgKCEoeCkgfHwgISh5KSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICh4Lmxlbmd0aCAhPSB5Lmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8v5pa55rOV77yaIOeUqOS4gOS4qm1vcOadpee7n+iuoXjmlbDnu4TlkITkuKrlhYPntKDlh7rnjrDnmoTmrKHmlbDvvIzlho3nlKh55pWw57uE5p2l6YCS5YeP5ZCE5YWD57Sg5Ye6546w55qE5qyh5pWw77yM5aaC5p6c5pyA57uI57uT5p6c5Li6MOWImeS4pOS4quaVsOe7hOebuOWQjFxyXG4gICAgICAgIHZhciBtID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHguZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBtLnNldChpdGVtLCAobS5oYXMoaXRlbSkgPyBtLmdldChpdGVtKSA6IDApICsgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgeS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIG0uc2V0KGl0ZW0sIChtLmhhcyhpdGVtKSA/IG0uZ2V0KGl0ZW0pIDogMCkgLSAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WPquimgeWFtuS4reS4gOWFg+e0oOeahOe7n+iuoeS4jeS4ujDlsLHov5Tlm55mYWxzZVxyXG4gICAgICAgIHZhciBiID0gdHJ1ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBtXzEgPSBfX3ZhbHVlcyhtKSwgbV8xXzEgPSBtXzEubmV4dCgpOyAhbV8xXzEuZG9uZTsgbV8xXzEgPSBtXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2IgPSBfX3JlYWQobV8xXzEudmFsdWUsIDIpLCBfID0gX2JbMF0sIF9udW1iZXIgPSBfYlsxXTtcclxuICAgICAgICAgICAgICAgIGlmIChfbnVtYmVyICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBiID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChtXzFfMSAmJiAhbV8xXzEuZG9uZSAmJiAoX2EgPSBtXzEucmV0dXJuKSkgX2EuY2FsbChtXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDnu4TmmK/lkKbljIXlkKvmn5DkuKrmlbDmja5cclxuICAgICAqIEBwYXJhbSBhcnJcclxuICAgICAqIEBwYXJhbSBvcFxyXG4gICAgICovXHJcbiAgICBBcnJheVV0aWxzLmhhcyA9IGZ1bmN0aW9uIChhcnIsIG9wKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gYXJyLmZpbmRJbmRleChmdW5jdGlvbiAoXykgeyByZXR1cm4gb3AoXyk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXggPSBhcnIuaW5kZXhPZihvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py65omT5Lmx5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gX2FycmF5IOebruagh+aVsOe7hFxyXG4gICAgICovXHJcbiAgICBBcnJheVV0aWxzLnVwc2V0ID0gZnVuY3Rpb24gKF9hcnJheSkge1xyXG4gICAgICAgIC8v5Lmx5bqPXHJcbiAgICAgICAgcmV0dXJuIF9hcnJheS5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDpmo/mnLrojrflj5bmlbDnu4TkuK3nmoTpmo/mnLrlgLzvvIzlj6/mjIflrprplb/luqZcclxuICAgICAqIEBwYXJhbSBfYXJyYXkg5Y6f5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gX24g6ZqP5py65Liq5pWwXHJcbiAgICAgKiBAcGFyYW0gX3dlaWdodCDmnYPph43liJfooahcclxuICAgICAqL1xyXG4gICAgQXJyYXlVdGlscy5yYW5kb20gPSBmdW5jdGlvbiAoX2FycmF5LCBfbiwgX3dlaWdodCkge1xyXG4gICAgICAgIGlmIChfbiA9PT0gdm9pZCAwKSB7IF9uID0gMTsgfVxyXG4gICAgICAgIGlmIChfd2VpZ2h0ID09PSB2b2lkIDApIHsgX3dlaWdodCA9IF9hcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIDE7IH0pOyB9XHJcbiAgICAgICAgaWYgKF9hcnJheS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfcm9vdEFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIF9uZXdBcnJheSA9IFtdO1xyXG4gICAgICAgIC8v5p2D6YeN57Si5byV5YiX6KGoXHJcbiAgICAgICAgdmFyIF9pbmRleEFycmF5ID0gW107XHJcbiAgICAgICAgLy/mib7liLDmnIDlsI/nmoTmnYPph41cclxuICAgICAgICB2YXIgX21pbldlaWdodCA9IF93ZWlnaHRbMF07XHJcbiAgICAgICAgX3dlaWdodC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIF9taW5XZWlnaHQgPSBNYXRoLm1pbihfbWluV2VpZ2h0LCBpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfd2VpZ2h0ID0gX3dlaWdodC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaXRlbSAqICgxIC8gX21pbldlaWdodCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF9hcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICBfcm9vdEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBfd2VpZ2h0W2luZGV4XTsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgX2luZGV4QXJyYXkucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgX2luZGV4O1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBfbjsgX2krKykge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3RBcnJheS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogX2luZGV4QXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgX2luZGV4QXJyYXkgPSBfaW5kZXhBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtICE9IF9pbmRleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIF9uZXdBcnJheS5wdXNoKF9yb290QXJyYXkuc3BsaWNlKF9pbmRleEFycmF5W19pbmRleF0sIDEpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gX25ld0FycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5YmU6Zmk5o6J5pWw57uE5oyH5a6a5YaF5a65XHJcbiAgICAgKiBAcGFyYW0geyp9IGFycmF5IOWOn+aVsOe7hFxyXG4gICAgICogQHBhcmFtIHsqfSB2IOmqjOivgeaWueW8jyDlj6/ku6XmmK/mlrnms5XlkozmraPliJnvvIzlpoLmnpzpg73kuI3mmK/nmoTor53ph4fnlKg9PeadpemqjOivge+8jOi/meS6m+adoeS7tumDveWPr+S7peaYr+aVsOe7hFxyXG4gICAgICovXHJcbiAgICBBcnJheVV0aWxzLmVsaW1pbmF0ZSA9IGZ1bmN0aW9uIChhcnJheSwgdikge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICB2ID0gW3ZdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2LmZvckVhY2goZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgdmFyIF9pZiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8v5b6q546v5Yig6Zmk5p+l5om+5Yiw55qE5ruh6Laz5p2h5Lu255qE5YWD57Sg77yM55u05Yiw5om+5LiN5Yiw5Li65q2iXHJcbiAgICAgICAgICAgIHdoaWxlIChfaWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBhcnJheS5maW5kSW5kZXgodik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdiBpbnN0YW5jZW9mIFJlZ0V4cDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBhcnJheS5maW5kSW5kZXgoZnVuY3Rpb24gKF8pIHsgcmV0dXJuIHYudGVzdChfKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYXJyYXkuZmluZEluZGV4KGZ1bmN0aW9uIChfKSB7IHJldHVybiBfID09IHY7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlVdGlscztcclxufSgpKTtcclxuZXhwb3J0cy5BcnJheVV0aWxzID0gQXJyYXlVdGlscztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkJhc2VFdmVudCA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIOS6i+S7tuWfuuexu1xyXG4gKiDnu6fmib/mraTnsbvlsLHlj6/ku6XmiJDkuLrkuovku7bosIPluqbogIXkuoZcclxuICovXHJcbnZhciBCYXNlRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCYXNlRXZlbnQoKSB7XHJcbiAgICAgICAgLyoqIOS6i+S7tuaJp+ihjOWIl+ihqCAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ID0gW107XHJcbiAgICAgICAgLyoqIOW7tui/n+inpuWPkeS6i+S7tuWIl+ihqCAqL1xyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzkuovku7ZcclxuICAgICAqIEBwYXJhbSBrZXkg5ZSv5LiAa2V5XHJcbiAgICAgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoa2V5LCBfdGhpcywgZikge1xyXG4gICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmV2ZW50TGlzdC5wdXNoKHtcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIF90aGlzOiBfdGhpcyxcclxuICAgICAgICAgICAgZjogZixcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOS4gOasoeS6i+S7tlxyXG4gICAgICogQHBhcmFtIGtleSDllK/kuIBrZXlcclxuICAgICAqL1xyXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5vbk9uY2UgPSBmdW5jdGlvbiAoa2V5LCBfdGhpcywgZikge1xyXG4gICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF90aGF0ID0gdGhpcztcclxuICAgICAgICAvL+mHjeaWsOWMheijheS4i+ivpeWHveaVsFxyXG4gICAgICAgIHZhciBfZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgYXJnW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/muIXnkIbosIPor6Xlh73mlbBcclxuICAgICAgICAgICAgX3RoYXQub2ZmKGtleSwgX3RoaXMsIF9mKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgZi5jYWxsLmFwcGx5KGYsIF9fc3ByZWFkQXJyYXkoW3RoaXNdLCBfX3JlYWQoYXJnKSwgZmFsc2UpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5ldmVudExpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBfdGhpczogX3RoaXMsXHJcbiAgICAgICAgICAgIGY6IF9mLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5Y+W5raI55uR5ZCsXHJcbiAgICAgKiDov5nkupvlj4LmlbDlj6/ku6XkuI3kvKDvvIzkvKDkuoblsLHooajnpLropoHlr7nor6Xlj4LmlbDlgZrliKTmlq1cclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqIEBwYXJhbSBfdGhpc1xyXG4gICAgICogQHBhcmFtIGZcclxuICAgICAqL1xyXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoa2V5LCBfdGhpcywgZikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ID0gdGhpcy5ldmVudExpc3QuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKChrZXkgPyBrZXkgPT0gaXRlbS5rZXkgOiB0cnVlKSAmJlxyXG4gICAgICAgICAgICAgICAgKF90aGlzID8gX3RoaXMgPT0gaXRlbS5fdGhpcyA6IHRydWUpICYmXHJcbiAgICAgICAgICAgICAgICAoZiA/IGYgPT0gaXRlbS5mIDogdHJ1ZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog6Kem5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0ga2V5IOWUr+S4gGtleVxyXG4gICAgICogQHBhcmFtIGFyZyDpnIDopoHkvKDpgJLnmoTlj4LmlbBcclxuICAgICAqL1xyXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciBhcmcgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5rZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgKF9hID0gaXRlbS5mKS5jYWxsLmFwcGx5KF9hLCBfX3NwcmVhZEFycmF5KFtpdGVtLl90aGlzXSwgX19yZWFkKGFyZyksIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiog5bu26L+f6Kem5Y+RICovXHJcbiAgICBCYXNlRXZlbnQucHJvdG90eXBlLmRlZmVyRW1pdCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0LnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpc18xLmVtaXQuYXBwbHkoX3RoaXNfMSwgX19zcHJlYWRBcnJheShba2V5XSwgX19yZWFkKGFyZyksIGZhbHNlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOaJp+ihjOW7tui/n+inpuWPkSAqL1xyXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5leGVEZWZlckVtaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0LmZvckVhY2goZnVuY3Rpb24gKGYpIHtcclxuICAgICAgICAgICAgZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5jbGVhckRlZmVyRW1pdCgpO1xyXG4gICAgfTtcclxuICAgIC8qKiDmuIXnkIblu7bov5/op6blj5Hkuovku7YgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUuY2xlYXJEZWZlckVtaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJhc2VFdmVudDtcclxufSgpKTtcclxuZXhwb3J0cy5CYXNlRXZlbnQgPSBCYXNlRXZlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaXNVcmwgPSBleHBvcnRzLmlzQ2xpZW50ID0gZXhwb3J0cy5pc1NlcnZlciA9IGV4cG9ydHMuaXNNYXAgPSBleHBvcnRzLmlzRWxlbWVudCA9IGV4cG9ydHMuaXNXaW5kb3cgPSBleHBvcnRzLmlzQXJyYXkgPSBleHBvcnRzLmlzUmVnRXhwID0gZXhwb3J0cy5pc0Jvb2xlYW4gPSBleHBvcnRzLmlzRnVuY3Rpb24gPSBleHBvcnRzLmlzU3RyaW5nID0gZXhwb3J0cy5pc1Byb21pc2UgPSBleHBvcnRzLmlzTnVtYmVyID0gZXhwb3J0cy5pc051bGxPclVuRGVmID0gZXhwb3J0cy5pc051bGxBbmRVbkRlZiA9IGV4cG9ydHMuaXNOdWxsID0gZXhwb3J0cy5pc0RhdGUgPSBleHBvcnRzLmlzRW1wdHkgPSBleHBvcnRzLmlzT2JqZWN0ID0gZXhwb3J0cy5pc1VuRGVmID0gZXhwb3J0cy5pc0RlZiA9IGV4cG9ydHMuaXMgPSB2b2lkIDA7XHJcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbmZ1bmN0aW9uIGlzKHZhbCwgdHlwZSkge1xyXG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFwiLmNvbmNhdCh0eXBlLCBcIl1cIik7XHJcbn1cclxuZXhwb3J0cy5pcyA9IGlzO1xyXG5mdW5jdGlvbiBpc0RlZih2YWwpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcclxufVxyXG5leHBvcnRzLmlzRGVmID0gaXNEZWY7XHJcbmZ1bmN0aW9uIGlzVW5EZWYodmFsKSB7XHJcbiAgICByZXR1cm4gIWlzRGVmKHZhbCk7XHJcbn1cclxuZXhwb3J0cy5pc1VuRGVmID0gaXNVbkRlZjtcclxuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsICE9PSBudWxsICYmIGlzKHZhbCwgJ09iamVjdCcpO1xyXG59XHJcbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcclxuZnVuY3Rpb24gaXNFbXB0eSh2YWwpIHtcclxuICAgIGlmIChpc0FycmF5KHZhbCkgfHwgaXNTdHJpbmcodmFsKSkge1xyXG4gICAgICAgIHJldHVybiB2YWwubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIE1hcCB8fCB2YWwgaW5zdGFuY2VvZiBTZXQpIHtcclxuICAgICAgICByZXR1cm4gdmFsLnNpemUgPT09IDA7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNPYmplY3QodmFsKSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xyXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XHJcbiAgICByZXR1cm4gaXModmFsLCAnRGF0ZScpO1xyXG59XHJcbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xyXG5mdW5jdGlvbiBpc051bGwodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsID09PSBudWxsO1xyXG59XHJcbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xyXG5mdW5jdGlvbiBpc051bGxBbmRVbkRlZih2YWwpIHtcclxuICAgIHJldHVybiBpc1VuRGVmKHZhbCkgJiYgaXNOdWxsKHZhbCk7XHJcbn1cclxuZXhwb3J0cy5pc051bGxBbmRVbkRlZiA9IGlzTnVsbEFuZFVuRGVmO1xyXG5mdW5jdGlvbiBpc051bGxPclVuRGVmKHZhbCkge1xyXG4gICAgcmV0dXJuIGlzVW5EZWYodmFsKSB8fCBpc051bGwodmFsKTtcclxufVxyXG5leHBvcnRzLmlzTnVsbE9yVW5EZWYgPSBpc051bGxPclVuRGVmO1xyXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcclxuICAgIHJldHVybiBpcyh2YWwsICdOdW1iZXInKTtcclxufVxyXG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XHJcbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWwpIHtcclxuICAgIHJldHVybiBpcyh2YWwsICdQcm9taXNlJykgJiYgaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC50aGVuKSAmJiBpc0Z1bmN0aW9uKHZhbC5jYXRjaCk7XHJcbn1cclxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XHJcbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xyXG4gICAgcmV0dXJuIGlzKHZhbCwgJ1N0cmluZycpO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWwpIHtcclxuICAgIHJldHVybiBpcyh2YWwsICdCb29sZWFuJyk7XHJcbn1cclxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XHJcbmZ1bmN0aW9uIGlzUmVnRXhwKHZhbCkge1xyXG4gICAgcmV0dXJuIGlzKHZhbCwgJ1JlZ0V4cCcpO1xyXG59XHJcbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcclxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcclxuICAgIHJldHVybiB2YWwgJiYgQXJyYXkuaXNBcnJheSh2YWwpO1xyXG59XHJcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XHJcbmZ1bmN0aW9uIGlzV2luZG93KHZhbCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIGlzKHZhbCwgJ1dpbmRvdycpO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3cgPSBpc1dpbmRvdztcclxuZnVuY3Rpb24gaXNFbGVtZW50KHZhbCkge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgISF2YWwudGFnTmFtZTtcclxufVxyXG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcclxuZnVuY3Rpb24gaXNNYXAodmFsKSB7XHJcbiAgICByZXR1cm4gaXModmFsLCAnTWFwJyk7XHJcbn1cclxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xyXG5leHBvcnRzLmlzU2VydmVyID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCc7XHJcbmV4cG9ydHMuaXNDbGllbnQgPSAhZXhwb3J0cy5pc1NlcnZlcjtcclxuZnVuY3Rpb24gaXNVcmwocGF0aCkge1xyXG4gICAgdmFyIHJlZyA9IC8oKCheaHR0cHM/Oig/OlxcL1xcLyk/KSg/OlstOzomPSskLFxcd10rQCk/W0EtWmEtejAtOS4tXSsoPzo6XFxkKyk/fCg/Ond3dy58Wy07OiY9KyQsXFx3XStAKVtBLVphLXowLTkuLV0rKSgoPzpcXC9bK34lLy5cXHctX10qKT9cXD8/KD86Wy0rPSY7JUAuXFx3X10qKSM/KD86W1xcd10qKSk/KSQvO1xyXG4gICAgcmV0dXJuIHJlZy50ZXN0KHBhdGgpO1xyXG59XHJcbmV4cG9ydHMuaXNVcmwgPSBpc1VybDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlRGF0YVByb3h5ID0gdm9pZCAwO1xyXG52YXIgQmFzZUV2ZW50XzEgPSByZXF1aXJlKFwiLi4vQmFzZUV2ZW50XCIpO1xyXG52YXIgY3JlYXRlUHJveHlPYmpfMSA9IHJlcXVpcmUoXCIuLi9vYmovY3JlYXRlUHJveHlPYmpcIik7XHJcbnZhciBPYmplY3RVdGlsc18xID0gcmVxdWlyZShcIi4uL29iai9PYmplY3RVdGlsc1wiKTtcclxuLyoqXHJcbiAqIOWfuuexu+acrOWcsOaVsOaNruS7o+eQhlxyXG4gKiDkuIDkuKrpgJrnlKjnmoTniYjmnKzvvIzpnIDopoHmoLnmja7kuI3lkIznmoTlupTnlKjlnLrmma/lsIHoo4VcclxuICovXHJcbnZhciBCYXNlRGF0YVByb3h5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEJhc2VEYXRhUHJveHksIF9zdXBlcik7XHJcbiAgICAvL1xyXG4gICAgZnVuY3Rpb24gQmFzZURhdGFQcm94eSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIC8qKiDmmK/lkKbnvJbovpEgKi9cclxuICAgICAgICBfdGhpcy5faWZFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIOeKtuaAgeeggSAqL1xyXG4gICAgICAgIF90aGlzLnN0YXRlQ29kZSA9IDA7XHJcbiAgICAgICAgX3RoaXMuZ2V0TG9jYWxEYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VEYXRhUHJveHkucHJvdG90eXBlLCBcIm5hbWVcIiwge1xyXG4gICAgICAgIC8qKiDkv53lrZjnmoTlkI3lrZfvvIzpu5jorqTmmK/nsbvlkI0gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHRoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VEYXRhUHJveHkucHJvdG90eXBlLCBcImRhdGFcIiwge1xyXG4gICAgICAgIC8qKiDmlbDmja4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiog6K6+572u5pWw5o2u77yM6KaB5rOo5oSP5LmL5YmN5Yqg55qE55uR5ZCs5bCG5Lya5aSx5Y675oSP5LmJICovXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgIT09IF9kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsRGF0YShfZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmFzZURhdGFQcm94eS5wcm90b3R5cGUsIFwiY2xvbmVEYXRhXCIsIHtcclxuICAgICAgICAvKiog6I635Y+W5LiA5Lu95YWL6ZqG5pWw5o2uICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RVdGlsc18xLk9iamVjdFV0aWxzLmNsb25lXyh0aGlzLl9kYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrOWcsOaVsOaNrlxyXG4gICAgICogVE9ETyDov5nph4zmmrTpnLLnu5nmtL7nlJ/nsbvmmK/kuLrkuobmlrnkvr/lr7nor6Xmlrnms5XliqDku6Xkv67ppbDvvIzkuI3opoHph43lhplcclxuICAgICAqIEBwYXJhbSBfZGF0YSDmjIflrprkuIDkuKrmlbDmja7vvIzlpoLmnpzkuI3lrZjlnKjkuJTmnKzlnLDmsqHmnInmlbDmja7nmoTor53liJnkvJrosIPnlKjojrflj5bmlbDmja7nmoTmlrnms5Xojrflj5bmlbDmja5cclxuICAgICAqL1xyXG4gICAgQmFzZURhdGFQcm94eS5wcm90b3R5cGUuZ2V0TG9jYWxEYXRhID0gZnVuY3Rpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBpZiAoX2RhdGEpIHtcclxuICAgICAgICAgICAgKDAsIGNyZWF0ZVByb3h5T2JqXzEuY2xlYW5Qcm94eU9iakNvbikodGhpcy5fZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuTG9jYWxTdG9yYWdlXy5zZXRJdGVtKHRoaXMubmFtZSwgX2RhdGEsIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZGF0YUhhbmRsZShzLCAnc2V0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkYXRhID0gX2RhdGE7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuTG9jYWxTdG9yYWdlXy5nZXRJdGVtKHRoaXMubmFtZSwgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5kYXRhSGFuZGxlKHMsICdnZXQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZ2V0TmV3RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLl9kYXRhID0gKDAsIGNyZWF0ZVByb3h5T2JqXzEuY3JlYXRlUHJveHlPYmopKGRhdGEsIHtcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJnID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QmFjay5hcHBseShfdGhpcywgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZyksIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOaVsOaNruS/ruaUueWbnuiwgyAqL1xyXG4gICAgQmFzZURhdGFQcm94eS5wcm90b3R5cGUuc2V0QmFjayA9IGZ1bmN0aW9uICh0YXJnZXQsIHAsIG5ld1ZhbHVlLCB2YWx1ZSwgb2JqS2V5KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7IHRhcmdldCA9IG51bGw7IH1cclxuICAgICAgICBpZiAocCA9PT0gdm9pZCAwKSB7IHAgPSAnJzsgfVxyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdm9pZCAwKSB7IG5ld1ZhbHVlID0gbnVsbDsgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7IHZhbHVlID0gbnVsbDsgfVxyXG4gICAgICAgIC8v6Kem5Y+R5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5lbWl0KCdzZXQnLCB0YXJnZXQsIHAsIG5ld1ZhbHVlLCB2YWx1ZSwgb2JqS2V5KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMudXBkYXRlKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICAvKiog5pu05pawICovXHJcbiAgICBCYXNlRGF0YVByb3h5LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGYgPT09IHZvaWQgMCkgeyBmID0gZmFsc2U7IH1cclxuICAgICAgICBpZiAoZikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ29kZSsrO1xyXG4gICAgICAgICAgICB0aGlzLl9pZkVkaXQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lmRWRpdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgndXBkYXRlJyk7XHJcbiAgICAgICAgdGhpcy5faWZFZGl0ID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX3N0YXRlQ29kZSA9IHRoaXMuc3RhdGVDb2RlO1xyXG4gICAgICAgIC8v55So5b6u5Lu75Yqh5p2l5omn6KGM5L+d5a2Y5pa55rOVXHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8qKiDnirbmgIHnoIHkuI3kuIDmoLfkuobnmoTor53or7TmmI7moLnmlbDmja7lj5HnlJ/kuoblj5jljJbvvIzmraTml7blsLHkuI3nlKjlnKjkv53lrZjkuYvliY3nmoTmlbDmja7kuoYgKi9cclxuICAgICAgICAgICAgaWYgKF9zdGF0ZUNvZGUgIT0gX3RoaXMuc3RhdGVDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuX2lmRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBfdGhpcy5zYXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS/neWtmOaVsOaNriAqL1xyXG4gICAgQmFzZURhdGFQcm94eS5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuTG9jYWxTdG9yYWdlXy5zZXRJdGVtKHRoaXMubmFtZSwgdGhpcy5kYXRhLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZGF0YUhhbmRsZShzLCAnc2V0Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdzYXZlJyk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOaVsOaNruWkhOeQhu+8jOWPr+S7peWcqOaVsOaNruiiq+iOt+WPluWSjOiuvue9ruWJjeWBmuWKoOWvhuino+WvhuaTjeS9nCAqL1xyXG4gICAgQmFzZURhdGFQcm94eS5wcm90b3R5cGUuZGF0YUhhbmRsZSA9IGZ1bmN0aW9uIChzdHIsIHR5cGUpIHtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlRGF0YVByb3h5O1xyXG59KEJhc2VFdmVudF8xLkJhc2VFdmVudCkpO1xyXG5leHBvcnRzLkJhc2VEYXRhUHJveHkgPSBCYXNlRGF0YVByb3h5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9iamVjdFV0aWxzID0gdm9pZCAwO1xyXG52YXIgaXNfMSA9IHJlcXVpcmUoXCIuLi9pc1wiKTtcclxuLyoqXHJcbiAqIOWvueixoeW3peWFt+exu1xyXG4gKi9cclxudmFyIE9iamVjdFV0aWxzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gT2JqZWN0VXRpbHMoKSB7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOS4quWvueixoeeahOWxnuaAp1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICogQHBhcmFtIGtleSDnm67moIflsZ7mgKfvvIzlj6/ku6XmmK/mlrnms5XvvIzmraPliJnooajovr7lvI/vvIzlhbblroPnmoTph4fnlKg9PeWPt+WMuemFjVxyXG4gICAgICovXHJcbiAgICBPYmplY3RVdGlscy5nZXRQcm8gPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpcztcclxuICAgICAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgICAgICBpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZW9mIGtleSA9PSAnZnVuY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGlzID0ga2V5KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBrZXkgaW5zdGFuY2VvZiBSZWdFeHA6XHJcbiAgICAgICAgICAgICAgICAgICAgaXMgPSBrZXkudGVzdChpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXMgPSBpID09IGtleTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBpZiAoaXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhYvpmobkuIDkuKrlr7nosaFcclxuICAgICAqIOmHh+eUqOW6j+WIl+WMluWSjOWPjeW6j+WIl+WMlueahOaWueW8j++8jGZ1bmN0aW9u5LiN5Lya6KKr5YWL6ZqGXHJcbiAgICAgKiBAcGFyYW0gX08g6K+l5a+56LGhXHJcbiAgICAgKi9cclxuICAgIE9iamVjdFV0aWxzLmNsb25lID0gZnVuY3Rpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2RhdGEpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWFi+mahuS4gOS4quWvueixoVxyXG4gICAgICog6YCS5b2S5YWL6ZqGXHJcbiAgICAgKi9cclxuICAgIE9iamVjdFV0aWxzLmNsb25lXyA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcgJiYgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5wdXNoKF90aGlzLmNsb25lXyhiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF9kYXRhID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgX2RhdGFbaV0gPSB0aGlzLmNsb25lXyhkYXRhW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gX2RhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5bGe5oCn5o+Q5Y+WXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ialxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wc1xyXG4gICAgICovXHJcbiAgICBPYmplY3RVdGlscy5wcm9wR2V0ID0gZnVuY3Rpb24gKG9iaiwgcHJvcHMpIHtcclxuICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcHMpKSB7XHJcbiAgICAgICAgICAgIHByb3BzID0gW3Byb3BzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG8gPSB7fTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wc18xID0gX192YWx1ZXMocHJvcHMpLCBwcm9wc18xXzEgPSBwcm9wc18xLm5leHQoKTsgIXByb3BzXzFfMS5kb25lOyBwcm9wc18xXzEgPSBwcm9wc18xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHByb3BzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIG9ba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNfMV8xICYmICFwcm9wc18xXzEuZG9uZSAmJiAoX2EgPSBwcm9wc18xLnJldHVybikpIF9hLmNhbGwocHJvcHNfMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWcqGHlr7nosaHkuIrlkIjlubZi5a+56LGh55qE5YC8XHJcbiAgICAgKiDnsbvlnovku6Vi5a+56LGh5LiK55qE5Li65YeGXHJcbiAgICAgKiBAcGFyYW0gYVxyXG4gICAgICogQHBhcmFtIGJzXHJcbiAgICAgKi9cclxuICAgIE9iamVjdFV0aWxzLm1lcmdlID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICB2YXIgZV8yLCBfYTtcclxuICAgICAgICB2YXIgYnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBic1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgYnNfMSA9IF9fdmFsdWVzKGJzKSwgYnNfMV8xID0gYnNfMS5uZXh0KCk7ICFic18xXzEuZG9uZTsgYnNfMV8xID0gYnNfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBiID0gYnNfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+M5pa56YO95piv5pWw57uE55qE6K+d77yM55u05o6l5ZCI5bm2XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYVtpXSkgJiYgQXJyYXkuaXNBcnJheShiW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhW2ldID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYVtpXSksIGZhbHNlKSwgX19yZWFkKGJbaV0pLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzlj4zmlrnpg73mmK/lr7nosaHnmoTor53liJnpgJLlvZJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKDAsIGlzXzEuaXNPYmplY3QpKGFbaV0pICYmICgwLCBpc18xLmlzT2JqZWN0KShiW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RVdGlscy5tZXJnZShhW2ldLCBiW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgYVtpXSA9IGJbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChic18xXzEgJiYgIWJzXzFfMS5kb25lICYmIChfYSA9IGJzXzEucmV0dXJuKSkgX2EuY2FsbChic18xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBPYmplY3RVdGlscztcclxufSgpKTtcclxuZXhwb3J0cy5PYmplY3RVdGlscyA9IE9iamVjdFV0aWxzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmF1dG9PbmVST0YgPSBleHBvcnRzLmF1dG9ST0YgPSBleHBvcnRzLlJPUmVtb3ZlID0gZXhwb3J0cy5ST0NvbGxlY3QgPSBleHBvcnRzLmNsZWFuUHJveHlPYmpDb24gPSBleHBvcnRzLmNyZWF0ZVByb3h5T2JqID0gZXhwb3J0cy5nZXRvYmpQcm94eU1hcCA9IHZvaWQgMDtcclxudmFyIEFycmF5VXRpbHNfMSA9IHJlcXVpcmUoXCIuLi9BcnJheVV0aWxzXCIpO1xyXG4vKiog5a+56LGhLT7ku6PnkIblr7nosaHmmKDlsIQgKi9cclxudmFyIG9ial9wcm94eV9NYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4vLyBjb25zdCBvYmpfcHJveHlfTWFwID0gbmV3IE1hcDxhbnksIGFueT4oKTtcclxuLyoqXHJcbiAqIOiOt+WPluWvueixoeS7o+eQhuaYoOWwhFxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0b2JqUHJveHlNYXAoKSB7XHJcbiAgICByZXR1cm4gb2JqX3Byb3h5X01hcDtcclxufVxyXG5leHBvcnRzLmdldG9ialByb3h5TWFwID0gZ2V0b2JqUHJveHlNYXA7XHJcbi8qKlxyXG4gKiDku6PnkIblr7nosaHnmoTmoIfor4ZrZXnvvIzlj6/ku6XpgJrov4fov5nkuKprZXnojrflj5blkozorr7nva7ku6PnkIblr7nosaHnmoTmoIfor4blr7nosaFcclxuICogVE9ETyDov5nkuKprZXnkuZ/mmK/liKTmlq3ku6PnkIblr7nosaHnmoTlhbPplK5cclxuICovXHJcbnZhciBwcm94eVNpZ25LZXkgPSBTeW1ib2woKTtcclxuLyoqXHJcbiAqIOaYr+WQpuaYr+S4gOS4quWvueixoVxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIG9iajtcclxufVxyXG4vKipcclxuICog5Yib5bu65LiA5Liq5Luj55CG5a+56LGhXHJcbiAqIFRPRE8g5riQ6L+b5byP55qE77yM5Y+q5pyJ6K6/6Zeu6K+l5a+56LGh55qE5p+Q5Liq5bGe5oCn5pe25omN5Lya5a+56K+l5bGe5oCn5re75Yqg5rex5bqm5Luj55CGXHJcbiAqIOS8muaKiuWvuei/meS4quWvueixoeeahGdldCxzZXTmk43kvZzlm57osIPlh7rljrtcclxuICog5bm25LiU6YWN5ZCIUHJveHlPYmpXYXRjaOaUtumbhuebuOWFs+S+nei1llxyXG4gKiBAcGFyYW0gb2JqIOWOn+Wni+WvueixoVxyXG4gKiBAcGFyYW0gY29uIOWvueixoeiiq+S7o+eQhueahOaTjeS9nFxyXG4gKiBAcGFyYW0gcmVzU2V0RCDph43nva7npoHnlKjnirbmgIFcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb3h5T2JqKG9iaiwgY29uLCByZXNTZXREKSB7XHJcbiAgICBpZiAocmVzU2V0RCA9PT0gdm9pZCAwKSB7IHJlc1NldEQgPSB0cnVlOyB9XHJcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgLy8g5YWI5Zyo57yT5a2Y5Lit5om+XHJcbiAgICB2YXIgcHJveHlPYmo7XHJcbiAgICB2YXIgc2lnbjtcclxuICAgIGlmIChvYmpfcHJveHlfTWFwLmhhcyhvYmopKSB7XHJcbiAgICAgICAgcHJveHlPYmogPSBvYmpfcHJveHlfTWFwLmdldChvYmopO1xyXG4gICAgICAgIHNpZ24gPSBwcm94eU9ialtwcm94eVNpZ25LZXldO1xyXG4gICAgICAgIHNpZ24uY29uID0gY29uO1xyXG4gICAgICAgIGlmIChyZXNTZXREKSB7XHJcbiAgICAgICAgICAgIHNpZ24uZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJveHlPYmo7XHJcbiAgICB9XHJcbiAgICAvLyDmlrDlu7rkuIDkuKpzaWduXHJcbiAgICBzaWduID0ge1xyXG4gICAgICAgIGtleTogU3ltYm9sKCksXHJcbiAgICAgICAgY29uOiBjb24sXHJcbiAgICAgICAgZDogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgcHJveHlPYmogPSBuZXcgUHJveHkob2JqLCB7XHJcbiAgICAgICAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uICh0YXJnZXQsIHApIHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAgICAgdmFyIHBhc3NWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCk7XHJcbiAgICAgICAgICAgIGNsZWFuUHJveHlPYmpDb24ob2JqX3Byb3h5X01hcC5nZXQocGFzc1ZhbHVlKSk7XHJcbiAgICAgICAgICAgIHZhciBzZXRSZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcCk7XHJcbiAgICAgICAgICAgIHNpZ24uZCB8fCAoKF9iID0gKF9hID0gc2lnbi5jb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0YXJnZXQsIHAsIHVuZGVmaW5lZCwgcGFzc1ZhbHVlLCBzaWduLmtleSkpO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgUk9TZXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBwLFxyXG4gICAgICAgICAgICAgICAgb2JqS2V5OiBzaWduLmtleSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRSZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHAsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIGlmIChwID09IHByb3h5U2lnbktleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcik7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY3JlYXRlUHJveHlPYmoodmFsdWUsIHNpZ24uY29uLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNpZ24uZCB8fCAoKF9iID0gKF9hID0gc2lnbi5jb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0YXJnZXQsIHAsIHNpZ24ua2V5KSk7XHJcbiAgICAgICAgICAgIHNpZ24uZCB8fCBST0dldCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IHAsXHJcbiAgICAgICAgICAgICAgICBvYmpLZXk6IHNpZ24ua2V5LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBwLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAgICAgdmFyIHBhc3NWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpO1xyXG4gICAgICAgICAgICBjbGVhblByb3h5T2JqQ29uKG9ial9wcm94eV9NYXAuZ2V0KHBhc3NWYWx1ZSkpO1xyXG4gICAgICAgICAgICB2YXIgc2V0UmVzdWx0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBwLCB2YWx1ZSwgcmVjZWl2ZXIpO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgKChfYiA9IChfYSA9IHNpZ24uY29uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGFyZ2V0LCBwLCB2YWx1ZSwgcGFzc1ZhbHVlLCBzaWduLmtleSkpO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgUk9TZXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBwLFxyXG4gICAgICAgICAgICAgICAgb2JqS2V5OiBzaWduLmtleSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRSZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgLy8g6K6+572u5Yiw57yT5a2Y5LitXHJcbiAgICBvYmpfcHJveHlfTWFwLnNldChvYmosIHByb3h5T2JqKTtcclxuICAgIHJldHVybiBwcm94eU9iajtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVByb3h5T2JqID0gY3JlYXRlUHJveHlPYmo7XHJcbi8qKlxyXG4gKiDmuIXpmaTlr7nosaHnmoTku6PnkIZcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZnVuY3Rpb24gY2xlYW5Qcm94eU9iakNvbihvYmopIHtcclxuICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICB2YXIgc2lnbiA9IG9ialtwcm94eVNpZ25LZXldO1xyXG4gICAgaWYgKHNpZ24pIHtcclxuICAgICAgICBzaWduLmQgPSB0cnVlO1xyXG4gICAgICAgIHNpZ24uY29uID0gbnVsbDtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICAgICAgY2xlYW5Qcm94eU9iakNvbihvYmpbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5leHBvcnRzLmNsZWFuUHJveHlPYmpDb24gPSBjbGVhblByb3h5T2JqQ29uO1xyXG4vKiog5L6d6LWW5YiX6KGoICovXHJcbnZhciByZWx5T25MaXN0ID0gW107XHJcbi8qKiDnm5HlkKzkvp3otZbliJfooaggKi9cclxudmFyIHdhdGNoUk5MaXN0ID0gW107XHJcbi8qKlxyXG4gKiDop6blj5Hkvp3otZZcclxuICogVE9ETyDnlLFjcmVhdGVQcm94eU9iauaooeWdl+mpseWKqFxyXG4gKiBAcGFyYW0ga2V5XHJcbiAqL1xyXG5mdW5jdGlvbiBST1NldChrZXkpIHtcclxuICAgIHdhdGNoUk5MaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAoQXJyYXlVdGlsc18xLkFycmF5VXRpbHMuaGFzKGl0ZW0ua2V5cywgZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF8ub2JqS2V5ID09IGtleS5vYmpLZXkgJiYgXy5rZXkgPT0ga2V5LmtleTsgfSkpIHtcclxuICAgICAgICAgICAgLy9UT0RPIOi/memHjOS4jeebtOaOpeaJp+ihjO+8jOiAjOaYr+aJp+ihjOW5tumHjeaWsOaUtumbhuS+nei1llxyXG4gICAgICAgICAgICBhdXRvUk9GKGl0ZW0uZik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIOS+nei1luaUtumbhlxyXG4gKiBUT0RPIOeUsWNyZWF0ZVByb3h5T2Jq5qih5Z2X6amx5YqoXHJcbiAqIEBwYXJhbSBrZXlcclxuICovXHJcbmZ1bmN0aW9uIFJPR2V0KGtleSkge1xyXG4gICAgLy/mlLbpm4bkvp3otZZcclxuICAgIGlmIChyZWx5T25MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBBcnJheVV0aWxzXzEuQXJyYXlVdGlscy5hdChyZWx5T25MaXN0LCAtMSkucHVzaChrZXkpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiDmlLbpm4bkvp3otZZcclxuICogQHBhcmFtIGZcclxuICovXHJcbmZ1bmN0aW9uIFJPQ29sbGVjdChmKSB7XHJcbiAgICB2YXIgbGlzdCA9IFtdO1xyXG4gICAgcmVseU9uTGlzdC5wdXNoKGxpc3QpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmKCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+iOt+WPluS+nei1luaWueazleaJp+ihjOmUmeivrycsIGUpO1xyXG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcclxuICAgIH1cclxuICAgIGlmIChsaXN0ICE9PSByZWx5T25MaXN0LnBvcCgpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign5pS26ZuG5Yiw55qE5L6d6LWW5pyJ5YGP5beuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5leHBvcnRzLlJPQ29sbGVjdCA9IFJPQ29sbGVjdDtcclxuLyoqXHJcbiAqIOWIoOmZpOafkOS4quS+nei1luaWueazlVxyXG4gKiBAcGFyYW0gZlxyXG4gKi9cclxuZnVuY3Rpb24gUk9SZW1vdmUoZikge1xyXG4gICAgdmFyIGxlbmd0aCA9IHdhdGNoUk5MaXN0Lmxlbmd0aDtcclxuICAgIEFycmF5VXRpbHNfMS5BcnJheVV0aWxzLmVsaW1pbmF0ZSh3YXRjaFJOTGlzdCwgZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF8uZiA9PT0gZjsgfSk7XHJcbiAgICByZXR1cm4gd2F0Y2hSTkxpc3QubGVuZ3RoICE9IGxlbmd0aDtcclxufVxyXG5leHBvcnRzLlJPUmVtb3ZlID0gUk9SZW1vdmU7XHJcbi8qKlxyXG4gKiDoh6rliqjmiafooYzmn5DkuKrluKbmnInkvp3otZbnmoTmlrnms5VcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIGdldFJPRlxyXG4gKi9cclxuZnVuY3Rpb24gYXV0b1JPRihmLCBnZXRST0YpIHtcclxuICAgIHZhciBfUk9GID0gZ2V0Uk9GIHx8IGY7XHJcbiAgICAvL+WFiOWIoOmZpOS5i+WJjeeahOS+nei1llxyXG4gICAgUk9SZW1vdmUoZik7XHJcbiAgICB2YXIgUk9zID0gUk9Db2xsZWN0KF9ST0YpO1xyXG4gICAgd2F0Y2hSTkxpc3QucHVzaCh7XHJcbiAgICAgICAga2V5czogUk9zLFxyXG4gICAgICAgIGY6IGYsXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmF1dG9ST0YgPSBhdXRvUk9GO1xyXG4vKipcclxuICog6Ieq5Yqo5omn6KGM5LiA5qyh5p+Q5Liq5bim5pyJ5L6d6LWW55qE5pa55rOVXHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBnZXRST0ZcclxuICovXHJcbmZ1bmN0aW9uIGF1dG9PbmVST0YoZiwgZ2V0Uk9GKSB7XHJcbiAgICBhdXRvUk9GKGYsIGdldFJPRik7XHJcbiAgICBST1JlbW92ZShmKTtcclxufVxyXG5leHBvcnRzLmF1dG9PbmVST0YgPSBhdXRvT25lUk9GO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNsaXBib2FyZCA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIOWJquWIh+adv+W3peWFt1xyXG4gKi9cclxudmFyIENsaXBib2FyZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENsaXBib2FyZCgpIHtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5LiA5q615a2X56ym5Liy5Yiw5Ymq5YiH5p2/XHJcbiAgICAgKiBAcGFyYW0gX3N0ciDpnIDopoHlpI3liLbnmoTlrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgQ2xpcGJvYXJkLnNldCA9IGZ1bmN0aW9uIChfc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyLCBlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChfc3RyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IF9zdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDku47liarliIfmnb/ojrflj5blhoXlrrlcclxuICAgICAqL1xyXG4gICAgQ2xpcGJvYXJkLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHIsIGUpIHtcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcignJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHIoJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENsaXBib2FyZDtcclxufSgpKTtcclxuZXhwb3J0cy5DbGlwYm9hcmQgPSBDbGlwYm9hcmQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkJhc2VEYXRhUHJveHkgPSB2b2lkIDA7XHJcbnZhciBCYXNlRGF0YVByb3h5XzEgPSByZXF1aXJlKFwiLi4vLi4vbG9jYWxEYXRhL0Jhc2VEYXRhUHJveHlcIik7XHJcbnZhciBMb2NhbFN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL0xvY2FsU3RvcmFnZV9cIik7XHJcbi8qKlxyXG4gKiDln7rnsbvmnKzlnLDmlbDmja7ku6PnkIZcclxuICovXHJcbnZhciBCYXNlRGF0YVByb3h5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEJhc2VEYXRhUHJveHksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYXNlRGF0YVByb3h5KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNlRGF0YVByb3h5LnByb3RvdHlwZSwgXCJMb2NhbFN0b3JhZ2VfXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIExvY2FsU3RvcmFnZV8xLkxvY2FsU3RvcmFnZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEJhc2VEYXRhUHJveHk7XHJcbn0oQmFzZURhdGFQcm94eV8xLkJhc2VEYXRhUHJveHkpKTtcclxuZXhwb3J0cy5CYXNlRGF0YVByb3h5ID0gQmFzZURhdGFQcm94eTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Mb2NhbFN0b3JhZ2VfID0gdm9pZCAwO1xyXG4vKipcclxuICog5bCB6KOF5ZCO55qE5pys5Zyw5pWw5o2u57G7XHJcbiAqIOWwhuaKiuS8muaVsOaNruS7pWpzb27nmoTmoLzlvI/kv53lrZhcclxuICovXHJcbnZhciBMb2NhbFN0b3JhZ2VfID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlXygpIHtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5L+d5a2Y5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWQjeWtl1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOWAvFxyXG4gICAgICogQHBhcmFtIF9mIOiuvue9ruWJjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2VfLnNldEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgX2YpIHtcclxuICAgICAgICAvL+ebtOaOpeS/neWtmOS4umpzb27mlbDmja5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIF9mID8gX2YoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbDmja5cclxuICAgICAqIEBwYXJhbSBrZXkg5ZCN5a2XXHJcbiAgICAgKiBAcGFyYW0gX2Yg6I635Y+W5YmN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIExvY2FsU3RvcmFnZV8uZ2V0SXRlbSA9IGZ1bmN0aW9uIChrZXksIF9mKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoX2YgPyBfZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnInlvILluLjlsLHnm7TmjqXliKDpmaTov5nmnaHmlbDmja7lubbov5Tlm55udWxsXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTmlbDmja5cclxuICAgICAqIEBwYXJhbSBrZXkg5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgIExvY2FsU3RvcmFnZV8ucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5riF55CG5pys5Zyw55qE5YWo6YOo5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIExvY2FsU3RvcmFnZV8uY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIExvY2FsU3RvcmFnZV87XHJcbn0oKSk7XHJcbmV4cG9ydHMuTG9jYWxTdG9yYWdlXyA9IExvY2FsU3RvcmFnZV87XHJcbiIsImNvbnN0IHsgY3JlYXRlUHJveHlPYmosIGNsZWFuUHJveHlPYmpDb24sIGF1dG9ST0YsIGdldG9ialByb3h5TWFwIH0gPSByZXF1aXJlKFwieWF5YWx1b3lhLXRvb2wvZGlzdC9vYmovY3JlYXRlUHJveHlPYmpcIik7XHJcbmNvbnN0IHsgQmFzZURhdGFQcm94eSB9ID0gcmVxdWlyZShcInlheWFsdW95YS10b29sL2Rpc3Qvd2ViL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5XCIpO1xyXG5cclxubGV0IHRlc3REYXRhID0gY3JlYXRlUHJveHlPYmooe1xyXG4gICAgYTogMTAsXHJcbiAgICBiOiBbMSwgMiwgM10sXHJcbiAgICBjOiB7XHJcbiAgICAgICAgYTogMTAsXHJcbiAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgfSxcclxuICAgIGQ6IHRydWUsXHJcbiAgICBlOiBudWxsLFxyXG59LCB7XHJcbiAgICBzZXQoLi4uYXJnKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldCcsIC4uLmFyZyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KC4uLmFyZykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdnZXQnLCAuLi5hcmcpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG53aW5kb3cudGVzdERhdGEgPSB0ZXN0RGF0YTtcclxuXHJcbmF1dG9ST0YoKCkgPT4ge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ+iHquWKqOS+nei1luaJp+ihjCcsIHRlc3REYXRhLmMuYSk7XHJcbn0pO1xyXG5cclxuY2xhc3MgQSBleHRlbmRzIEJhc2VEYXRhUHJveHkge1xyXG4gICAgZ2V0TmV3RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgICAgIGI6IFsxLCAyLCAzXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDogdHJ1ZSxcclxuICAgICAgICAgICAgZTogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cubG9jYWxUZXN0RGF0YSA9IG5ldyBBKCk7XHJcblxyXG53aW5kb3cuY2xlYW5Qcm94eU9iakNvbiA9IGNsZWFuUHJveHlPYmpDb247XHJcblxyXG4vLyDlvLHlvJXnlKjmtYvor5VcclxubGV0IGYgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3REYXRhLmMgPSB7IGE6IDIwIH07XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5jO1xyXG4gICAgICAgICAgICAgICAgcigpO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhnZXRvYmpQcm94eU1hcCgpKTtcclxuICAgIH0sIDEwMDApO1xyXG59XHJcbmYoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgeyBDbGlwYm9hcmQgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3Qvd2ViL0NsaXBib2FyZCcpO1xyXG5cclxuY29uc29sZS5sb2coJ3dlYuerr+eahOa1i+ivlScpO1xyXG5cclxucmVxdWlyZSgnLi9vYmpQcm94eScpO1xyXG4vLyByZXF1aXJlKCcuL2Jhc2U2NCcpO1xyXG4vLyByZXF1aXJlKCcuL1VSTFRvb2wnKTtcclxuXHJcbndpbmRvdy5DbGlwYm9hcmQgPSBDbGlwYm9hcmQ7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==