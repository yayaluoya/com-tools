/**
 * URL工具
 */
export declare class URLTool {
    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    static addQuery(_url: string, _query?: Record<string, string>): string;
    /**
     * 获取查询参数
     */
    static getQuery(url: string): Record<string, string>;
    /**
     * 拼接URL
     * @param arg
     */
    static joinURL(...arg: string[]): string;
}
//# sourceMappingURL=URLTool.d.ts.map