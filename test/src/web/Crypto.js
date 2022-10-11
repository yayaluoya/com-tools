const { Crypto } = require("yayaluoya-tool/dist/Crypto");
let c = new Crypto('fasdfasdfasdfasdfasdfasdfasdfasd', 'fasdfdasdf');

console.log(c.md5('哈哈哈哈'));

console.log(c.encryptionData('哈哈哈'));
console.log(c.decryptionData(c.encryptionData('哈哈哈')));