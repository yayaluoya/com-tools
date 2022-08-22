"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
/**
 * 分页对象
 */
var Pagination = /** @class */ (function () {
    function Pagination(number, numbers) {
        if (number === void 0) { number = 10; }
        if (numbers === void 0) { numbers = []; }
        /** 总数 */
        this.total = 0;
        /** 当前页面 */
        this.currentPage = 1;
        /** 分页大小 */
        this.pageSize = 0;
        /** 可变分页大小 */
        this.pageSizes = [];
        this.pageSize = number;
        this.pageSizes = numbers;
    }
    Object.defineProperty(Pagination.prototype, "lastPage", {
        /** 是否是最后一页 */
        get: function () {
            return this.total <=
                this.currentPage * this.pageSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "maxPage", {
        /** 最大页 */
        get: function () {
            return Math.ceil(this.total / this.pageSize);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 分页递增
     * @param n
     */
    Pagination.prototype.add = function (n) {
        if (n === void 0) { n = 1; }
        n = this.currentPage + n;
        this.currentPage = Math.min(Math.max(0, n), this.maxPage);
    };
    /**
     * 获取分页op，主要是调接口时用的到
     * TODO 根据后端习惯重写此接口
     * @param query
     * @returns
     */
    Pagination.prototype.getPageOp = function (query) {
        if (query === void 0) { query = {}; }
        return __assign({ pageSize: this.pageSize, currentPage: this.currentPage }, query);
    };
    /**
     * 获取序号
     * @param {*} index 索引 从0开始的这个
     * @param {*} pagination 当前页面的分页信息
     */
    Pagination.getIndex = function (index, pagination) {
        return index + 1 + (pagination.currentPage - 1) * pagination.pageSize;
    };
    return Pagination;
}());
exports.Pagination = Pagination;
;
