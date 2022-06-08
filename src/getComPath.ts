import path from "path";

/**
 * 获取通用的路径
 * 采用/作为路径分隔符
 * @param _path 
 */
export function getComPath(_path: string = ''): string {
    return path.normalize(_path).replace(/\\+/g, '/');
}