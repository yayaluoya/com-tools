/**
 * 数组工具
 */
export default class ArrayUtils {
    /**
     * 获取数组的某个元素
     * @param array
     * @param _n 索引，可以是负数
     */
    static at<T = any>(array: T[], _n: number): T;
    /**
     * 判断两个数组内容是否相同
     * @param x x数组
     * @param y y数组
     */
    static same(x: any[], y: any[]): boolean;
    /**
     * 数组是否包含某个数据
     * @param arr
     * @param obj
     */
    static has<T>(arr: T[], obj: T): boolean;
    /**
     * 复制一个数组
     * @param arr 源数组
     */
    static copy<T>(arr: T[]): T[];
    /**
     * 随机打乱数组
     * @param _array 目标数组
     */
    static upset<T>(_array: T[]): T[];
    /**
     * 随机获取数组中的随机值，可指定长度
     * @param _array 原数组
     * @param _n 随机个数
     * @param _weight 权重列表
     */
    static random<T>(_array: T[], _n?: number, _weight?: number[]): T[];
    /**
     * 剔除掉数组指定内容
     * @param {*} array 原数组
     * @param {*} v 验证方式 可以是方法和正则，如果都不是的话采用==来验证，这些条件都可以是数组
     */
    static eliminate(array: any, v: any): any;
}
