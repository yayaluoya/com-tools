import { BaseData } from "../../localData/BaseData";
import { BaseDataProxy } from "../../localData/BaseDataProxy";

class Data extends BaseData {
    a: number = 1;
    b: string = 'b';
}

export class TestDataProxy extends BaseDataProxy<Data> {
    /** 获取新数据 */
    getDefaultData(): Data {
        return new Data();
    }
}