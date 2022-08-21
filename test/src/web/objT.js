const { ObjectUtils } = require('yayaluoya-tool/dist/obj/ObjectUtils');

console.log(ObjectUtils.clone_({
    a: 10,
    b: { c: 1 },
}));