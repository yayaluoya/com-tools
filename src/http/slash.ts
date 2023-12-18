/**
 * 把路径分隔符转成斜线
 * @param p
 * @returns
 */
export function slash(p: string): string {
  return p.replace(/\\+/g, '/');
}
