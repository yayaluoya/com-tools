/**
 * 数组工具
 */
export default class ArrayUtils {
    /**
     * 获取数组的某个元素
     * @param array 
     * @param _n 索引，可以是负数
     */
    public static at<T = any>(array: T[], _n: number): T {
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
     * @param obj 
     */
    public static has<T>(arr: T[], obj: T): boolean {
        let index = arr.indexOf(obj);
        return index >= 0;
    }

    /**
     * 复制一个数组
     * @param arr 源数组
     */
    public static copy<T>(arr: T[]): T[] {
        let result = [];
        for (let i = 0; i < arr.length; ++i) {
            result.push(arr[i]);
        }
        return result;
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
        if (_array.length <= 0) { return; }
        let _rootArray: T[] = [];
        let _newArray: T[] = [];
        //权重索引列表
        let _indexArray: number[] = [];
        //找到最小的权重
        let _minWeight: number = _weight[0];
        _weight.forEach((item) => {
            _minWeight = Math.min(_minWeight, item);
        });
        _weight = _weight.map((item) => {
            return Math.floor(item * (1 / _minWeight));
        });
        _array.forEach((item, index) => {
            _rootArray.push(item);
            //
            for (let _i = 0; _i < _weight[index]; _i++) {
                _indexArray.push(index);
            }
        });
        let _index: number;
        for (let _i = 0; _i < _n; _i++) {
            if (_rootArray.length <= 0) { break; }
            _index = Math.floor(Math.random() * _indexArray.length);
            _indexArray = _indexArray.filter((item) => {
                return item != _index;
            });
            _newArray.push(_rootArray.splice(_indexArray[_index], 1)[0]);
        }
        //
        return _newArray;
    }

    /**
     * 剔除掉数组指定内容
     * @param {*} array 原数组
     * @param {*} v 验证方式 可以是方法和正则，如果都不是的话采用==来验证，这些条件都可以是数组
     */
    static eliminate(array, v) {
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
                        index = array.findIndex(v);
                        break;
                    case v instanceof RegExp:
                        index = array.findIndex(_ => v.test(_));
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
}