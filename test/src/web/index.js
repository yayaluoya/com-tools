const { Clipboard } = require('yayaluoya-tool/dist/web/Clipboard');
const { MathUtils } = require('yayaluoya-tool/dist/MathUtils');
const { TimeUtils } = require('yayaluoya-tool/dist/TimeUtils');
const { ObjectUtils } = require('yayaluoya-tool/dist/obj/ObjectUtils');

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
require('./Crypto');
require('./api');
require('./baseItemTool');
require('./msg');
require('./time');

window.Clipboard = Clipboard;

window.TimeUtils = TimeUtils;
window.MathUtils = MathUtils;
window.ObjectUtils = ObjectUtils;