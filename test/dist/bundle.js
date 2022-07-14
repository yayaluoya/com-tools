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
exports.autoOneROF = exports.autoROF = exports.RORemove = exports.ROCollect = exports.cleanProxyObjCon = exports.createProxyObj = void 0;
var ArrayUtils_1 = __webpack_require__(/*! ../ArrayUtils */ "../dist/ArrayUtils.js");
/** 对象->代理对象映射 */
var obj_proxy_Map = new WeakMap();
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

const { createProxyObj, cleanProxyObjCon, autoROF } = __webpack_require__(/*! yayaluoya-tool/dist/obj/createProxyObj */ "../dist/obj/createProxyObj.js");
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
        console.log('set', ...arg);
    },
    get(...arg) {
        console.log('get', ...arg);
    },
});

window.testData = testData;

autoROF(() => {
    console.log('自动依赖执行', testData.c.a);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLG1FQUFtQztBQUNqRTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLHlDQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L0FycmF5VXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L0Jhc2VFdmVudC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3QvaXMuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5LmpzIiwid2VicGFjazovL3Rlc3QvLi4vZGlzdC9vYmovT2JqZWN0VXRpbHMuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L29iai9jcmVhdGVQcm94eU9iai5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3Qvd2ViL0NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3Qvd2ViL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5LmpzIiwid2VicGFjazovL3Rlc3QvLi4vZGlzdC93ZWIvbG9jYWxEYXRhL0xvY2FsU3RvcmFnZV8uanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvb2JqUHJveHkuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkFycmF5VXRpbHMgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiDmlbDnu4Tlt6XlhbdcclxuICovXHJcbnZhciBBcnJheVV0aWxzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXJyYXlVdGlscygpIHtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pWw57uE55qE5p+Q5Liq5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gYXJyYXlcclxuICAgICAqIEBwYXJhbSBfbiDntKLlvJXvvIzlj6/ku6XmmK/otJ/mlbBcclxuICAgICAqL1xyXG4gICAgQXJyYXlVdGlscy5hdCA9IGZ1bmN0aW9uIChhcnJheSwgX24pIHtcclxuICAgICAgICBpZiAoYXJyYXkuYXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LmF0KF9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX24pO1xyXG4gICAgICAgIGlmIChfbiA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtfbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoICsgX25dO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreS4pOS4quaVsOe7hOWGheWuueaYr+WQpuebuOWQjFxyXG4gICAgICogQHBhcmFtIHggeOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHkgeeaVsOe7hFxyXG4gICAgICovXHJcbiAgICBBcnJheVV0aWxzLnNhbWUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHZhciBlXzEsIF9hO1xyXG4gICAgICAgIGlmICghKHgpIHx8ICEoeSkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoeC5sZW5ndGggIT0geS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvL+aWueazle+8miDnlKjkuIDkuKptb3DmnaXnu5/orqF45pWw57uE5ZCE5Liq5YWD57Sg5Ye6546w55qE5qyh5pWw77yM5YaN55SoeeaVsOe7hOadpemAkuWHj+WQhOWFg+e0oOWHuueOsOeahOasoeaVsO+8jOWmguaenOacgOe7iOe7k+aenOS4ujDliJnkuKTkuKrmlbDnu4Tnm7jlkIxcclxuICAgICAgICB2YXIgbSA9IG5ldyBNYXAoKTtcclxuICAgICAgICB4LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgbS5zZXQoaXRlbSwgKG0uaGFzKGl0ZW0pID8gbS5nZXQoaXRlbSkgOiAwKSArIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBtLnNldChpdGVtLCAobS5oYXMoaXRlbSkgPyBtLmdldChpdGVtKSA6IDApIC0gMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/lj6ropoHlhbbkuK3kuIDlhYPntKDnmoTnu5/orqHkuI3kuLow5bCx6L+U5ZueZmFsc2VcclxuICAgICAgICB2YXIgYiA9IHRydWU7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbV8xID0gX192YWx1ZXMobSksIG1fMV8xID0gbV8xLm5leHQoKTsgIW1fMV8xLmRvbmU7IG1fMV8xID0gbV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKG1fMV8xLnZhbHVlLCAyKSwgXyA9IF9iWzBdLCBfbnVtYmVyID0gX2JbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoX251bWJlciAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobV8xXzEgJiYgIW1fMV8xLmRvbmUgJiYgKF9hID0gbV8xLnJldHVybikpIF9hLmNhbGwobV8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5pWw57uE5piv5ZCm5YyF5ZCr5p+Q5Liq5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gYXJyXHJcbiAgICAgKiBAcGFyYW0gb3BcclxuICAgICAqL1xyXG4gICAgQXJyYXlVdGlscy5oYXMgPSBmdW5jdGlvbiAoYXJyLCBvcCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3AgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmRleCA9IGFyci5maW5kSW5kZXgoZnVuY3Rpb24gKF8pIHsgcmV0dXJuIG9wKF8pOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gYXJyLmluZGV4T2Yob3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOmaj+acuuaJk+S5seaVsOe7hFxyXG4gICAgICogQHBhcmFtIF9hcnJheSDnm67moIfmlbDnu4RcclxuICAgICAqL1xyXG4gICAgQXJyYXlVdGlscy51cHNldCA9IGZ1bmN0aW9uIChfYXJyYXkpIHtcclxuICAgICAgICAvL+S5seW6j1xyXG4gICAgICAgIHJldHVybiBfYXJyYXkuc29ydChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIC0gMC41O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py66I635Y+W5pWw57uE5Lit55qE6ZqP5py65YC877yM5Y+v5oyH5a6a6ZW/5bqmXHJcbiAgICAgKiBAcGFyYW0gX2FycmF5IOWOn+aVsOe7hFxyXG4gICAgICogQHBhcmFtIF9uIOmaj+acuuS4quaVsFxyXG4gICAgICogQHBhcmFtIF93ZWlnaHQg5p2D6YeN5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIEFycmF5VXRpbHMucmFuZG9tID0gZnVuY3Rpb24gKF9hcnJheSwgX24sIF93ZWlnaHQpIHtcclxuICAgICAgICBpZiAoX24gPT09IHZvaWQgMCkgeyBfbiA9IDE7IH1cclxuICAgICAgICBpZiAoX3dlaWdodCA9PT0gdm9pZCAwKSB7IF93ZWlnaHQgPSBfYXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAxOyB9KTsgfVxyXG4gICAgICAgIGlmIChfYXJyYXkubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX3Jvb3RBcnJheSA9IFtdO1xyXG4gICAgICAgIHZhciBfbmV3QXJyYXkgPSBbXTtcclxuICAgICAgICAvL+adg+mHjee0ouW8leWIl+ihqFxyXG4gICAgICAgIHZhciBfaW5kZXhBcnJheSA9IFtdO1xyXG4gICAgICAgIC8v5om+5Yiw5pyA5bCP55qE5p2D6YeNXHJcbiAgICAgICAgdmFyIF9taW5XZWlnaHQgPSBfd2VpZ2h0WzBdO1xyXG4gICAgICAgIF93ZWlnaHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBfbWluV2VpZ2h0ID0gTWF0aC5taW4oX21pbldlaWdodCwgaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3dlaWdodCA9IF93ZWlnaHQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGl0ZW0gKiAoMSAvIF9taW5XZWlnaHQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgX3Jvb3RBcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgX3dlaWdodFtpbmRleF07IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIF9pbmRleEFycmF5LnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIF9pbmRleDtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgX247IF9pKyspIHtcclxuICAgICAgICAgICAgaWYgKF9yb290QXJyYXkubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIF9pbmRleEFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIF9pbmRleEFycmF5ID0gX2luZGV4QXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSAhPSBfaW5kZXg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfbmV3QXJyYXkucHVzaChfcm9vdEFycmF5LnNwbGljZShfaW5kZXhBcnJheVtfaW5kZXhdLCAxKVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmV0dXJuIF9uZXdBcnJheTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWJlOmZpOaOieaVsOe7hOaMh+WumuWGheWuuVxyXG4gICAgICogQHBhcmFtIHsqfSBhcnJheSDljp/mlbDnu4RcclxuICAgICAqIEBwYXJhbSB7Kn0gdiDpqozor4HmlrnlvI8g5Y+v5Lul5piv5pa55rOV5ZKM5q2j5YiZ77yM5aaC5p6c6YO95LiN5piv55qE6K+d6YeH55SoPT3mnaXpqozor4HvvIzov5nkupvmnaHku7bpg73lj6/ku6XmmK/mlbDnu4RcclxuICAgICAqL1xyXG4gICAgQXJyYXlVdGlscy5lbGltaW5hdGUgPSBmdW5jdGlvbiAoYXJyYXksIHYpIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgdiA9IFt2XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdi5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHZhciBfaWYgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL+W+queOr+WIoOmZpOafpeaJvuWIsOeahOa7oei2s+adoeS7tueahOWFg+e0oO+8jOebtOWIsOaJvuS4jeWIsOS4uuatolxyXG4gICAgICAgICAgICB3aGlsZSAoX2lmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVvZiB2ID09ICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYXJyYXkuZmluZEluZGV4KHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHYgaW5zdGFuY2VvZiBSZWdFeHA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYXJyYXkuZmluZEluZGV4KGZ1bmN0aW9uIChfKSB7IHJldHVybiB2LnRlc3QoXyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGFycmF5LmZpbmRJbmRleChmdW5jdGlvbiAoXykgeyByZXR1cm4gXyA9PSB2OyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5VXRpbHM7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQXJyYXlVdGlscyA9IEFycmF5VXRpbHM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlRXZlbnQgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiDkuovku7bln7rnsbtcclxuICog57un5om/5q2k57G75bCx5Y+v5Lul5oiQ5Li65LqL5Lu26LCD5bqm6ICF5LqGXHJcbiAqL1xyXG52YXIgQmFzZUV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFzZUV2ZW50KCkge1xyXG4gICAgICAgIC8qKiDkuovku7bmiafooYzliJfooaggKi9cclxuICAgICAgICB0aGlzLmV2ZW50TGlzdCA9IFtdO1xyXG4gICAgICAgIC8qKiDlu7bov5/op6blj5Hkuovku7bliJfooaggKi9cclxuICAgICAgICB0aGlzLl9ldmVudExpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0ga2V5IOWUr+S4gGtleVxyXG4gICAgICovXHJcbiAgICBCYXNlRXZlbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGtleSwgX3RoaXMsIGYpIHtcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5ldmVudExpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBfdGhpczogX3RoaXMsXHJcbiAgICAgICAgICAgIGY6IGYsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzkuIDmrKHkuovku7ZcclxuICAgICAqIEBwYXJhbSBrZXkg5ZSv5LiAa2V5XHJcbiAgICAgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUub25PbmNlID0gZnVuY3Rpb24gKGtleSwgX3RoaXMsIGYpIHtcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy/ph43mlrDljIXoo4XkuIvor6Xlh73mlbBcclxuICAgICAgICB2YXIgX2YgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmcgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGFyZ1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5riF55CG6LCD6K+l5Ye95pWwXHJcbiAgICAgICAgICAgIF90aGF0Lm9mZihrZXksIF90aGlzLCBfZik7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGYuY2FsbC5hcHBseShmLCBfX3NwcmVhZEFycmF5KFt0aGlzXSwgX19yZWFkKGFyZyksIGZhbHNlKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgX3RoaXM6IF90aGlzLFxyXG4gICAgICAgICAgICBmOiBfZixcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOebkeWQrFxyXG4gICAgICog6L+Z5Lqb5Y+C5pWw5Y+v5Lul5LiN5Lyg77yM5Lyg5LqG5bCx6KGo56S66KaB5a+56K+l5Y+C5pWw5YGa5Yik5patXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gX3RoaXNcclxuICAgICAqIEBwYXJhbSBmXHJcbiAgICAgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGtleSwgX3RoaXMsIGYpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TGlzdCA9IHRoaXMuZXZlbnRMaXN0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISgoa2V5ID8ga2V5ID09IGl0ZW0ua2V5IDogdHJ1ZSkgJiZcclxuICAgICAgICAgICAgICAgIChfdGhpcyA/IF90aGlzID09IGl0ZW0uX3RoaXMgOiB0cnVlKSAmJlxyXG4gICAgICAgICAgICAgICAgKGYgPyBmID09IGl0ZW0uZiA6IHRydWUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOinpuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIGtleSDllK/kuIBrZXlcclxuICAgICAqIEBwYXJhbSBhcmcg6ZyA6KaB5Lyg6YCS55qE5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgYXJnID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIChfYSA9IGl0ZW0uZikuY2FsbC5hcHBseShfYSwgX19zcHJlYWRBcnJheShbaXRlbS5fdGhpc10sIF9fcmVhZChhcmcpLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOW7tui/n+inpuWPkSAqL1xyXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5kZWZlckVtaXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhcmcgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdC5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXNfMS5lbWl0LmFwcGx5KF90aGlzXzEsIF9fc3ByZWFkQXJyYXkoW2tleV0sIF9fcmVhZChhcmcpLCBmYWxzZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiDmiafooYzlu7bov5/op6blj5EgKi9cclxuICAgIEJhc2VFdmVudC5wcm90b3R5cGUuZXhlRGVmZXJFbWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XHJcbiAgICAgICAgICAgIGYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuY2xlYXJEZWZlckVtaXQoKTtcclxuICAgIH07XHJcbiAgICAvKiog5riF55CG5bu26L+f6Kem5Y+R5LqL5Lu2ICovXHJcbiAgICBCYXNlRXZlbnQucHJvdG90eXBlLmNsZWFyRGVmZXJFbWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdC5sZW5ndGggPSAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlRXZlbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQmFzZUV2ZW50ID0gQmFzZUV2ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmlzVXJsID0gZXhwb3J0cy5pc0NsaWVudCA9IGV4cG9ydHMuaXNTZXJ2ZXIgPSBleHBvcnRzLmlzTWFwID0gZXhwb3J0cy5pc0VsZW1lbnQgPSBleHBvcnRzLmlzV2luZG93ID0gZXhwb3J0cy5pc0FycmF5ID0gZXhwb3J0cy5pc1JlZ0V4cCA9IGV4cG9ydHMuaXNCb29sZWFuID0gZXhwb3J0cy5pc0Z1bmN0aW9uID0gZXhwb3J0cy5pc1N0cmluZyA9IGV4cG9ydHMuaXNQcm9taXNlID0gZXhwb3J0cy5pc051bWJlciA9IGV4cG9ydHMuaXNOdWxsT3JVbkRlZiA9IGV4cG9ydHMuaXNOdWxsQW5kVW5EZWYgPSBleHBvcnRzLmlzTnVsbCA9IGV4cG9ydHMuaXNEYXRlID0gZXhwb3J0cy5pc0VtcHR5ID0gZXhwb3J0cy5pc09iamVjdCA9IGV4cG9ydHMuaXNVbkRlZiA9IGV4cG9ydHMuaXNEZWYgPSBleHBvcnRzLmlzID0gdm9pZCAwO1xyXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG5mdW5jdGlvbiBpcyh2YWwsIHR5cGUpIHtcclxuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBcIi5jb25jYXQodHlwZSwgXCJdXCIpO1xyXG59XHJcbmV4cG9ydHMuaXMgPSBpcztcclxuZnVuY3Rpb24gaXNEZWYodmFsKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZXhwb3J0cy5pc0RlZiA9IGlzRGVmO1xyXG5mdW5jdGlvbiBpc1VuRGVmKHZhbCkge1xyXG4gICAgcmV0dXJuICFpc0RlZih2YWwpO1xyXG59XHJcbmV4cG9ydHMuaXNVbkRlZiA9IGlzVW5EZWY7XHJcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiBpcyh2YWwsICdPYmplY3QnKTtcclxufVxyXG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsKSB7XHJcbiAgICBpZiAoaXNBcnJheSh2YWwpIHx8IGlzU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBNYXAgfHwgdmFsIGluc3RhbmNlb2YgU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbC5zaXplID09PSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzT2JqZWN0KHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtcclxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xyXG4gICAgcmV0dXJuIGlzKHZhbCwgJ0RhdGUnKTtcclxufVxyXG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcclxuZnVuY3Rpb24gaXNOdWxsKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCA9PT0gbnVsbDtcclxufVxyXG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcclxuZnVuY3Rpb24gaXNOdWxsQW5kVW5EZWYodmFsKSB7XHJcbiAgICByZXR1cm4gaXNVbkRlZih2YWwpICYmIGlzTnVsbCh2YWwpO1xyXG59XHJcbmV4cG9ydHMuaXNOdWxsQW5kVW5EZWYgPSBpc051bGxBbmRVbkRlZjtcclxuZnVuY3Rpb24gaXNOdWxsT3JVbkRlZih2YWwpIHtcclxuICAgIHJldHVybiBpc1VuRGVmKHZhbCkgfHwgaXNOdWxsKHZhbCk7XHJcbn1cclxuZXhwb3J0cy5pc051bGxPclVuRGVmID0gaXNOdWxsT3JVbkRlZjtcclxuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XHJcbiAgICByZXR1cm4gaXModmFsLCAnTnVtYmVyJyk7XHJcbn1cclxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xyXG5mdW5jdGlvbiBpc1Byb21pc2UodmFsKSB7XHJcbiAgICByZXR1cm4gaXModmFsLCAnUHJvbWlzZScpICYmIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwudGhlbikgJiYgaXNGdW5jdGlvbih2YWwuY2F0Y2gpO1xyXG59XHJcbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xyXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcclxuICAgIHJldHVybiBpcyh2YWwsICdTdHJpbmcnKTtcclxufVxyXG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xyXG5mdW5jdGlvbiBpc0Jvb2xlYW4odmFsKSB7XHJcbiAgICByZXR1cm4gaXModmFsLCAnQm9vbGVhbicpO1xyXG59XHJcbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xyXG5mdW5jdGlvbiBpc1JlZ0V4cCh2YWwpIHtcclxuICAgIHJldHVybiBpcyh2YWwsICdSZWdFeHAnKTtcclxufVxyXG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XHJcbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsICYmIEFycmF5LmlzQXJyYXkodmFsKTtcclxufVxyXG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xyXG5mdW5jdGlvbiBpc1dpbmRvdyh2YWwpIHtcclxuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiBpcyh2YWwsICdXaW5kb3cnKTtcclxufVxyXG5leHBvcnRzLmlzV2luZG93ID0gaXNXaW5kb3c7XHJcbmZ1bmN0aW9uIGlzRWxlbWVudCh2YWwpIHtcclxuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmICEhdmFsLnRhZ05hbWU7XHJcbn1cclxuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XHJcbmZ1bmN0aW9uIGlzTWFwKHZhbCkge1xyXG4gICAgcmV0dXJuIGlzKHZhbCwgJ01hcCcpO1xyXG59XHJcbmV4cG9ydHMuaXNNYXAgPSBpc01hcDtcclxuZXhwb3J0cy5pc1NlcnZlciA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnO1xyXG5leHBvcnRzLmlzQ2xpZW50ID0gIWV4cG9ydHMuaXNTZXJ2ZXI7XHJcbmZ1bmN0aW9uIGlzVXJsKHBhdGgpIHtcclxuICAgIHZhciByZWcgPSAvKCgoXmh0dHBzPzooPzpcXC9cXC8pPykoPzpbLTs6Jj0rJCxcXHddK0ApP1tBLVphLXowLTkuLV0rKD86OlxcZCspP3woPzp3d3cufFstOzomPSskLFxcd10rQClbQS1aYS16MC05Li1dKykoKD86XFwvWyt+JS8uXFx3LV9dKik/XFw/Pyg/OlstKz0mOyVALlxcd19dKikjPyg/OltcXHddKikpPykkLztcclxuICAgIHJldHVybiByZWcudGVzdChwYXRoKTtcclxufVxyXG5leHBvcnRzLmlzVXJsID0gaXNVcmw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQmFzZURhdGFQcm94eSA9IHZvaWQgMDtcclxudmFyIEJhc2VFdmVudF8xID0gcmVxdWlyZShcIi4uL0Jhc2VFdmVudFwiKTtcclxudmFyIGNyZWF0ZVByb3h5T2JqXzEgPSByZXF1aXJlKFwiLi4vb2JqL2NyZWF0ZVByb3h5T2JqXCIpO1xyXG52YXIgT2JqZWN0VXRpbHNfMSA9IHJlcXVpcmUoXCIuLi9vYmovT2JqZWN0VXRpbHNcIik7XHJcbi8qKlxyXG4gKiDln7rnsbvmnKzlnLDmlbDmja7ku6PnkIZcclxuICog5LiA5Liq6YCa55So55qE54mI5pys77yM6ZyA6KaB5qC55o2u5LiN5ZCM55qE5bqU55So5Zy65pmv5bCB6KOFXHJcbiAqL1xyXG52YXIgQmFzZURhdGFQcm94eSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCYXNlRGF0YVByb3h5LCBfc3VwZXIpO1xyXG4gICAgLy9cclxuICAgIGZ1bmN0aW9uIEJhc2VEYXRhUHJveHkoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICAvKiog5piv5ZCm57yW6L6RICovXHJcbiAgICAgICAgX3RoaXMuX2lmRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIC8qKiDnirbmgIHnoIEgKi9cclxuICAgICAgICBfdGhpcy5zdGF0ZUNvZGUgPSAwO1xyXG4gICAgICAgIF90aGlzLmdldExvY2FsRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNlRGF0YVByb3h5LnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcclxuICAgICAgICAvKiog5L+d5a2Y55qE5ZCN5a2X77yM6buY6K6k5piv57G75ZCNICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNlRGF0YVByb3h5LnByb3RvdHlwZSwgXCJkYXRhXCIsIHtcclxuICAgICAgICAvKiog5pWw5o2uICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqIOiuvue9ruaVsOaNru+8jOimgeazqOaEj+S5i+WJjeWKoOeahOebkeWQrOWwhuS8muWkseWOu+aEj+S5iSAqL1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhICE9PSBfZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhbERhdGEoX2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VEYXRhUHJveHkucHJvdG90eXBlLCBcImNsb25lRGF0YVwiLCB7XHJcbiAgICAgICAgLyoqIOiOt+WPluS4gOS7veWFi+mahuaVsOaNriAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHNfMS5PYmplY3RVdGlscy5jbG9uZV8odGhpcy5fZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKzlnLDmlbDmja5cclxuICAgICAqIFRPRE8g6L+Z6YeM5pq06Zyy57uZ5rS+55Sf57G75piv5Li65LqG5pa55L6/5a+56K+l5pa55rOV5Yqg5Lul5L+u6aWw77yM5LiN6KaB6YeN5YaZXHJcbiAgICAgKiBAcGFyYW0gX2RhdGEg5oyH5a6a5LiA5Liq5pWw5o2u77yM5aaC5p6c5LiN5a2Y5Zyo5LiU5pys5Zyw5rKh5pyJ5pWw5o2u55qE6K+d5YiZ5Lya6LCD55So6I635Y+W5pWw5o2u55qE5pa55rOV6I635Y+W5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIEJhc2VEYXRhUHJveHkucHJvdG90eXBlLmdldExvY2FsRGF0YSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgaWYgKF9kYXRhKSB7XHJcbiAgICAgICAgICAgICgwLCBjcmVhdGVQcm94eU9ial8xLmNsZWFuUHJveHlPYmpDb24pKHRoaXMuX2RhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLkxvY2FsU3RvcmFnZV8uc2V0SXRlbSh0aGlzLm5hbWUsIF9kYXRhLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmRhdGFIYW5kbGUocywgJ3NldCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGF0YSA9IF9kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLkxvY2FsU3RvcmFnZV8uZ2V0SXRlbSh0aGlzLm5hbWUsIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZGF0YUhhbmRsZShzLCAnZ2V0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldE5ld0RhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9ICgwLCBjcmVhdGVQcm94eU9ial8xLmNyZWF0ZVByb3h5T2JqKShkYXRhLCB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEJhY2suYXBwbHkoX3RoaXMsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmcpLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiDmlbDmja7kv67mlLnlm57osIMgKi9cclxuICAgIEJhc2VEYXRhUHJveHkucHJvdG90eXBlLnNldEJhY2sgPSBmdW5jdGlvbiAodGFyZ2V0LCBwLCBuZXdWYWx1ZSwgdmFsdWUsIG9iaktleSkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHZvaWQgMCkgeyB0YXJnZXQgPSBudWxsOyB9XHJcbiAgICAgICAgaWYgKHAgPT09IHZvaWQgMCkgeyBwID0gJyc7IH1cclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHZvaWQgMCkgeyBuZXdWYWx1ZSA9IG51bGw7IH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkgeyB2YWx1ZSA9IG51bGw7IH1cclxuICAgICAgICAvL+inpuWPkeS6i+S7tlxyXG4gICAgICAgIHRoaXMuZW1pdCgnc2V0JywgdGFyZ2V0LCBwLCBuZXdWYWx1ZSwgdmFsdWUsIG9iaktleSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnVwZGF0ZShmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIOabtOaWsCAqL1xyXG4gICAgQmFzZURhdGFQcm94eS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGYpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChmID09PSB2b2lkIDApIHsgZiA9IGZhbHNlOyB9XHJcbiAgICAgICAgaWYgKGYpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNvZGUrKztcclxuICAgICAgICAgICAgdGhpcy5faWZFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pZkVkaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScpO1xyXG4gICAgICAgIHRoaXMuX2lmRWRpdCA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9zdGF0ZUNvZGUgPSB0aGlzLnN0YXRlQ29kZTtcclxuICAgICAgICAvL+eUqOW+ruS7u+WKoeadpeaJp+ihjOS/neWtmOaWueazlVxyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvKiog54q25oCB56CB5LiN5LiA5qC35LqG55qE6K+d6K+05piO5qC55pWw5o2u5Y+R55Sf5LqG5Y+Y5YyW77yM5q2k5pe25bCx5LiN55So5Zyo5L+d5a2Y5LmL5YmN55qE5pWw5o2u5LqGICovXHJcbiAgICAgICAgICAgIGlmIChfc3RhdGVDb2RlICE9IF90aGlzLnN0YXRlQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLl9pZkVkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgX3RoaXMuc2F2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiDkv53lrZjmlbDmja4gKi9cclxuICAgIEJhc2VEYXRhUHJveHkucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLkxvY2FsU3RvcmFnZV8uc2V0SXRlbSh0aGlzLm5hbWUsIHRoaXMuZGF0YSwgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmRhdGFIYW5kbGUocywgJ3NldCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnc2F2ZScpO1xyXG4gICAgfTtcclxuICAgIC8qKiDmlbDmja7lpITnkIbvvIzlj6/ku6XlnKjmlbDmja7ooqvojrflj5blkozorr7nva7liY3lgZrliqDlr4bop6Plr4bmk43kvZwgKi9cclxuICAgIEJhc2VEYXRhUHJveHkucHJvdG90eXBlLmRhdGFIYW5kbGUgPSBmdW5jdGlvbiAoc3RyLCB0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZURhdGFQcm94eTtcclxufShCYXNlRXZlbnRfMS5CYXNlRXZlbnQpKTtcclxuZXhwb3J0cy5CYXNlRGF0YVByb3h5ID0gQmFzZURhdGFQcm94eTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59O1xyXG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PYmplY3RVdGlscyA9IHZvaWQgMDtcclxudmFyIGlzXzEgPSByZXF1aXJlKFwiLi4vaXNcIik7XHJcbi8qKlxyXG4gKiDlr7nosaHlt6XlhbfnsbtcclxuICovXHJcbnZhciBPYmplY3RVdGlscyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9iamVjdFV0aWxzKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDkuKrlr7nosaHnmoTlsZ7mgKdcclxuICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAqIEBwYXJhbSBrZXkg55uu5qCH5bGe5oCn77yM5Y+v5Lul5piv5pa55rOV77yM5q2j5YiZ6KGo6L6+5byP77yM5YW25a6D55qE6YeH55SoPT3lj7fljLnphY1cclxuICAgICAqL1xyXG4gICAgT2JqZWN0VXRpbHMuZ2V0UHJvID0gZnVuY3Rpb24gKG9iaiwga2V5KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVvZiBrZXkgPT0gJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBpcyA9IGtleShpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Uga2V5IGluc3RhbmNlb2YgUmVnRXhwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlzID0ga2V5LnRlc3QoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlzID0gaSA9PSBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgaWYgKGlzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5YWL6ZqG5LiA5Liq5a+56LGhXHJcbiAgICAgKiDph4fnlKjluo/liJfljJblkozlj43luo/liJfljJbnmoTmlrnlvI/vvIxmdW5jdGlvbuS4jeS8muiiq+WFi+mahlxyXG4gICAgICogQHBhcmFtIF9PIOivpeWvueixoVxyXG4gICAgICovXHJcbiAgICBPYmplY3RVdGlscy5jbG9uZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9kYXRhKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhYvpmobkuIDkuKrlr7nosaFcclxuICAgICAqIOmAkuW9kuWFi+mahlxyXG4gICAgICovXHJcbiAgICBPYmplY3RVdGlscy5jbG9uZV8gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnICYmIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGEucHVzaChfdGhpcy5jbG9uZV8oYikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIF9kYXRhW2ldID0gdGhpcy5jbG9uZV8oZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWxnuaAp+aPkOWPllxyXG4gICAgICogQHBhcmFtIHsqfSBvYmpcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcHNcclxuICAgICAqL1xyXG4gICAgT2JqZWN0VXRpbHMucHJvcEdldCA9IGZ1bmN0aW9uIChvYmosIHByb3BzKSB7XHJcbiAgICAgICAgdmFyIGVfMSwgX2E7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BzKSkge1xyXG4gICAgICAgICAgICBwcm9wcyA9IFtwcm9wc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvID0ge307XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcHJvcHNfMSA9IF9fdmFsdWVzKHByb3BzKSwgcHJvcHNfMV8xID0gcHJvcHNfMS5uZXh0KCk7ICFwcm9wc18xXzEuZG9uZTsgcHJvcHNfMV8xID0gcHJvcHNfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwcm9wc18xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BzXzFfMSAmJiAhcHJvcHNfMV8xLmRvbmUgJiYgKF9hID0gcHJvcHNfMS5yZXR1cm4pKSBfYS5jYWxsKHByb3BzXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhh5a+56LGh5LiK5ZCI5bm2YuWvueixoeeahOWAvFxyXG4gICAgICog57G75Z6L5LulYuWvueixoeS4iueahOS4uuWHhlxyXG4gICAgICogQHBhcmFtIGFcclxuICAgICAqIEBwYXJhbSBic1xyXG4gICAgICovXHJcbiAgICBPYmplY3RVdGlscy5tZXJnZSA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgdmFyIGVfMiwgX2E7XHJcbiAgICAgICAgdmFyIGJzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGJzXzEgPSBfX3ZhbHVlcyhicyksIGJzXzFfMSA9IGJzXzEubmV4dCgpOyAhYnNfMV8xLmRvbmU7IGJzXzFfMSA9IGJzXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYiA9IGJzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOWPjOaWuemDveaYr+aVsOe7hOeahOivne+8jOebtOaOpeWQiOW5tlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFbaV0pICYmIEFycmF5LmlzQXJyYXkoYltpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYVtpXSA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFbaV0pLCBmYWxzZSksIF9fcmVhZChiW2ldKSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+M5pa56YO95piv5a+56LGh55qE6K+d5YiZ6YCS5b2SXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgwLCBpc18xLmlzT2JqZWN0KShhW2ldKSAmJiAoMCwgaXNfMS5pc09iamVjdCkoYltpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMubWVyZ2UoYVtpXSwgYltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnNfMV8xICYmICFic18xXzEuZG9uZSAmJiAoX2EgPSBic18xLnJldHVybikpIF9hLmNhbGwoYnNfMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gT2JqZWN0VXRpbHM7XHJcbn0oKSk7XHJcbmV4cG9ydHMuT2JqZWN0VXRpbHMgPSBPYmplY3RVdGlscztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5hdXRvT25lUk9GID0gZXhwb3J0cy5hdXRvUk9GID0gZXhwb3J0cy5ST1JlbW92ZSA9IGV4cG9ydHMuUk9Db2xsZWN0ID0gZXhwb3J0cy5jbGVhblByb3h5T2JqQ29uID0gZXhwb3J0cy5jcmVhdGVQcm94eU9iaiA9IHZvaWQgMDtcclxudmFyIEFycmF5VXRpbHNfMSA9IHJlcXVpcmUoXCIuLi9BcnJheVV0aWxzXCIpO1xyXG4vKiog5a+56LGhLT7ku6PnkIblr7nosaHmmKDlsIQgKi9cclxudmFyIG9ial9wcm94eV9NYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICog5Luj55CG5a+56LGh55qE5qCH6K+Ga2V577yM5Y+v5Lul6YCa6L+H6L+Z5Liqa2V56I635Y+W5ZKM6K6+572u5Luj55CG5a+56LGh55qE5qCH6K+G5a+56LGhXHJcbiAqIFRPRE8g6L+Z5Liqa2V55Lmf5piv5Yik5pat5Luj55CG5a+56LGh55qE5YWz6ZSuXHJcbiAqL1xyXG52YXIgcHJveHlTaWduS2V5ID0gU3ltYm9sKCk7XHJcbi8qKlxyXG4gKiDmmK/lkKbmmK/kuIDkuKrlr7nosaFcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiBvYmo7XHJcbn1cclxuLyoqXHJcbiAqIOWIm+W7uuS4gOS4quS7o+eQhuWvueixoVxyXG4gKiBUT0RPIOa4kOi/m+W8j+eahO+8jOWPquacieiuv+mXruivpeWvueixoeeahOafkOS4quWxnuaAp+aXtuaJjeS8muWvueivpeWxnuaAp+a3u+WKoOa3seW6puS7o+eQhlxyXG4gKiDkvJrmiorlr7nov5nkuKrlr7nosaHnmoRnZXQsc2V05pON5L2c5Zue6LCD5Ye65Y67XHJcbiAqIOW5tuS4lOmFjeWQiFByb3h5T2JqV2F0Y2jmlLbpm4bnm7jlhbPkvp3otZZcclxuICogQHBhcmFtIG9iaiDljp/lp4vlr7nosaFcclxuICogQHBhcmFtIGNvbiDlr7nosaHooqvku6PnkIbnmoTmk43kvZxcclxuICogQHBhcmFtIHJlc1NldEQg6YeN572u56aB55So54q25oCBXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVQcm94eU9iaihvYmosIGNvbiwgcmVzU2V0RCkge1xyXG4gICAgaWYgKHJlc1NldEQgPT09IHZvaWQgMCkgeyByZXNTZXREID0gdHJ1ZTsgfVxyXG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIOWFiOWcqOe8k+WtmOS4reaJvlxyXG4gICAgdmFyIHByb3h5T2JqO1xyXG4gICAgdmFyIHNpZ247XHJcbiAgICBpZiAob2JqX3Byb3h5X01hcC5oYXMob2JqKSkge1xyXG4gICAgICAgIHByb3h5T2JqID0gb2JqX3Byb3h5X01hcC5nZXQob2JqKTtcclxuICAgICAgICBzaWduID0gcHJveHlPYmpbcHJveHlTaWduS2V5XTtcclxuICAgICAgICBzaWduLmNvbiA9IGNvbjtcclxuICAgICAgICBpZiAocmVzU2V0RCkge1xyXG4gICAgICAgICAgICBzaWduLmQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3h5T2JqO1xyXG4gICAgfVxyXG4gICAgLy8g5paw5bu65LiA5Liqc2lnblxyXG4gICAgc2lnbiA9IHtcclxuICAgICAgICBrZXk6IFN5bWJvbCgpLFxyXG4gICAgICAgIGNvbjogY29uLFxyXG4gICAgICAgIGQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIHByb3h5T2JqID0gbmV3IFByb3h5KG9iaiwge1xyXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiAodGFyZ2V0LCBwKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIHZhciBwYXNzVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHApO1xyXG4gICAgICAgICAgICBjbGVhblByb3h5T2JqQ29uKG9ial9wcm94eV9NYXAuZ2V0KHBhc3NWYWx1ZSkpO1xyXG4gICAgICAgICAgICB2YXIgc2V0UmVzdWx0ID0gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHApO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgKChfYiA9IChfYSA9IHNpZ24uY29uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGFyZ2V0LCBwLCB1bmRlZmluZWQsIHBhc3NWYWx1ZSwgc2lnbi5rZXkpKTtcclxuICAgICAgICAgICAgc2lnbi5kIHx8IFJPU2V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogcCxcclxuICAgICAgICAgICAgICAgIG9iaktleTogc2lnbi5rZXksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0UmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBwLCByZWNlaXZlcikge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICBpZiAocCA9PSBwcm94eVNpZ25LZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzaWduO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNyZWF0ZVByb3h5T2JqKHZhbHVlLCBzaWduLmNvbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgKChfYiA9IChfYSA9IHNpZ24uY29uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGFyZ2V0LCBwLCBzaWduLmtleSkpO1xyXG4gICAgICAgICAgICBzaWduLmQgfHwgUk9HZXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBwLFxyXG4gICAgICAgICAgICAgICAgb2JqS2V5OiBzaWduLmtleSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIHZhciBwYXNzVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcclxuICAgICAgICAgICAgY2xlYW5Qcm94eU9iakNvbihvYmpfcHJveHlfTWFwLmdldChwYXNzVmFsdWUpKTtcclxuICAgICAgICAgICAgdmFyIHNldFJlc3VsdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcclxuICAgICAgICAgICAgc2lnbi5kIHx8ICgoX2IgPSAoX2EgPSBzaWduLmNvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHRhcmdldCwgcCwgdmFsdWUsIHBhc3NWYWx1ZSwgc2lnbi5rZXkpKTtcclxuICAgICAgICAgICAgc2lnbi5kIHx8IFJPU2V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogcCxcclxuICAgICAgICAgICAgICAgIG9iaktleTogc2lnbi5rZXksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0UmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIC8vIOiuvue9ruWIsOe8k+WtmOS4rVxyXG4gICAgb2JqX3Byb3h5X01hcC5zZXQob2JqLCBwcm94eU9iaik7XHJcbiAgICByZXR1cm4gcHJveHlPYmo7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVQcm94eU9iaiA9IGNyZWF0ZVByb3h5T2JqO1xyXG4vKipcclxuICog5riF6Zmk5a+56LGh55qE5Luj55CGXHJcbiAqIEBwYXJhbSBvYmpcclxuICogQHJldHVybnNcclxuICovXHJcbmZ1bmN0aW9uIGNsZWFuUHJveHlPYmpDb24ob2JqKSB7XHJcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgdmFyIHNpZ24gPSBvYmpbcHJveHlTaWduS2V5XTtcclxuICAgIGlmIChzaWduKSB7XHJcbiAgICAgICAgc2lnbi5kID0gdHJ1ZTtcclxuICAgICAgICBzaWduLmNvbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgIGNsZWFuUHJveHlPYmpDb24ob2JqW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuZXhwb3J0cy5jbGVhblByb3h5T2JqQ29uID0gY2xlYW5Qcm94eU9iakNvbjtcclxuLyoqIOS+nei1luWIl+ihqCAqL1xyXG52YXIgcmVseU9uTGlzdCA9IFtdO1xyXG4vKiog55uR5ZCs5L6d6LWW5YiX6KGoICovXHJcbnZhciB3YXRjaFJOTGlzdCA9IFtdO1xyXG4vKipcclxuICog6Kem5Y+R5L6d6LWWXHJcbiAqIFRPRE8g55SxY3JlYXRlUHJveHlPYmrmqKHlnZfpqbHliqhcclxuICogQHBhcmFtIGtleVxyXG4gKi9cclxuZnVuY3Rpb24gUk9TZXQoa2V5KSB7XHJcbiAgICB3YXRjaFJOTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYgKEFycmF5VXRpbHNfMS5BcnJheVV0aWxzLmhhcyhpdGVtLmtleXMsIGZ1bmN0aW9uIChfKSB7IHJldHVybiBfLm9iaktleSA9PSBrZXkub2JqS2V5ICYmIF8ua2V5ID09IGtleS5rZXk7IH0pKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETyDov5nph4zkuI3nm7TmjqXmiafooYzvvIzogIzmmK/miafooYzlubbph43mlrDmlLbpm4bkvp3otZZcclxuICAgICAgICAgICAgYXV0b1JPRihpdGVtLmYpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDkvp3otZbmlLbpm4ZcclxuICogVE9ETyDnlLFjcmVhdGVQcm94eU9iauaooeWdl+mpseWKqFxyXG4gKiBAcGFyYW0ga2V5XHJcbiAqL1xyXG5mdW5jdGlvbiBST0dldChrZXkpIHtcclxuICAgIC8v5pS26ZuG5L6d6LWWXHJcbiAgICBpZiAocmVseU9uTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgQXJyYXlVdGlsc18xLkFycmF5VXRpbHMuYXQocmVseU9uTGlzdCwgLTEpLnB1c2goa2V5KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICog5pS26ZuG5L6d6LWWXHJcbiAqIEBwYXJhbSBmXHJcbiAqL1xyXG5mdW5jdGlvbiBST0NvbGxlY3QoZikge1xyXG4gICAgdmFyIGxpc3QgPSBbXTtcclxuICAgIHJlbHlPbkxpc3QucHVzaChsaXN0KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZigpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfojrflj5bkvp3otZbmlrnms5XmiafooYzplJnor68nLCBlKTtcclxuICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobGlzdCAhPT0gcmVseU9uTGlzdC5wb3AoKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aUtumbhuWIsOeahOS+nei1luacieWBj+W3ricpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuZXhwb3J0cy5ST0NvbGxlY3QgPSBST0NvbGxlY3Q7XHJcbi8qKlxyXG4gKiDliKDpmaTmn5DkuKrkvp3otZbmlrnms5VcclxuICogQHBhcmFtIGZcclxuICovXHJcbmZ1bmN0aW9uIFJPUmVtb3ZlKGYpIHtcclxuICAgIHZhciBsZW5ndGggPSB3YXRjaFJOTGlzdC5sZW5ndGg7XHJcbiAgICBBcnJheVV0aWxzXzEuQXJyYXlVdGlscy5lbGltaW5hdGUod2F0Y2hSTkxpc3QsIGZ1bmN0aW9uIChfKSB7IHJldHVybiBfLmYgPT09IGY7IH0pO1xyXG4gICAgcmV0dXJuIHdhdGNoUk5MaXN0Lmxlbmd0aCAhPSBsZW5ndGg7XHJcbn1cclxuZXhwb3J0cy5ST1JlbW92ZSA9IFJPUmVtb3ZlO1xyXG4vKipcclxuICog6Ieq5Yqo5omn6KGM5p+Q5Liq5bim5pyJ5L6d6LWW55qE5pa55rOVXHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBnZXRST0ZcclxuICovXHJcbmZ1bmN0aW9uIGF1dG9ST0YoZiwgZ2V0Uk9GKSB7XHJcbiAgICB2YXIgX1JPRiA9IGdldFJPRiB8fCBmO1xyXG4gICAgLy/lhYjliKDpmaTkuYvliY3nmoTkvp3otZZcclxuICAgIFJPUmVtb3ZlKGYpO1xyXG4gICAgdmFyIFJPcyA9IFJPQ29sbGVjdChfUk9GKTtcclxuICAgIHdhdGNoUk5MaXN0LnB1c2goe1xyXG4gICAgICAgIGtleXM6IFJPcyxcclxuICAgICAgICBmOiBmLFxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5hdXRvUk9GID0gYXV0b1JPRjtcclxuLyoqXHJcbiAqIOiHquWKqOaJp+ihjOS4gOasoeafkOS4quW4puacieS+nei1lueahOaWueazlVxyXG4gKiBAcGFyYW0gZlxyXG4gKiBAcGFyYW0gZ2V0Uk9GXHJcbiAqL1xyXG5mdW5jdGlvbiBhdXRvT25lUk9GKGYsIGdldFJPRikge1xyXG4gICAgYXV0b1JPRihmLCBnZXRST0YpO1xyXG4gICAgUk9SZW1vdmUoZik7XHJcbn1cclxuZXhwb3J0cy5hdXRvT25lUk9GID0gYXV0b09uZVJPRjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DbGlwYm9hcmQgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiDliarliIfmnb/lt6XlhbdcclxuICovXHJcbnZhciBDbGlwYm9hcmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDbGlwYm9hcmQoKSB7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4gOauteWtl+espuS4suWIsOWJquWIh+adv1xyXG4gICAgICogQHBhcmFtIF9zdHIg6ZyA6KaB5aSN5Yi255qE5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIENsaXBib2FyZC5zZXQgPSBmdW5jdGlvbiAoX3N0cikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAociwgZSkge1xyXG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLmNsaXBib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoX3N0cikudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBfc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICByKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5LuO5Ymq5YiH5p2/6I635Y+W5YaF5a65XHJcbiAgICAgKi9cclxuICAgIENsaXBib2FyZC5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyLCBlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoJycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDbGlwYm9hcmQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQ2xpcGJvYXJkID0gQ2xpcGJvYXJkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlRGF0YVByb3h5ID0gdm9pZCAwO1xyXG52YXIgQmFzZURhdGFQcm94eV8xID0gcmVxdWlyZShcIi4uLy4uL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5XCIpO1xyXG52YXIgTG9jYWxTdG9yYWdlXzEgPSByZXF1aXJlKFwiLi9Mb2NhbFN0b3JhZ2VfXCIpO1xyXG4vKipcclxuICog5Z+657G75pys5Zyw5pWw5o2u5Luj55CGXHJcbiAqL1xyXG52YXIgQmFzZURhdGFQcm94eSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCYXNlRGF0YVByb3h5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQmFzZURhdGFQcm94eSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmFzZURhdGFQcm94eS5wcm90b3R5cGUsIFwiTG9jYWxTdG9yYWdlX1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBMb2NhbFN0b3JhZ2VfMS5Mb2NhbFN0b3JhZ2VfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBCYXNlRGF0YVByb3h5O1xyXG59KEJhc2VEYXRhUHJveHlfMS5CYXNlRGF0YVByb3h5KSk7XHJcbmV4cG9ydHMuQmFzZURhdGFQcm94eSA9IEJhc2VEYXRhUHJveHk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTG9jYWxTdG9yYWdlXyA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIOWwgeijheWQjueahOacrOWcsOaVsOaNruexu1xyXG4gKiDlsIbmiorkvJrmlbDmja7ku6Vqc29u55qE5qC85byP5L+d5a2YXHJcbiAqL1xyXG52YXIgTG9jYWxTdG9yYWdlXyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIExvY2FsU3RvcmFnZV8oKSB7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOS/neWtmOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGtleSDlkI3lrZdcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgLxcclxuICAgICAqIEBwYXJhbSBfZiDorr7nva7liY3lpITnkIZcclxuICAgICAqL1xyXG4gICAgTG9jYWxTdG9yYWdlXy5zZXRJdGVtID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIF9mKSB7XHJcbiAgICAgICAgLy/nm7TmjqXkv53lrZjkuLpqc29u5pWw5o2uXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBfZiA/IF9mKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWQjeWtl1xyXG4gICAgICogQHBhcmFtIF9mIOiOt+WPluWJjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2VfLmdldEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCBfZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKF9mID8gX2YobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkgOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyJ5byC5bi45bCx55u05o6l5Yig6Zmk6L+Z5p2h5pWw5o2u5bm26L+U5ZuebnVsbFxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWQjeWtl1xyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2VfLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOa4heeQhuacrOWcsOeahOWFqOmDqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2VfLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VfO1xyXG59KCkpO1xyXG5leHBvcnRzLkxvY2FsU3RvcmFnZV8gPSBMb2NhbFN0b3JhZ2VfO1xyXG4iLCJjb25zdCB7IGNyZWF0ZVByb3h5T2JqLCBjbGVhblByb3h5T2JqQ29uLCBhdXRvUk9GIH0gPSByZXF1aXJlKFwieWF5YWx1b3lhLXRvb2wvZGlzdC9vYmovY3JlYXRlUHJveHlPYmpcIik7XHJcbmNvbnN0IHsgQmFzZURhdGFQcm94eSB9ID0gcmVxdWlyZShcInlheWFsdW95YS10b29sL2Rpc3Qvd2ViL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5XCIpO1xyXG5cclxubGV0IHRlc3REYXRhID0gY3JlYXRlUHJveHlPYmooe1xyXG4gICAgYTogMTAsXHJcbiAgICBiOiBbMSwgMiwgM10sXHJcbiAgICBjOiB7XHJcbiAgICAgICAgYTogMTAsXHJcbiAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgfSxcclxuICAgIGQ6IHRydWUsXHJcbiAgICBlOiBudWxsLFxyXG59LCB7XHJcbiAgICBzZXQoLi4uYXJnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCcsIC4uLmFyZyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KC4uLmFyZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXQnLCAuLi5hcmcpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG53aW5kb3cudGVzdERhdGEgPSB0ZXN0RGF0YTtcclxuXHJcbmF1dG9ST0YoKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ+iHquWKqOS+nei1luaJp+ihjCcsIHRlc3REYXRhLmMuYSk7XHJcbn0pO1xyXG5cclxuY2xhc3MgQSBleHRlbmRzIEJhc2VEYXRhUHJveHkge1xyXG4gICAgZ2V0TmV3RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgICAgIGI6IFsxLCAyLCAzXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDogdHJ1ZSxcclxuICAgICAgICAgICAgZTogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cubG9jYWxUZXN0RGF0YSA9IG5ldyBBKCk7XHJcblxyXG53aW5kb3cuY2xlYW5Qcm94eU9iakNvbiA9IGNsZWFuUHJveHlPYmpDb247IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IHsgQ2xpcGJvYXJkIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9DbGlwYm9hcmQnKTtcclxuXHJcbmNvbnNvbGUubG9nKCd3ZWLnq6/nmoTmtYvor5UnKTtcclxuXHJcbnJlcXVpcmUoJy4vb2JqUHJveHknKTtcclxuLy8gcmVxdWlyZSgnLi9iYXNlNjQnKTtcclxuLy8gcmVxdWlyZSgnLi9VUkxUb29sJyk7XHJcblxyXG53aW5kb3cuQ2xpcGJvYXJkID0gQ2xpcGJvYXJkO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=