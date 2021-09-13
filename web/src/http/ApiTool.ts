import { ApiConfig } from "./ApiConfig";

const pathArgsReg = /\{.*?\}/g;

/**
 * Api工具
 */
export class ApiTool {
    /**
     * 获取api
     * @param {*} domainName 域
     * @param {*} keyWorlds 
     * @param  {...any} args 参数 
     */
    static getApi(domainName: string, keyWorlds: string, ...args: string[]): string {
        let domainPath = ApiConfig.domainPath[domainName];
        if (!domainPath) {
            console.error('没有找到api域', domainName);
            return;
        }
        domainPath = domainPath.replace(/\/+$/, '');

        let url: string = ApiConfig.apiPath as any;
        for (let _o of keyWorlds.split('.')) {
            url = url[_o];
            //
            if (typeof url == 'undefined' || url == null) {
                console.error('找不到api层级', _o);
                return domainPath;
            }
        }

        if (url && typeof url == 'string') {
            url = url.replace(/^\//, '').replace(/\/+/g, '/');
            for (let i = 0; i < args.length; i++) {
                url = url.replace(url.match(pathArgsReg)[i], args[i]);
            }
            //组合路径
            return `${domainPath}/${url}`;
        } else {
            console.error(`没有找到 ${keyWorlds} 配置的api`);
            //
            return domainPath;
        }
    }
}