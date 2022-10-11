const { getCmdOp } = require('yayaluoya-tool/dist/node/getCmdOp');
const { cmdSecondCom } = require('yayaluoya-tool/dist/node/cmdSecondCom');

console.log(getCmdOp((p) => {
    p.option('-d --de');
}));

setTimeout(() => {
    cmdSecondCom('你叫啥名字呀！').then((d) => {
        console.log('你叫', d);
    });
}, 1000);