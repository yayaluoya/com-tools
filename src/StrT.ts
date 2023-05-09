/**
 * 字符串工具
 */
export class StrT {
    /**
     * 省略
     * @param s
     * @param n
     */
    static omit(s: string, n: number): string {
        if (s.length > n) {
            return s.slice(0, n) + '...';
        }
        return s;
    }
}
