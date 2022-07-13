import { URLT } from "./URLT";

/**
 * URL工具
 */
export class URLTool {
    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    static addQuery(_url: string, _query: Record<string, string> = {}): string {
        if (!_url) { return _url; }
        //先提取原_url参数
        let urlStructure = _url.split('?');
        let __url = urlStructure[0];
        let __query = new URLSearchParams(urlStructure[1] || '');
        for (let i in _query) {
            __query.set(i, _query[i]);
        }
        return `${__url}?${__query.toString()}`;
    }

    /**
     * 获取查询参数
     */
    static getQuery(url: string): Record<string, string> {
        let q = new URLSearchParams(url.split('?')[1] || '');
        let d = {};
        q.forEach((value: string, key: string) => {
            d[key] = value;
        });
        return d;
    }

    /**
     * 拼接URL
     * @param arg 
     */
    static joinURL(...arg: string[]): string {
        let urls = arg.map(_ => new URLT(_));
        let oneUrl = urls.splice(0, 1)[0];
        return urls.reduce((a, b) => {
            a.addPath(b.path);
            return a;
        }, oneUrl).href;
    }
}