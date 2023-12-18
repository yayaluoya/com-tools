/**
 * 剪切板工具
 */
export class Clipboard {
  /**
   * 设置一段字符串到剪切板
   * @param _str 需要复制的字符串
   */
  static set(_str: string): Promise<boolean> {
    return new Promise((r, e) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(_str)
          .then(() => {
            r(true);
          })
          .then(() => {
            r(false);
          });
      } else {
        try {
          let input = document.createElement('input');
          input.value = _str;
          document.body.append(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          r(true);
        } catch {
          r(false);
        }
      }
    });
  }

  /**
   * 从剪切板获取内容
   */
  static get(): Promise<string> {
    return new Promise((r, e) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .readText()
          .then((value) => {
            r(value);
          })
          .then(() => {
            r('');
          });
      } else {
        r('');
      }
    });
  }
}
