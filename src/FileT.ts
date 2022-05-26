/**
 * 文件处理工具
 */
export class FileT {
    /**
     * 下载文件
     * @param {*} url 地址
     * @param {*} name 文件名字
     */
    static download(url: string, name: string) {
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}