import path from 'path';
import fs from 'fs';

/**
 * 递归往上层查找文件
 * @param dir
 * @param formats 这个参数是格式的意思比如 ['a.ts','a.d.ts','a.js']
 * @param pathOnly
 * @returns
 */
export function lookupFile(
  dir: string,
  formats: string[],
  pathOnly = false,
): string | undefined {
  for (const format of formats) {
    const fullPath = path.join(dir, format);
    //如果存在这个路径并且它是个文件的话
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      //如果只返回路径的话就返回全路径，否则返回文件值
      return pathOnly ? fullPath : fs.readFileSync(fullPath, 'utf-8');
    }
  }
  // 递归往上层查找
  const parentDir = path.dirname(dir);
  if (parentDir !== dir) {
    return lookupFile(parentDir, formats, pathOnly);
  }
}
