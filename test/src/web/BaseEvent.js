const { BaseEvent } = require('yayaluoya-tool/dist/BaseEvent');
const { MouseE } = require('yayaluoya-tool/dist/web/event/MouseE');

let e = new BaseEvent();

e.on('on', undefined, (...arg) => {
  console.log('on', ...arg);
});

e.on(
  (a) => {
    console.log('验证', a);
    return true;
  },
  undefined,
  (...arg) => {
    console.log('on function', ...arg);
  },
);

e.on(/on2/, undefined, (...arg) => {
  console.log('on regExp', ...arg);
});

// 全部清空
// e.off(undefined, undefined, undefined);

e.emit('on', 1, 2, 3);
e.emit(/on2/, 1, 2, 3);

MouseE.I.on('mousedown', undefined, (e) => {
  console.log('鼠标点击');
});
