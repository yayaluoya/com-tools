"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceTool = void 0;
/** 单例隐藏字段名 */
var _instanceName = Symbol();
/**
 * 单例装饰器
 * @param {*} name 单例字段名称
 */
function InstanceTool(name) {
    if (name === void 0) { name = 'instance'; }
    return function (_class) {
        Object.defineProperty(_class, name, {
            configurable: false,
            enumerable: false,
            get: function () {
                return _class[_instanceName] || (_class[_instanceName] = new _class());
            },
        });
    };
}
exports.InstanceTool = InstanceTool;
