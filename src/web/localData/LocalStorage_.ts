/**
 * 封装后的本地数据类
 * 将把会数据以json的格式保存
 */
export class LocalStorage_ {
    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    static setItem(key: string, value: any, _f?: (s: string) => string) {
        //直接保存为json数据
        localStorage.setItem(key, _f ? _f(JSON.stringify(value)) : JSON.stringify(value));
    }

    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    static getItem<D = any>(key: string, _f?: (s: string) => string): D | null {
        try {
            return JSON.parse(_f ? _f(localStorage.getItem(key)!) : localStorage.getItem(key)!);
        } catch {
            //如果有异常就直接删除这条数据并返回null
            this.removeItem(key);
            return null;
        }
    }

    /**
     * 删除数据
     * @param key 名字
     */
    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * 清理本地的全部数据
     */
    static clear() {
        localStorage.clear();
    }
}
