/**
 * 平台工具
 */
export class PlatformT {
    /**
     * 获取平台凭证
     * @returns 
     */
    static userAgent() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android'
        } else if (isiOS) {
            return 'ios'
        } else {
            return 'pc';
        }
    }
}