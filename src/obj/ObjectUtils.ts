import { ArraifyT, ArrayUtils } from "../ArrayUtils";
import { isArray, isObject, isMap, isDate } from "../is";

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
     * TODO 注意对于其他内置对象是不处理的
     */
    static clone_<T>(data: T): T {
        if (isArray(data)) {
            return data.map(_ => {
                return ObjectUtils.clone_(_);
            }) as any;
        }
        if (isMap(data)) {
            return new Map(ObjectUtils.clone_([...data])) as any;
        }
        if (isObject(data)) {
            let _data: any = {};
            for (let i in data) {
                _data[i] = ObjectUtils.clone_(data[i]);
            }
            return _data;
        }
        if (isDate(data)) {
            return new Date(data) as any;
        }
        return data;
    }

    /**
     * 属性提取
     * @param {*} obj 
     * @param {*} props 
     */
    static propGet(obj, props: ArraifyT<string | [string, string | number | { (i: string): boolean } | RegExp]>) {
        props = ArrayUtils.arraify(props);
        let o = {};
        for (let key of props) {
            if (isArray(key)) {
                o[key[0]] = ObjectUtils.getPro(obj, key[1]);
            } else {
                o[key] = obj[key];
            }
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
                // 如果双方都是数组的话，直接合并
                if (isArray(a[i]) && isArray(b[i])) {
                    (a[i] as any) = [...(a[i] as any), ...(b[i] as any)];
                    continue;
                }
                // 如果双方都是对象的话则递归
                if (isObject(a[i]) && isObject(b[i])) {
                    ObjectUtils.merge(a[i], b[i]);
                    continue;
                }
                //
                a[i] = b[i];
            }
        }
        return a;
    }
}