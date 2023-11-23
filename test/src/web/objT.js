const { ObjectUtils } = require('yayaluoya-tool/obj/ObjectUtils');

console.log('克隆对象1', ObjectUtils.clone({
    a: 10,
    b: { c: 1 },
    c: [1, 2, 3],
    d: new Map([[1, 2], [2, 3]]),
    e: new Date(),
}));

console.log('克隆对象2', ObjectUtils.clone2({
    a: 10,
    b: { c: 1 },
    c: [1, 2, 3],
    d: new Map([[1, 2], [2, 3]]),
    e: new Date(),
}));
