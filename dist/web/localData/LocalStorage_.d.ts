/**
 * 封装后的本地数据类
 * 将把会数据以json的格式保存
 */
export declare class LocalStorage_ {
    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    static setItem(key: string, value: any, _f?: (s: string) => string): void;
    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    static getItem<D = any>(key: string, _f?: (s: string) => string): D | null;
    /**
     * 删除数据
     * @param key 名字
     */
    static removeItem(key: string): void;
    /**
     * 清理本地的全部数据
     */
    static clear(): void;
}
//# sourceMappingURL=LocalStorage_.d.ts.map