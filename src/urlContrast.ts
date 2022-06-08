import { getComPath } from "./getComPath";

/**
 * 路径对比
 */
export function urlContrast(a: string, b: string): boolean {
    //先转成通用的路径
    a = getComPath(a);
    b = getComPath(b);
    //先用==对比一下，提高性能
    return a == b
        //
        || new RegExp(`^/?${(a || '').replace(/^\/+|\/+$/g, '')}/?$`).test(b);
}