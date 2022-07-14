/**
 * URL工具
 */
export declare class URLT {
    url: URL;
    /** 是否没有源 */
    private ifNoOrigin;
    /** 获取源 */
    get origin(): string;
    /** 完整路径 */
    get href(): string;
    /** 路径 */
    set path(path: string);
    get path(): string;
    /** 查询参数 */
    get query(): Record<string, any>;
    /**
     * 拼接路径路径
     * @param paths
     */
    join(...paths: string[]): this;
    /**
     * 添加查询参数
     * @param query
     * @returns
     */
    addQuery(query?: Record<string, string>): this;
    constructor(path: string, origin?: string);
    /**
     * 添加查询参数
     * @param url 原url
     * @param _query 查询参数
     */
    static addQuery(url: string, query?: Record<string, string>): string;
    /**
     * 获取查询参数
     */
    static getQuery(url: string): Record<string, string>;
    /**
     * 拼接url
     * @param arg
     */
    static join(...arg: string[]): string;
}
//# sourceMappingURL=URLT.d.ts.map