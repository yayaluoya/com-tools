const { Clipboard } = require('yayaluoya-tool/dist/web/Clipboard');

console.log('web端的测试');

require('./objProxy');
require('./base64');
require('./URLTool');
require('./fileT');
require('./instanceT');
require('./BaseEvent');
require('./BaseWS');
require('./objT');
require('./ArrayT');

window.Clipboard = Clipboard;
