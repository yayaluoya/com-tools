import https from 'https';
import { JSONPar } from '../JSONPar';

/**
 * 获取apipost列表
 * @param url
 * @param salt
 */
export function getApipostList(url: string, salt: string) {
  return requst(`https://v7-api.apipost.cn/doc/preview?url=${url}&salt=${salt}`)
    .then((data) => {
      return {
        name: data.name,
        url: data.url,
        salt: data.salt,
        list: data.list,
        create_time: data.create_time,
      };
    })
    .then(async (_) => {
      let f = async (menu) => {
        if (menu.children && menu.children.length > 0) {
          let children = [];
          for (let o of menu.children) {
            children.push(await f(o));
          }
          menu.children = children;
        }
        let info = await requst(
          `https://v7-api.apipost.cn/doc/info?url=${url}&target_id=${menu.target_id}`,
        );
        delete info.request?.event;
        delete info.request?.auth;
        return {
          name: info.name,
          method: info.method,
          target_id: info.target_id,
          create_dtime: info.create_dtime,
          update_dtime: info.update_dtime,
          request: info.request,
          response: info.response,
          children: menu.children,
        };
      };
      let list = [];
      for (let o of _.list) {
        list.push(await f(o));
      }
      _.list = list;
      return _;
    });
}

/**
 * 发送请求
 * @param url
 * @returns
 */
function requst(url: string) {
  return new Promise<string>((resolve, reject) => {
    let req = https.request(url, (res) => {
      res.setEncoding('utf8');
      let d = '';
      res.on('data', (data) => {
        d += data;
      });
      res.on('end', () => {
        resolve(d);
      });
    });
    req.on('error', reject);
    req.end();
  })
    .then((_) => JSONPar(_, null))
    .then((_) => _?.data);
}
