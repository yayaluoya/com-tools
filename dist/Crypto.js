"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
var CryptoJS = __importStar(require("crypto-js"));
/**
 * 加解密工具
 */
var Crypto = /** @class */ (function () {
    /**
     * 实例化
     */
    function Crypto(key, iv) {
        this.key = key;
        this.iv = iv;
    }
    /**
     * md5
     * @param _str 字符串
     */
    Crypto.prototype.md5 = function (_str) {
        var srcs = CryptoJS.enc.Utf8.parse(_str);
        return CryptoJS.MD5(srcs).toString();
    };
    /**
     * 加密数据
     * @param _str 原字符串
     */
    Crypto.prototype.encryptionData = function (_str) {
        var srcs = CryptoJS.enc.Utf8.parse(_str);
        var key = CryptoJS.enc.Utf8.parse(this.key);
        var iv = CryptoJS.enc.Utf8.parse(this.iv);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        //转成hex格式的
        return encrypted.ciphertext.toString();
    };
    /**
     * 解密数据
     * @param _str 原字符串
     */
    Crypto.prototype.decryptionData = function (_str) {
        var encryptedHexStr = CryptoJS.enc.Hex.parse(_str);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var key = CryptoJS.enc.Utf8.parse(this.key);
        var iv = CryptoJS.enc.Utf8.parse(this.iv);
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    };
    return Crypto;
}());
exports.Crypto = Crypto;
