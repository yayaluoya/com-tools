type vf = {
    /** 验证方法 */
    vf: () => string;
    /** 子字段验证方法 */
    child: Record<string, vf>;
}
/**
 * 表单工具
 */
export class FormT {
    /**
     * 字段验证
     * @param {*} ctx 原数据
     * @param {*} V 验证规则
     */
    static FV(ctx: any, vs: Record<string, vf>, _this?: any) {
        //如果没有验证数据或者规则直接返回验证成功
        if (!ctx || typeof ctx != 'object' || !vs) { return true; }
        //判断原数据是否是可迭代对象
        if (!ctx[Symbol.iterator]) {
            ctx = [ctx];
        }
        for (let o of ctx) {
            for (let [key, v] of Object.entries(vs)) {
                let onCtx = o[key];
                let msg = v.vf?.call?.(_this, onCtx, v);
                if (msg) {
                    return false;
                }
                //验证子字段
                if (!FormT.FV(onCtx, v.child)) {
                    return false;
                }
            }
        }
        return true;
    }
}