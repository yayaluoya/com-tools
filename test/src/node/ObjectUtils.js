const { ObjectUtils } = require('yayaluoya-tool/obj/ObjectUtils');

console.log(
  ObjectUtils.merge(
    {
      a: 10,
      c: [1],
      e: {
        a: 10,
        c: [1],
      },
    },
    {
      a: 20,
      b: 10,
      c: [2],
      e: {
        a: 20,
        b: 10,
        c: [2],
      },
    },
  ),
);
