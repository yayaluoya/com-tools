import { SpawnOptionsWithoutStdio, spawn } from 'child_process';

/**
 * 执行cmd命令并返回标准输出
 * @param cmd 命令内容
 * @param op cmd执行选项
 * @returns utf-8的命令行标准输出
 */
export function cmd(cmd: string, op: Partial<SpawnOptionsWithoutStdio> = {}) {
  return new Promise((res, rej) => {
    let childP = spawn(cmd, {
      cwd: process.cwd(),
      shell: true,
      ...op,
    });
    childP.stderr.on('data', (err) => {
      rej(err);
    });
    let data = '';
    childP.stdout
      .setEncoding('utf-8')
      .on('data', (d) => {
        data += d;
      })
      .on('end', () => {
        res(data);
      });
  });
}
