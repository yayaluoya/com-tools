/**
 * 单例装饰器
 * ! 被装饰的类的构造方法最好不要是public类型的
 * @param {*} name 单例字段名称
 * @param {*} passive 是否被动，指的是被用到时才new
 * @param {*} arg new时带的参数
 */
export declare function instanceTool(name?: string, passive?: boolean, ...arg: []): (_class: any) => void;
//# sourceMappingURL=instanceTool.d.ts.map