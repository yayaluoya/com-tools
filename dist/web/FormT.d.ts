declare type vf = {
    /** 验证方法 */
    vf: () => string;
    /** 子字段验证方法 */
    child: Record<string, vf>;
};
/**
 * 表单工具
 */
export declare class FormT {
    /**
     * 字段验证
     * @param {*} ctx 原数据
     * @param {*} V 验证规则
     */
    static FV(ctx: any, vs: Record<string, vf>, _this?: any): boolean;
}
export {};
//# sourceMappingURL=FormT.d.ts.map