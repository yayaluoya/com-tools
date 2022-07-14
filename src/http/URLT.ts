/**
 * URL工具
 */
export class URLT {
    url: URL;
    /** 是否没有源 */
    private ifNoOrigin: boolean = false;

    /** 获取源 */
    get origin() {
        if (this.ifNoOrigin) { return ''; }
        return this.url.origin;
    }
    /** 完整路径 */
    get href() {
        if (this.ifNoOrigin) {
            // 完整的路径为路径+查询参数+hash
            return `${this.path}${this.url.search}${this.url.hash}`;
        }
        return this.url.href;
    }
    /** 路径 */
    set path(path: string) {
        this.url.pathname = path.replace(/\/{2,}/g, '/');
    }
    get path(): string {
        return this.url.pathname;
    }

    /** 查询参数 */
    get query(): Record<string, any> {
        let d = {};
        this.url.searchParams.forEach((value: string, key: string) => {
            d[key] = value;
        });
        return d;
    }

    /**
     * 拼接路径路径
     * @param paths
     */
    join(...paths: string[]): this {
        for (let path of paths) {
            this.path = `${this.path}/${path}`;
        }
        return this;
    }

    /**
     * 添加查询参数
     * @param query 
     * @returns 
     */
    addQuery(query: Record<string, string> = {}): this {
        for (let i in query) {
            this.url.searchParams.set(i, query[i]);
        }
        return this;
    }

    constructor(path: string, origin?: string) {
        // 如果没加域的话自动加上域，不然会报错
        if (!/^(https?|ws):\/\//.test(path) && !origin) {
            origin = 'http://localhost/';
            this.ifNoOrigin = true;
        }
        this.url = new URL(path, origin);
        //统一处理下
        this.path = this.path;
    }

    /**
     * 添加查询参数
     * @param url 原url
     * @param _query 查询参数
     */
    static addQuery(url: string, query: Record<string, string> = {}): string {
        return new URLT(url).addQuery(query).href;
    }

    /**
     * 获取查询参数
     */
    static getQuery(url: string): Record<string, string> {
        return new URLT(url).query;
    }

    /**
     * 拼接url
     * @param arg 
     */
    static join(...arg: string[]): string {
        let urls = arg.map(_ => new URLT(_));
        let oneUrl = urls.splice(0, 1)[0];
        return urls.reduce((a, b) => {
            a.join(b.path);
            return a;
        }, oneUrl).href;
    }
}