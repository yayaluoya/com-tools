/**
 * 分页对象
 */
export declare class Pagination {
    /** 总数 */
    total: number;
    /** 当前页面 */
    currentPage: number;
    /** 分页大小 */
    pageSize: number;
    /** 可变分页大小 */
    pageSizes: number[];
    /** 是否是最后一页 */
    get lastPage(): boolean;
    /** 最大页 */
    get maxPage(): number;
    constructor(number?: number, numbers?: number[]);
    /**
     * 分页递增
     * @param n
     */
    add(n?: number): void;
    /**
     * 获取分页op，主要是调接口时用的到
     * TODO 根据后端习惯重写此接口
     * @param query
     * @returns
     */
    getPageOp(query?: {}): {
        pageSize: number;
        currentPage: number;
    };
    /**
     * 获取序号
     * @param {*} index 索引 从0开始的这个
     * @param {*} pagination 当前页面的分页信息
     */
    static getIndex(index: number, pagination: Pagination): number;
}
//# sourceMappingURL=Pagination.d.ts.map