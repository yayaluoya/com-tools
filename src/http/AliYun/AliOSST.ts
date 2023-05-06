import OSS from "ali-oss";

/**
 * 阿里云oss工具
 */
export class AliOSST extends OSS {
    /** 配置信息 */
    op: OSS.Options;

    constructor(op: OSS.Options) {
        super(op);
        this.op = op;
    }

    /**
     * 上传文件并直接获取地址
     * TODO 该地址不包含协议
     * @param url 文件地址
     * @param file 目标文件
     * @param op
     * @returns
     */
    updateFile(url: string, file: any, op?: OSS.PutObjectOptions) {
        return this.put(url, file, op).then((res) => {
            return this.generateObjectUrl(res.name).replace(/^https?:/, '');
        });
    }

    /**
     * 分片上传文件并直接获取地址
     * TODO 该地址不包含协议
     * @param url
     * @param file
     * @param op
     */
    sliceUpdateFile(url: string, file: any, op: OSS.MultipartUploadOptions) {
        return this.multipartUpload(url, file, op).then((res) => {
            return this.generateObjectUrl(res.name).replace(/^https?:/, '');
        });
    }
}