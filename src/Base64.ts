import { encode, decode, encodeURL } from 'js-base64';

/**
 * Base64 工具
 */
export class Base64 {
  /**
   * 将utf-8编码的字符串转换为Base64字符串。
   * @param src
   * @param urlsafe 如果 true 则结果是url安全的
   */
  static encode(src: string, urlsafe?: boolean): string {
    return encode(src, urlsafe);
  }

  /**
   * 将utf-8编码的字符串转换为url安全的Base64 RFC4648 §5.
   */
  static encodeURL(src: string): string {
    return encodeURL(src);
  }

  /**
   * 将Base64字符串转换为UTF-8字符串。
   * @param {String} src Base64字符串。支持普通和url安全
   */
  static decode(src: string): string {
    return decode(src);
  }
}
