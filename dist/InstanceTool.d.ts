/**
 * 单例装饰器
 * @param {*} name 单例字段名称
 */
export declare function InstanceTool(name?: string): (_class: {
    new (): any;
    [key: string]: any;
    [key: number]: any;
    [key: symbol]: any;
}) => void;
//# sourceMappingURL=InstanceTool.d.ts.map