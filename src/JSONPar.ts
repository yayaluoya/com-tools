/**
 * json解析
 * 如果解析出错了会返回默认值
 * @param str 
 */
export function JSONPar<T = any>(str: string, def?: T, reviver?: (this: any, key: string, value: any) => any): T {
    try {
        return JSON.parse(str, reviver);
    } catch {
        return def;
    }
}