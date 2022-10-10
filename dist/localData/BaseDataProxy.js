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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataProxy = void 0;
var BaseEvent_1 = require("../BaseEvent");
var createProxyObj_1 = require("../obj/createProxyObj");
var ObjectUtils_1 = require("../obj/ObjectUtils");
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
            return ObjectUtils_1.ObjectUtils.clone2(this._data);
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
