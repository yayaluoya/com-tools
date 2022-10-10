import { ArraifyT } from "../ArrayUtils";
/**
 * 对象工具类
 */
export declare class ObjectUtils {
    /**
     * 获取一个对象的属性
     * @param obj
     * @param key 目标属性，可以是方法，正则表达式，其它的采用==号匹配
     */
    static getPro(obj: object, key: string | number | {
        (i: string): boolean;
    } | RegExp): any;
    /**
     * 克隆一个对象
     * 采用序列化和反序列化的方式，function不会被克隆
     * @param _O 该对象
     */
    static clone<T>(_data: T): T;
    /**
     * 克隆一个对象
     * 递归克隆
     * TODO 注意对于其他内置对象是不处理的
     */
    static clone_<T>(data: T): T;
    /**
     * 属性提取
     * @param {*} obj
     * @param {*} props
     */
    static propGet(obj: any, props: ArraifyT<string | [string, string | number | {
        (i: string): boolean;
    } | RegExp]>): {};
    /**
     * 在a对象上合并b对象的值
     * 类型以b对象上的为准
     * @param a
     * @param bs
     */
    static merge<T>(a: T, ...bs: T[]): T;
}
//# sourceMappingURL=ObjectUtils.d.ts.map