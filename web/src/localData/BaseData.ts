/** 
 * 基类数据
 * 需要被数据代理器管理的数据必须重这里继承
 */
export abstract class BaseData { }

//
Object.setPrototypeOf(BaseData.prototype, null);