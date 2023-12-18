const { Mes: Mes_ } = require('yayaluoya-tool/web/Mes');

class Mes extends Mes_ {
  static intervalTime = 3000;

  /** TODO 可重写 */
  static success_(str) {
    console.log('success1:', str);
  }
  /** TODO 可重写 */
  static warning_(str) {
    console.log('warning1:', str);
  }
  /** TODO 可重写 */
  static info_(str) {
    console.log('info1:', str);
  }
  /** TODO 可重写 */
  static error_(str) {
    console.error('error1:', str);
  }
}

Mes.success('success');
Mes.warning('warning');
Mes.info('info');
Mes.error('error');
