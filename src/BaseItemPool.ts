/**
 * 基类对象池
 * TODO 池子里的内容遵循先进先出的原则
 */
export class BaseItemPool<D extends Record<string, any> = Record<string, any>> {
    /** 池子 */
    private _itemPool: {
        [K in keyof D]?: D[K][];
    } = {};

    /** 对象池 */
    protected get itemPool() {
        return this._itemPool;
    }

    /**
     * 是否有内容
     * @param _key key
     */
    public has(_key: keyof D): boolean {
        return (this._itemPool[_key]?.length || 0) > 0;
    }

    /**
     * 获取内容
     * @param _key key
     */
    public get<K extends keyof D>(_key: K): D[K] | null {
        return this._itemPool[_key]?.shift() || null;
    }

    /**
     * 添加对象进对象池
     * @param _key key
     * @param _item 对象
     */
    public add<K extends keyof D>(_key: K, _item: D[K]): this {
        if (!this._itemPool[_key]) {
            this._itemPool[_key] = [];
        }
        this._itemPool[_key].push(_item);
        return this;
    }

    /**
     * 清空对象池
     */
    public clean(key?: keyof D): this {
        if (key) {
            this._itemPool[key] = [];
        } else {
            for (let i in this._itemPool) {
                this._itemPool[i] = [];
            }
        }
        return this;
    }
}
