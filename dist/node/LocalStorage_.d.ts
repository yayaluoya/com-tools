/**
 * 本地数操作工具
 * 仿前端接口的一个同步文件数据管理工具
 */
export declare class LocalStorage_ {
    /**
     * 获取数据存储路径
     * TODO 需要重写
     */
    protected static get getPath(): string;
    /** 获取数据存储路径 */
    private static getDataPath;
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
