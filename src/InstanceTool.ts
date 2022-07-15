/** 单例隐藏字段名 */
const instanceName = Symbol();

/**
 * 单例装饰器
 * @param {*} name 单例字段名称
 * @param {*} passive 是否被动，指的是被用到时才new
 * @param {*} arg new时带的参数
 */
export function InstanceTool(name = 'instance', passive = true, ...arg: []) {
    return function (_class: {
        new(): any
        [key: string | number | symbol]: any
    }) {
        let newF = () => {
            return _class[instanceName] = new _class(...arg);
        }
        passive || newF();
        Object.defineProperty(_class, name, {
            configurable: false,
            enumerable: false,
            get() {
                return _class[instanceName] || newF();
            },
        });
    }
}