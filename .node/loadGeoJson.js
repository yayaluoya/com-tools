const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * 下载json
 * @param {*} adcode
 * @returns
 */
async function downLoad(adcode, name = undefined) {
  if (!adcode) {
    return;
  }
  return request(adcode)
    .then(async (_) => {
      let d = JSON.parse(_);
      fs.writeFileSync(
        path.join(process.cwd(), `${adcode}_full.json`),
        JSON.stringify(d, undefined, 2),
      );
      console.log('下载完成', adcode, name);
      //下载子级
      for (let o of d.features || []) {
        if (!o.properties.childrenNum) {
          await request(o.properties.adcode, false)
            .then((d) => {
              fs.writeFileSync(
                path.join(process.cwd(), `${o.properties.adcode}.json`),
                d,
              );
            })
            .catch(() => {
              fs.rmSync(path.join(process.cwd(), `${o.properties.adcode}.json`));
            });
          continue;
        }
        await downLoad(o.properties.adcode, o.properties.name);
      }
    })
    .catch((error) => {
      console.log('下载错误', adcode, name, error);
      fs.rmSync(path.join(process.cwd(), `${adcode}_full.json`));
    });
}
downLoad('100000', '中国');

/**
 * 通过adcode获取它的genjson
 * @param {*} adcode
 * @returns
 */
function request(adcode, full = true) {
  // console.log('请求', adcode, full);
  return new Promise((resolve, reject) => {
    let req = https.request(
      `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}${
        full ? '_full' : ''
      }`,
      {
        method: 'get',
      },
      (res) => {
        res.setEncoding('utf8');
        let d = '';
        res.on('data', (data) => {
          d += data;
        });
        res.on('end', () => {
          resolve(d);
        });
        res.on('error', (error) => {
          reject(error);
        });
      },
    );
    req.on('error', (error) => {
      reject(error);
    });
    req.end();
  });
}
