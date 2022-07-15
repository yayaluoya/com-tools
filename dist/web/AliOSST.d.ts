import OSS from "ali-oss";
/**
 * 阿里云oss工具
 */
export declare class AliOSST {
    client: OSS;
    op: OSS.Options;
    constructor(op: OSS.Options);
    /**
     * 上传文件
     * @param file 目标文件
     * @param _url 文件地址
     * @returns
     */
    updateFile(file: File, _url: string, headers?: Record<string, string>): Promise<string>;
    /**
     * 分片上传文件
     * @param file
     * @param _url
     * @param headers
     */
    sliceUpdateFile(file: File, _url: string, partSize: number, progress?: (...args: any[]) => any, headers?: Record<string, string>): Promise<string>;
}
//# sourceMappingURL=AliOSST.d.ts.map