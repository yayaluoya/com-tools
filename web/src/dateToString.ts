/**
 * 时间转字符串
 * @param {*} _date 时间戳或者一个Date对象
 * @param {*} _op 字符串y：年，t：月，d：日，i：描述，h：小时，m：分，s：秒 或者方法
 */
export function dateToString(_date: number | string | Date, _op: string | Function = 'y/t/d ih:m:s') {
  return (_date instanceof Date ? _date : new Date(_date))
    .toLocaleString()
    .replace(
      /([0-9]+)\/([0-9]+)\/([0-9]+)\s?([^0-9]+?)([0-9]+):([0-9]+):([0-9]+)/,
      (_, y, t, d, i, h, m, s) => {
        switch (typeof _op) {
          case 'string':
            return _op
              .replace(/y/g, y)
              .replace(/t/g, t)
              .replace(/d/g, d)
              .replace(/i/g, i)
              .replace(/h/g, h)
              .replace(/m/g, m)
              .replace(/s/g, s);
          case 'function':
            return _op(y, t, d, i, h, m, s);
        }
      }
    );
}