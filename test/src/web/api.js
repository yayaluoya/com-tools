const { BaseApiCon: BaseApiCon_ } = require("yayaluoya-tool/dist/node/BaseApiCon");
const { ResData } = require("yayaluoya-tool/dist/http/ResData");

class BaseApiCon extends BaseApiCon_ {
    get op() {
        return {
            baseURL: 'http://localhost:1423',
            timeout: 1000 * 60 * 5,
            // timeout: 1,
        }
    };

    resData_(con, res, data) {
        if (!res) {
            throw new ResData(data, 408, '请求超时');
        }
        return new ResData(data, res.status);
    }
}

export class TestAC extends BaseApiCon {
    static I = new TestAC();
    testGet() {
        return this.getData({
            url: '/test',
            params: {
                data: '哈哈',
            },
        });
    }
    testPost() {
        return this.postData({
            url: '/test',
            data: {
                data: '哈哈132132',
            },
        });
    }
    stsGet(op) {
        return this.getData({
            url: '/sts',
            params: op,
        });
    }
}

setTimeout(() => {
    document.getElementById('api_click').addEventListener('click', () => {
        console.log('发送请求');
        // TestAC.I.testGet().then((d) => {
        //     console.log('testGet', d);
        // });
        TestAC.I.testPost().then((d) => {
            console.log('testPost', d);
        });
        // TestAC.I.stsGet().then((d) => {
        //     console.log('stsGet', d);
        // }).catch(() => {
        //     console.log('请求失败');
        // });
    });
}, 1000);