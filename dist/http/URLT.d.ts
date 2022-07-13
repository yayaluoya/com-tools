/**
 * url 工具
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
    /**
     * 添加路径
     * @param path
     */
    addPath(path: string): void;
    constructor(path: string, origin?: string);
}
//# sourceMappingURL=URLT.d.ts.map