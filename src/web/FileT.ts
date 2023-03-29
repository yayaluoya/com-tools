import { ArrayUtils } from "../ArrayUtils";

/**
 * 文件处理工具
 */
export class FileT {
    /**
     * 下载文件
     * @param {*} url 地址
     * @param {*} name 文件名字
     */
    static download(url: string, name?: string) {
        if (!name) {
            name = new URL(url).pathname.match(/[^/]+$/)?.[0] || '';
        }
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * 文件分片
     * @param file 文件
     * @param partSize 分片大小，单位为字节
     */
    static slice(file: File, partSize: number) {
        let fileParts: Blob[] = [];
        for (let i = 0; i <= Math.floor(file.size / partSize); i++) {
            fileParts.push(file.slice(
                i * partSize,
                Math.min(partSize * (i + 1), file.size)
            ));
        }
        return ArrayUtils.eliminate(fileParts, _ => _.size <= 0);
    }
}