import { BaseItemPool } from 'yayaluoya-tool/BaseItemPool';
class BaseItemPoolTest extends BaseItemPool {
    static I = new BaseItemPool();
}

console.log('对象池测试');

console.log(BaseItemPoolTest.I.has('daf'));
console.log(BaseItemPoolTest.I.get('daf'));

BaseItemPoolTest.I.add('daf', 'fasdfasd');

console.log(BaseItemPoolTest.I.has('daf'));
console.log(BaseItemPoolTest.I.get('daf'));

console.log(BaseItemPoolTest.I.has('daf'));
console.log(BaseItemPoolTest.I.get('daf'));

console.log(BaseItemPoolTest.I.itemPool);