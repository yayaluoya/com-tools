/**
 * 对象工具类
 */
export class ObjectUtils {
    /**
     * 获取一个对象的属性
     * @param obj
     * @param key 目标属性，可以是方法，正则表达式，其它的采用==号匹配
     */
    static getPro(obj: object, key: string | number | { (i: string): boolean } | RegExp): any {
        if (typeof obj != 'object') { return; }
        let is;
        for (let i in obj) {
            is = false;
            switch (true) {
                case typeof key == 'function':
                    is = (key as Function)(i);
                    break;
                case key instanceof RegExp:
                    is = (key as RegExp).test(i);
                    break;
                default:
                    is = i == key;
                    break;
            }
            //
            if (is) {
                return obj[i];
            }
        }
    }

    /**
     * 克隆一个对象
     * 采用序列化和反序列化的方式，function不会被克隆
     * @param _O 该对象
     */
    public static clone<T>(_data: T): T {
        return JSON.parse(JSON.stringify(_data)) as T;
    }

    /**
     * 克隆一个对象
     * 递归克隆
     */
    static clone_(data) {
        if (typeof data == 'object' && data) {
            if (Array.isArray(data)) {
                return data.reduce((a, b) => {
                    a.push(this.clone_(b));
                    return a;
                }, []);
            }
            let _data = {};
            for (let i in data) {
                _data[i] = this.clone_(data[i]);
            }
            return _data;
        }
        return data;
    }

    /**
     * 属性提取
     * @param {*} obj 
     * @param {*} props 
     */
    static propGet(obj, props) {
        if (!Array.isArray(props)) {
            props = [props];
        }
        let o = {};
        for (let key of props) {
            o[key] = obj[key];
        }
        return o;
    }

    /**
     * 在a对象上合并b对象的值
     * 类型以b对象上的为准
     * @param a 
     * @param bs
     */
    static merge<T>(a: T, ...bs: T[]): T {
        for (let b of bs) {
            for (let i in b) {
                if (Array.isArray(a[i])) {
                    ObjectUtils.merge(a[i], b[i] || []);
                    continue;
                }
                if (a[i] && typeof a[i] == 'object') {
                    ObjectUtils.merge(a[i], b[i] || {});
                    continue;
                }
                //
                a[i] = b[i];
            }
        }
        return a;
    }
}