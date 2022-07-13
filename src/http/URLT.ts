/**
 * url 工具
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
        if (this.ifNoOrigin) { return this.path; }
        return this.url.href;
    }
    /** 路径 */
    set path(path: string) {
        this.url.pathname = path.replace(/\/{2,}/g, '/');
    }
    get path(): string {
        return this.url.pathname;
    }

    /**
     * 添加路径
     * @param path 
     */
    addPath(path: string) {
        this.path = `${this.path}/${path}`;
    }

    constructor(path: string, origin?: string) {
        if (!/^(https?|ws):\/\//.test(path) && !origin) {
            origin = 'http://localhost/';
            this.ifNoOrigin = true;
        }
        this.url = new URL(path, origin);
        //统一处理下
        this.path = this.path;
    }
}