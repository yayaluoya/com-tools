const { BaseApiCon } = require("yayaluoya-tool/dist/http/BaseApiCon");

class H extends BaseApiCon {
    get op() {
        return {
            h: 'fsdfa',
        };
    }
    /** 请求拦截 */
    async request_(_config) {
        console.log(_config);
        return _config;
    }
    /** 响应拦截 */
    async response_(_res) {
        console.log(_res.status);
        return _res;
    }
    resData_(data, com) {
        console.log(data, com);
        throw data;
    }
}

let h = new H();

h.axiosData({
    url: 'http://baidu.com',
}).then((res) => {
    console.log('成功', res);
}).catch((err) => {
    console.log('失败', err);
});