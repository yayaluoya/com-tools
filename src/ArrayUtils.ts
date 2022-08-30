import { ObjectUtils } from "./obj/ObjectUtils";

/**
 * 数组工具
 */
export class ArrayUtils {
    /**
    * 填充指定数量的数据
    * @param {*} d 
    * @param {*} length 
    */
    static fill<T>(d: T, length: number = 0): T[] {
        return Array.from({
            length,
        }).map(() => {
            return ObjectUtils.clone_(d);
        });
    }

    /**
     * 获取数组的某个元素
     * @param array 
     * @param _n 索引，可以是负数
     */
    public static at<T = any>(array: T[], _n: number): T {
        if (array.at) {
            return array.at(_n);
        }
        // console.log(_n);
        if (_n >= 0) {
            return array[_n];
        } else {
            return array[array.length + _n];
        }
    }

    /**
     * 判断两个数组内容是否相同
     * @param x x数组
     * @param y y数组
     */
    public static same(x: any[], y: any[]): boolean {
        if (!(x) || !(y)) return false;
        if (x.length != y.length) return false;
        //方法： 用一个mop来统计x数组各个元素出现的次数，再用y数组来递减各元素出现的次数，如果最终结果为0则两个数组相同
        let m: Map<any, number> = new Map();
        x.forEach((item) => {
            m.set(item, (m.has(item) ? m.get(item) : 0) + 1);
        });
        y.forEach((item) => {
            m.set(item, (m.has(item) ? m.get(item) : 0) - 1);
        });
        //只要其中一元素的统计不为0就返回false
        let b = true;
        for (let [_, _number] of m) {
            if (_number != 0) {
                b = false;
                break;
            }
        }
        return b;
    }

    /**
     * 数组是否包含某个数据
     * @param arr 
     * @param op 
     */
    public static has<T>(arr: T[], op: T | { (_: T): boolean }): boolean {
        let index = -1;
        if (typeof op == 'function') {
            index = arr.findIndex((_) => (op as Function)(_));
        } else {
            index = arr.indexOf(op);
        }
        return index >= 0;
    }

    /**
     * 随机打乱数组
     * @param _array 目标数组 
     */
    public static upset<T>(_array: T[]): T[] {
        //乱序
        return _array.sort(() => {
            return Math.random() - 0.5;
        });
    }

    /**
     * 随机获取数组中的随机值，可指定长度
     * @param _array 原数组
     * @param _n 随机个数
     * @param _weight 权重列表
     */
    public static random<T>(_array: T[], _n = 1, _weight: number[] = _array.map((item) => { return 1; })): T[] {
        if (_array.length <= 0 || _array.length < _n) { return; }
        let _newArray: T[] = [];
        let _minWeight: number = Math.min(..._weight, 1);
        _weight = _weight.map((item) => {
            return Math.round((item ?? 0) / _minWeight);
        });
        let _indexArray: number[] = _array.map((_, index) => {
            return ArrayUtils.fill(index, _weight[index]);
        }).reduce((a, b) => {
            a.push(...b);
            return a;
        }, []);
        let _index: number;
        for (let _i = 0; _i < _n; _i++) {
            if (_indexArray.length <= 0) {
                console.log(_indexArray);
                break;
            }
            _index = Math.round(Math.random() * (_indexArray.length - 1));
            _newArray.push(_array[_indexArray[_index]]);
            _indexArray = _indexArray.filter((item) => {
                return item != _index;
            });
        }
        //
        return _newArray;
    }

    /**
     * 剔除掉数组指定内容
     * @param {*} array 原数组
     * @param {*} v 验证方式 可以是方法和正则，如果都不是的话采用==来验证，这些条件都可以是数组
     */
    static eliminate<T = any>(array: Array<T>, v: (RegExp | { (_: T, i: number): boolean } | T) | Array<RegExp | { (_: T, i: number): boolean } | T>) {
        if (!Array.isArray(v)) {
            v = [v];
        }
        v.forEach((v) => {
            let _if = true;
            //循环删除查找到的满足条件的元素，直到找不到为止
            while (_if) {
                let index;
                switch (true) {
                    case typeof v == 'function':
                        index = array.findIndex(v as any);
                        break;
                    case v instanceof RegExp:
                        index = array.findIndex(_ => (v as RegExp).test(_ as any));
                        break;
                    default:
                        index = array.findIndex(_ => _ == v);
                        break;

                }
                if (index == -1) {
                    _if = false;
                } else {
                    array.splice(index, 1);
                }
            }
        });
        return array;
    }

    /**
     * 数组化
     * @param target 
     * @returns 
     */
    static arraify<T>(target: T | T[]): T[] {
        return Array.isArray(target) ? target : [target]
    }
}