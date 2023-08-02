const { ObjectUtils } = require('../../../yayaluoya_dist/obj/ObjectUtils');
const a = require('./a');

console.log('对象克隆测试', ObjectUtils.clone2({ a: 10 }));
console.log('a模块的测试', a);

console.log('ie11的测试');

class A {
    test() {
        console.log('类a的测试');
    }
}

new A().test();

Promise.resolve().then(() => {
    console.log('promise的测试');
});

async function asyncTest() {
    let a = await Promise.resolve('a');

    console.log('async await 测试', a);
}

asyncTest();

console.log('typeof 的测试', typeof '');
switch (true) {
    case typeof {} == 'object':
        console.log('switch测试');
}

function* aaaa() {
    yield 1;
    yield 2;
    yield 3;
}
console.log('生成器的测试');
for (let o of aaaa()) {
    console.log(o);
}

// require('../objProxy');
