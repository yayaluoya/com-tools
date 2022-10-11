const { BaseApiCon: BaseApiCon_ } = require("yayaluoya-tool/dist/node/BaseApiCon");
const { ResData } = require("yayaluoya-tool/dist/http/ResData");

class BaseApiCon extends BaseApiCon_ {
    get op() {
        return {
            baseURL: 'http://localhost:1423',
            timeout: 1000 * 60 * 5,
        }
    };

    /** 获取数据中的数据 */
    requestDataData(op) {
        return this.requestData(op).then(({ data }) => data);
    }


    /**
     * get请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    getData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'get',
        });
    }
    /**
     * post请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    postData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'post',
        });
    }
    /**
     * put请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    putData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'put',
        });
    }
    /**
     * delete请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    deleteData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'delete',
        });
    }
    /**
     * patch请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    patchData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'PATCH',
        });
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    resData_(data, con, res) {
        return data;
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
        // TestAC.I.testPost().then((d) => {
        //     console.log('testPost', d);
        // });
        TestAC.I.stsGet().then((d) => {
            console.log('stsGet', d);
        }).catch(() => {
            console.log('请求失败');
        });
    });
}, 1000);