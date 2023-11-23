console.log('node测试2');
const fs = require('fs');
const path = require('path');

require('./http');

require('./ObjectUtils');

require('./array');
require('./lookupFile');
require('./HttpTool');
require('./SocketManager');
require('./server/server');
require('./cmd');

console.log('获取apipost列表');
require('yayaluoya-tool/node/getApipostList')
    .getApipostList('b19ad72b1fe67014', '5b576e616b1149bb')
    .then((data) => {
        fs.writeFileSync(
            path.join(__dirname, '../../dist/openapiList.json'),
            JSON.stringify(data, undefined, 2),
        );
        console.log('获取apipost列表完成');
    });

require('yayaluoya-tool');
console.log(1);
import('yayaluoya-tool');