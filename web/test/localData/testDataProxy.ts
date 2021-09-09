import { BaseData } from "../../src/localData/BaseData";
import { BaseDataProxy } from "../../src/localData/BaseDataProxy";

class Data extends BaseData {
    a: number = 1;
    b: string = 'b';
}

export class TestDataProxy extends BaseDataProxy<Data> {
    /** 获取新数据 */
    protected getDefaultData(): Data {
        return new Data();
    }
}