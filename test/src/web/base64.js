const { Base64 } = require('yayaluoya-tool/dist/Base64');

console.log('base64加密', Base64.encode('哈哈哈'));
console.log('base64加解密', Base64.decode(Base64.encode('哈哈哈')));
