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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiCon = void 0;
var axios_1 = __importDefault(require("axios"));
var BaseApiCon_1 = require("../http/BaseApiCon");
var ObjectUtils_1 = require("../obj/ObjectUtils");
/**
 * 基类Api控制器
 */
var BaseApiCon = /** @class */ (function (_super) {
    __extends(BaseApiCon, _super);
    function BaseApiCon() {
        var _this = _super.call(this) || this;
        _this.axiosI = axios_1.default.create();
        return _this;
    }
    Object.defineProperty(BaseApiCon.prototype, "op", {
        /** 可配置选项 */
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    ;
    /**
     * 发送请求
     * 无论成功与否都返回的response
     * @param op 请求配置
     * @returns
     */
    BaseApiCon.prototype.request = function (op) {
        var _this = this;
        //添加请求拦截器
        return this.request_(ObjectUtils_1.ObjectUtils.merge(this.op || {}, op))
            .then(function (config) {
            return _this.axiosI(config)
                //先把异常中的res提取出来
                .catch(function (_a) {
                var response = _a.response;
                //
                throw response;
            })
                .then(function (res) {
                //添加响应拦截
                return _this.response_(res);
            });
        });
    };
    /**
     * 直接获取请求中带有的数据
     * catch中的也是resData
     * @param _op
     */
    BaseApiCon.prototype.requestData = function (_op) {
        var _this = this;
        return this.request(_op)
            .catch(function (res) {
            throw _this.resData_(res === null || res === void 0 ? void 0 : res.data, false, res);
        })
            .then(function (res) {
            return _this.resData_(res.data, true, res);
        });
    };
    /**
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     * TODO 重写以重构ResData
     */
    BaseApiCon.prototype.resData_ = function (data, con, res) {
        return data;
    };
    return BaseApiCon;
}(BaseApiCon_1.BaseApiCon));
exports.BaseApiCon = BaseApiCon;
