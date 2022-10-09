import { Command } from 'commander';
/**
 * 命令行选项
 */
export interface IOp {
    /** 查看版本 */
    version: boolean;
}
/**
 * 获取命令行选项
 */
export declare function getCmdOp<OP extends IOp = IOp>(hand: (pro: Command) => void): OP;
//# sourceMappingURL=getCmdOp.d.ts.map