/**
 * 对象工具
 */
export class ObjectTool {
    /**
     * 获取某个对象的可枚举属性值
     * @param {*} obj 该对象
     * @param {*} key 键名，可以是正则或者函数
     */
    static getObjectPro(obj: Object, key: string | { (i: string): boolean } | RegExp) {
        let is;
        for (let i in obj) {
            is = false;
            switch (true) {
                case typeof key == 'string':
                    is = i == key;
                    break;
                case typeof key == 'function':
                    is = (key as Function)(i);
                    break;
                case key instanceof RegExp:
                    is = (key as RegExp).test(i);
                    break;
            }
            //
            if (is) {
                return obj[i];
            }
        }
    }
}