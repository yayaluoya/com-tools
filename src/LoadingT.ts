import { ArrayUtils } from './ArrayUtils';

/**
 * loading工具
 */
export class LoadingT {
    /** 加载列表 */
    private loadingList: any[] = [];

    /**
     * 清空
     */
    clean() {
        this.loadingList.length = 0;
    }

    /** 是否loading */
    get loading() {
        return this.loadingList.length > 0;
    }

    /**
     * 设置loading
     * @param {*} state 状态
     * @param {*} key key
     */
    set(state: boolean, ...key: any[]) {
        if (state) {
            this.loadingList.push(key);
        } else {
            ArrayUtils.eliminate(this.loadingList, (_) => ArrayUtils.same(_, key));
        }
    }

    /**
     * 设置加载
     */
    setLoading(...key: any[]) {
        this.set(true, ...key);
    }

    /**
     * 设置加载完成
     */
    setLoadComplete(...key: any[]) {
        this.set(false, ...key);
    }

    /**
     * 获取是否loading
     * @param  {*} key
     */
    get(...key: any[]) {
        return this.loadingList.some((_) => ArrayUtils.same(_, key));
    }
}
