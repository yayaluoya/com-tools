import { ArrayUtils } from "../ArrayUtils";

type ROKType = {
    /** 该对象键的key */
    key: string | symbol;
    /** 对象独有的key */
    objKey: symbol;
};

/**
 * 代理对象监听
 * TODO 由createProxyObj模块驱动
 */
export class ProxyObjWatch {
    /** 依赖列表 */
    protected static relyOnList: ROKType[][] = [];
    /** 监听依赖列表 */
    protected static watchRNList: {
        keys: ROKType[];
        f: Function;
    }[] = [];

    /**
     * 触发依赖
     * TODO 由createProxyObj模块驱动
     * @param key  
     */
    static set(key: ROKType) {
        ProxyObjWatch.watchRNList.forEach((item) => {
            if (ArrayUtils.has(item.keys, _ => _.objKey == key.objKey && _.key == key.key)) {
                //TODO 这里不直接执行，而是执行并重新收集依赖
                ProxyObjWatch.autoF(item.f);
            }
        });
    }
    /**
     * 依赖收集
     * TODO 由createProxyObj模块驱动
     * @param key 
     */
    static get(key: ROKType) {
        //收集依赖
        if (ProxyObjWatch.relyOnList.length > 0) {
            ArrayUtils.at(ProxyObjWatch.relyOnList, -1).push(key);
        }
    }

    /**
     * 收集依赖
     * @param f 
     */
    static collect(f: Function): ROKType[] {
        let list: ROKType[] = [];
        ProxyObjWatch.relyOnList.push(list);
        try {
            f();
        } catch (e) {
            console.error('获取依赖方法执行错误');
            list.length = 0;
        }
        if (list !== ProxyObjWatch.relyOnList.pop()) {
            console.error('收集到的依赖有偏差');
        }
        return list;
    }

    /**
     * 删除某个依赖方法
     * @param f
     */
    static remove(f: Function): boolean {
        let length = ProxyObjWatch.watchRNList.length;
        ArrayUtils.eliminate(ProxyObjWatch.watchRNList, _ => _.f === f);
        return ProxyObjWatch.watchRNList.length != length;
    }

    /**
     * 自动执行某个带有依赖的方法
     * @param f 
     * @param getROF 
     */
    static autoF(f: Function, getROF?: Function) {
        let _ROF = getROF || f;
        //先删除之前的依赖
        ProxyObjWatch.remove(f);
        let ROs = ProxyObjWatch.collect(_ROF);
        ProxyObjWatch.watchRNList.push({
            keys: ROs,
            f,
        });
    }

    /**
     * 自动执行一次某个带有依赖的方法
     * @param f 
     * @param getROF 
     */
    static autoOneF(f: Function, getROF?: Function) {
        ProxyObjWatch.autoF(f, getROF);
        ProxyObjWatch.remove(f);
    }
}
