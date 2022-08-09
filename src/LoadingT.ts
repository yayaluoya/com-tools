import { ArrayUtils } from "./ArrayUtils";

/**
 * loading工具
 */
export class LoadingT {
    /** 私有属性 加载列表 */
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
            ArrayUtils.eliminate(this.loadingList, _ => ArrayUtils.same(_, key));
        }
    }

    /**
     * 获取是否loading
     * @param  {*} key 
     */
    get(...key: any[]) {
        return this.loadingList.some(_ => ArrayUtils.same(_, key));
    }
}