import { BaseData } from "../../src/localData/BaseData";
import { BaseDataProxy } from "../../src/localData/BaseDataProxy";
class Data extends BaseData {
    constructor() {
        super(...arguments);
        this.a = 1;
        this.b = 'b';
    }
}
export class TestDataProxy extends BaseDataProxy {
    /** 获取新数据 */
    getDefaultData() {
        return new Data();
    }
}
//# sourceMappingURL=testDataProxy.js.map