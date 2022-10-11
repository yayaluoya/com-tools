/**
 * 加解密工具
 */
export declare class Crypto {
    private key;
    private iv;
    /**
     * 实例化
     */
    constructor(key: string, iv: string);
    /**
     * md5
     * @param _str 字符串
     */
    md5(_str: string): string;
    /**
     * 加密数据
     * @param _str 原字符串
     */
    encryptionData(_str: string): string;
    /**
     * 解密数据
     * @param _str 原字符串
     */
    decryptionData(_str: string): string;
}
//# sourceMappingURL=Crypto.d.ts.map