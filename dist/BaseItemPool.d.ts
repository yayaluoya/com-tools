/**
 * 基类对象池
 */
export default class BaseItemPool {
    /** 池子 */
    private m_itemPool;
    /** 获取对象池 */
    protected get itemPool(): {
        [_key: string]: any[];
    };
    /**
     * 对象池是否有内容
     * @param _key key
     */
    poolHasItem(_key: string): boolean;
    /**
     * 从对象池中获取对象
     * @param _key key
     */
    getItemByPool<T extends object>(_key: string): T | null;
    /**
     * 添加对象进对象池
     * @param _key key
     * @param _item 对象
     */
    addItemToPool(_key: string, _item: object): void;
    /**
     * 清空对象池
     */
    emptyPool(): void;
}
