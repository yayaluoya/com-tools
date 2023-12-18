import { BaseWS as BaseWS_ } from 'yayaluoya-tool/http/BaseWS';
import { WS } from 'yayaluoya-tool/web/WS';

class BaseWS extends BaseWS_ {
  static getWS(key) {
    return new WS(`ws://localhost:3021/${key}`);
  }
}

BaseWS.start('web');

let ws = new BaseWS();

ws.on('message', undefined, (d) => {
  // console.log('收到消息', d);
});
