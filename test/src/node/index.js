
console.log('node测试2');

// require('./http');

// require('./ObjectUtils');

require('./array');

require('./lookupFile');

require('./HttpTool');

require('./SocketManager');

const { getCmdOp } = require('yayaluoya-tool/dist/node/getCmdOp');
const { cmdSecondCom } = require('yayaluoya-tool/dist/node/cmdSecondCom');

console.log(getCmdOp((p) => {
    p.option('-d --de');
}));

cmdSecondCom('你叫啥名字呀！').then((d) => {
    console.log('我叫', d);
});