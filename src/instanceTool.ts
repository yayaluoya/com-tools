import { ArrayUtils } from "./ArrayUtils";

/** 
 * 单例隐藏字段名
 */
const instanceName = Symbol();

/**
 * 单例工具，一般当装饰器使用
 * TODO 被装饰的类的构造方法最好不要是public类型的
 * @param {*} names 单例字段名称，可以是多个
 * @param {*} passive 是否被动，指的是单例字段被get时才new
 * @param {*} arg new时带的参数
 */
export function instanceTool<
    T extends new (...arg: any[]) => any
>
    (names: ArraifyT<string> = ['instance', 'I'], passive = true, ...arg: ConstructorParameters<T>) {
    return function (class_: T) {
        let newF = () => {
            return class_[instanceName] || (class_[instanceName] = new class_(...arg));
        }
        passive || newF();
        for (let name of ArrayUtils.arraify(names)) {
            Object.defineProperty(class_, name, {
                configurable: false,
                enumerable: true,
                get() {
                    return newF();
                },
            });
        }
    }
}