/**
 * 平台工具
 */
export class PlatformT {
    /**
     * 获取平台凭证
     * @returns
     */
    static userAgent() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android';
        } else if (isiOS) {
            return 'ios';
        } else {
            return 'pc';
        }
    }
}
