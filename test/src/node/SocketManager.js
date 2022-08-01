const { SocketManager } = require('yayaluoya-tool/dist/http/SocketManager');

SocketManager.instance.start(3021);

setInterval(() => {
    SocketManager.instance.sendMsg('.*', JSON.stringify({
        data: '一个默认的消息',
    }));
}, 3000);