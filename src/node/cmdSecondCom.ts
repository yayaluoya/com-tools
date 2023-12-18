import chalk from 'chalk';
import readline from 'readline';

/**
 * readline 简介
 * readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。
 * readline 模块提供了用于从可读流（例如 process.stdin）每次一行地读取数据的接口。
 * 可以用它来模拟命令行，非常方便
 */

/**
 * 命令行二次确定
 */
export function cmdSecondCom(title) {
  return new Promise<string>((r, e) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    //
    rl.question(chalk.cyan(title), (input) => {
      rl.close();
      r(input);
    });
  });
}
