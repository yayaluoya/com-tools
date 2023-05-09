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
export function getCmdOp<OP extends IOp = IOp>(hand: (pro: Command) => void): OP {
    const program = new Command();
    program.option('-v --version');
    hand && hand(program);
    program.parse(process.argv);
    return program.opts<OP>();
}
