const {
  createProxyObj,
  cleanProxyObjCon,
  autoROF,
  getobjProxyMap,
} = require('yayaluoya-tool/dist/obj/createProxyObj');
const { BaseDataProxy } = require('yayaluoya-tool/dist/web/localData/BaseDataProxy');

let testData = createProxyObj(
  {
    a: 10,
    b: [1, 2, 3],
    c: {
      a: 10,
      b: [1, 2, 3],
    },
    d: true,
    e: null,
  },
  {
    set(...arg) {
      console.log('set', ...arg);
    },
    get(...arg) {
      console.log('get', ...arg);
    },
  },
);

window.testData = testData;

autoROF(() => {
  // console.log('自动依赖执行', testData.c.a);
});

class A extends BaseDataProxy {
  getNewData() {
    return {
      a: 10,
      b: [1, 2, 3],
      c: {
        a: 10,
        b: [1, 2, 3],
      },
      d: true,
      e: null,
    };
  }
}

window.localTestData = new A();

window.cleanProxyObjCon = cleanProxyObjCon;

// 弱引用测试
let f = async () => {
  for (let i = 0; i < 1; i++) {
    await new Promise((r) => {
      setTimeout(() => {
        testData.c = { a: 20 };
        testData.c;
        r();
      }, 0);
    });
  }
  //
  setTimeout(() => {
    console.log('对象代理映射', getobjProxyMap());
  }, 1000);
};
f();
