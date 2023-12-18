const { lookupFile } = require('yayaluoya-tool/node/lookupFile');
console.log(lookupFile(__dirname, ['package.json'], true));
