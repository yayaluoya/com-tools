/**
 * loading工具
 */
export declare class LoadingT {
    /** 私有属性 加载列表 */
    private loadingList;
    /**
     * 清空
     */
    clean(): void;
    /** 是否loading */
    get loading(): boolean;
    /**
     * 设置loading
     * @param {*} state 状态
     * @param {*} key key
     */
    set(state: boolean, ...key: any[]): void;
    /**
     * 获取是否loading
     * @param  {*} key
     */
    get(...key: any[]): boolean;
}
//# sourceMappingURL=LoadingT.d.ts.map