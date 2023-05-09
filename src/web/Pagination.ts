/**
 * 分页对象
 */
export class Pagination {
    /** 总数 */
    total = 0;
    /** 当前页面 */
    currentPage = 1;
    /** 分页大小 */
    pageSize = 0;
    /** 可变分页大小 */
    pageSizes: number[] = [];

    /** 是否是最后一页 */
    get lastPage() {
        return this.total <= this.currentPage * this.pageSize;
    }

    /** 最大页 */
    get maxPage() {
        return Math.ceil(this.total / this.pageSize);
    }

    constructor(number = 10, numbers: number[] = []) {
        this.pageSize = number;
        this.pageSizes = numbers;
    }

    /**
     * 分页递增
     * @param n
     */
    add(n = 1) {
        n = this.currentPage + n;
        this.currentPage = Math.min(Math.max(0, n), this.maxPage);
    }

    /**
     * 获取分页op，主要是调接口时用的到
     * TODO 根据后端习惯重写此接口
     * @param query
     * @returns
     */
    getPageOp(query = {}): any {
        return {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            ...query,
        };
    }

    /**
     * 获取序号
     * @param {*} index 索引
     */
    getIndex(index: number) {
        return index + 1 + (this.currentPage - 1) * this.pageSize;
    }
}
