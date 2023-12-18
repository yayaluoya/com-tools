import OSS, { STSOptions } from 'ali-oss';

/**
 * 凭证管理
 */
export class CredentialsT {
  op: STSOptions;
  sts: OSS.STS;

  constructor(op: STSOptions) {
    this.op = op;
    this.sts = new OSS.STS(op);
  }

  /**
   * 获取临时访问凭证
   * @returns
   */
  getSts(roleArn: string) {
    return this.sts.assumeRole(roleArn).then((result) => {
      return result.credentials;
    });
  }
}
