const { InstanceTool } = require('yayaluoya-tool/dist/InstanceTool');

class A {
    a = '我是一个A的实例';
    constructor(...arg) {
        console.log('实例化', ...arg);
    }
}

InstanceTool('i', undefined, 1, 2, 3, 4, 5, 6)(A);

console.log(A.i);