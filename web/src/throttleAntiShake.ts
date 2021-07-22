/**
 * 创建一个节流函数
 * @param {*} _fun 源函数
 * @param {*} _time 延迟执行时间
 */
export function createThrottleFun(_fun: Function, _time: number) {
  let _setTimeOutId;
  return function (...arg) {
    clearTimeout(_setTimeOutId);
    _setTimeOutId = setTimeout(() => {
      _fun.call(this, ...arg);
    }, _time);
  }
}

/**
* 创建一个防抖函数
* @param {*} _fun 源函数
* @param {*} _time 间隔时间
*/
export function createAntiShakeFun(_fun: Function, _time: number) {
  let _onTime = Date.now();
  return function (...arg) {
    if (Date.now() - _onTime >= _time) {
      _fun.call(this, ...arg);
      _onTime = Date.now();
    }
  }
}