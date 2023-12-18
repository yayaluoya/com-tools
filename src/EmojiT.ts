/**
 * 表情相关工具
 */
export class EmojiT {
  /**
   * 表情转码
   * @param str
   * @returns
   */
  static utf16toEntities(str: string) {
    const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, (char) => {
      let H;
      let L;
      let code;
      let s;

      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位
        L = char.charCodeAt(1); // 取出低位
        code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
        s = `&#${code};`;
      } else {
        s = char;
      }

      return s;
    });

    return str;
  }

  /**
   * 表情解码
   * @param strObj
   * @returns
   */
  static entitiestoUtf16(strObj: string) {
    const patt = /&#\d+;/g;
    const arr = strObj.match(patt) || [];

    let H;
    let L;
    let code: any;

    for (let i = 0; i < arr.length; i += 1) {
      code = arr[i];
      code = code.replace('&#', '').replace(';', '');
      // 高位
      H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
      // 低位
      L = ((code - 0x10000) % 0x400) + 0xdc00;
      code = `&#${code};`;
      const s = String.fromCharCode(H, L);
      strObj = strObj.replace(code, s);
    }
    return strObj;
  }
}
