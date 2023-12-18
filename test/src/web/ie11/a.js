'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.a = void 0;
var is_1 = require('./b');

var a = (function () {
  console.log('a中导入b模块', is_1);
  typeof '';
})();

exports.a = a;
