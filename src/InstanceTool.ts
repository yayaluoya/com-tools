/** 
 * 单例隐藏字段名
 * TODO 就是单纯感觉比放闭包里面好
 */
const instanceName = Symbol();

/**
 * 单例装饰器
 * ! 被装饰的类的构造方法最好不要是public类型的
 * @param {*} name 单例字段名称
 * @param {*} passive 是否被动，指的是被用到时才new
 * @param {*} arg new时带的参数
 */
export function instanceTool(name = 'instance', passive = true, ...arg: []) {
    return function (_class: any) {
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