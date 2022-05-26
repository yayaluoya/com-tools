/** 单例隐藏字段名 */
const _instanceName = Symbol();

/**
 * 单例装饰器
 * @param {*} name 单例字段名称
 */
export function InstanceTool(name = 'instance') {
    return function (_class: {
        new(): any
        [key: string | number | symbol]: any
    }) {
        Object.defineProperty(_class, name, {
            configurable: false,
            enumerable: false,
            get() {
                return _class[_instanceName] || (_class[_instanceName] = new _class());
            },
        });
    }
}