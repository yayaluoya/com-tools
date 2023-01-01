import OSS from "ali-oss";
import { ResData } from "../../http/ResData";

/**
 * 阿里云oss工具
 */
export class AliOSST {
    client: OSS;
    op: OSS.Options;

    constructor(op: OSS.Options) {
        this.client = new OSS(op);
        this.op = op;
    }

    /**
     * 上传文件
     * TODO 默认缓存一年
     * @param file 目标文件
     * @param _url 文件地址
     * @returns 
     */
    updateFile(file: File, _url: string, headers?: Record<string, string>) {
        return this.client.put(_url, file, {
            headers: {
                //设置一年的缓存
                "Cache-Control": "max-age=31536000",
                ...headers,
            },
        }).then(() => {
            return `//${this.op.bucket}.${this.op.region}.aliyuncs.com/${_url.replace(/^\/*/, '')}`;
        }).catch((e) => {
            console.error('ali-oss上传文件失败', e);
            throw new ResData().fail('上传文件失败');
        });
    }

    /**
     * 分片上传文件
     * @param file 
     * @param _url 
     * @param headers 
     */
    sliceUpdateFile(file: File, _url: string, partSize: number, progress?: (...args: any[]) => any, headers?: Record<string, string>) {
        return this.client.multipartUpload(_url, file, {
            partSize,
            headers,
            progress,
        }).then(() => {
            return `//${this.op.bucket}.${this.op.region}.aliyuncs.com/${_url.replace(/^\/*/, '')}`;
        }).catch((e) => {
            console.error('ali-oss上传文件失败', e);
            throw new ResData().fail('上传文件失败');
        });
    }
}