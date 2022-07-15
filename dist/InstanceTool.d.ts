/**
 * 单例装饰器
 * @param {*} name 单例字段名称
 * @param {*} passive 是否被动，指的是被用到时才new
 * @param {*} arg new时带的参数
 */
export declare function InstanceTool(name?: string, passive?: boolean, ...arg: []): (_class: {
    new (): any;
    [key: string]: any;
    [key: number]: any;
    [key: symbol]: any;
}) => void;
//# sourceMappingURL=InstanceTool.d.ts.map