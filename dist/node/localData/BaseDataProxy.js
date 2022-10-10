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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataProxy = void 0;
var BaseDataProxy_1 = require("../../localData/BaseDataProxy");
var LocalStorage_1 = require("./LocalStorage_");
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
