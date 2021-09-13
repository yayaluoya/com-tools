import { createApiCon } from "src/http/createApiCon";
import { TestDataProxy } from "./localData/testDataProxy";
/** 测试脚本 */
console.log('哈哈2');
let testData = new TestDataProxy();
//注入到全局方便设置
window['testData'] = testData;
console.log(testData.data.a);
let apiCon = createApiCon('www.baidu.com', {
    a: {
        getA() {
            return this.path;
        },
    },
    b: {
        getB() {
            return this.path;
        },
        c: {
            getC(_op) {
                //相当于fetch('www.baidu.com/b/c');
                fetch(this.path).then(() => { });
            },
        },
    },
});
window['apiCon'] = apiCon;
console.log(apiCon.b.c.getC('获取c接口数据'));
//# sourceMappingURL=index.js.map