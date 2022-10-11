import OSS, { STSOptions } from "ali-oss";
/**
 * 凭证管理
 */
export declare class CredentialsT {
    op: STSOptions;
    sts: OSS.STS;
    constructor(op: STSOptions);
    /**
     * 获取临时访问凭证
     * @returns
     */
    getSts(roleArn: string): Promise<OSS.Credentials>;
}
//# sourceMappingURL=CredentialsT.d.ts.map