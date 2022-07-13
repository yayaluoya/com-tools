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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseItemPool = void 0;
/**
 * 基类对象池
 */
var BaseItemPool = /** @class */ (function () {
    function BaseItemPool() {
        /** 池子 */
        this.m_itemPool = {};
    }
    Object.defineProperty(BaseItemPool.prototype, "itemPool", {
        /** 获取对象池 */
        get: function () {
            return this.m_itemPool;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 对象池是否有内容
     * @param _key key
     */
    BaseItemPool.prototype.poolHasItem = function (_key) {
        return Boolean(this.m_itemPool[_key] && this.m_itemPool[_key].length > 0);
    };
    /**
     * 从对象池中获取对象
     * @param _key key
     */
    BaseItemPool.prototype.getItemByPool = function (_key) {
        //先判断是否有内容
        if (this.poolHasItem(_key)) {
            return this.m_itemPool[_key].pop();
        }
        //
        return null;
    };
    /**
     * 添加对象进对象池
     * @param _key key
     * @param _item 对象
     */
    BaseItemPool.prototype.addItemToPool = function (_key, _item) {
        if (!this.m_itemPool[_key]) {
            this.m_itemPool[_key] = [];
        }
        this.m_itemPool[_key].push(_item);
        //去重
        this.m_itemPool[_key] = __spreadArray([], __read(new Set(this.m_itemPool[_key])), false);
    };
    /**
     * 清空对象池
     */
    BaseItemPool.prototype.emptyPool = function () {
        this.m_itemPool = {};
    };
    return BaseItemPool;
}());
exports.BaseItemPool = BaseItemPool;
