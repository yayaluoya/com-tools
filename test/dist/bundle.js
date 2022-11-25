/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/web/ArrayT.js":
/*!***************************!*\
  !*** ./src/web/ArrayT.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { ArrayUtils } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/ArrayUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

/**
 * 数组工具测试
 */
setTimeout(() => {
    let button = document.getElementById('array_random');
    button.addEventListener('click', () => {
        let a = ArrayUtils.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, { 0: 2 });
        console.log(a, ArrayUtils.isRepeat(a));
    });
}, 0);

/***/ }),

/***/ "./src/web/BaseEvent.js":
/*!******************************!*\
  !*** ./src/web/BaseEvent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { BaseEvent } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/BaseEvent'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

let e = new BaseEvent();

e.on('on', undefined, (...arg) => {
    console.log('on', ...arg);
});

e.on((a) => {
    console.log('验证', a);
    return true;
}, undefined, (...arg) => {
    console.log('on function', ...arg);
});

e.on(/on2/, undefined, (...arg) => {
    console.log('on regExp', ...arg);
});

// 全部清空
// e.off(undefined, undefined, undefined);

e.emit('on', 1, 2, 3);
e.emit(/on2/, 1, 2, 3);


/***/ }),

/***/ "./src/web/BaseWS.js":
/*!***************************!*\
  !*** ./src/web/BaseWS.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/http/BaseWS'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/WS'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());



class BaseWS extends Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/http/BaseWS'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    static getWS(key) {
        return new Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/WS'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(`ws://localhost:3021/${key}`);
    }
}

BaseWS.start('web');

let ws = new BaseWS();

ws.on('message', undefined, (d) => {
    // console.log('收到消息', d);
});

/***/ }),

/***/ "./src/web/Crypto.js":
/*!***************************!*\
  !*** ./src/web/Crypto.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { Crypto } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/Crypto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let c = new Crypto('fasdfasdfasdfasdfasdfasdfasdfasd', 'fasdfdasdf');

console.log(Crypto.md5('哈哈哈哈'));

console.log(c.encryptionData('哈哈哈'));
console.log(c.decryptionData(c.encryptionData('哈哈哈')));

/***/ }),

/***/ "./src/web/URLTool.js":
/*!****************************!*\
  !*** ./src/web/URLTool.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { URLT } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/http/URLT'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

console.log('url-tool测试');

console.log(URLT.getQuery('http://baidu.com?a=10&b=20'));
console.log(URLT.addQuery('http://baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLT.join('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));

console.log(new URLT('?a=100&b=200').href);

console.log(new URLT('http://baidu.com').join('a', 'b', '/c/d/\\\\e/f').href);

console.log(URLT.contrast('http://www.com\\a\\b/c/', 'http://www.com/a/b/c'));

let u = new URLT('http://baidu.com?a=10');

u.addQuery({
    a: [1, 2, 3],
    c: {
        b: 10,
    }
});

console.log(u.href, u.query);

console.log('url-tool测试结束');

/***/ }),

/***/ "./src/web/api.js":
/*!************************!*\
  !*** ./src/web/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestAC": () => (/* binding */ TestAC)
/* harmony export */ });
const { BaseApiCon: BaseApiCon_ } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/node/BaseApiCon'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { ResData } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/http/ResData'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

class BaseApiCon extends BaseApiCon_ {
    get op() {
        return {
            baseURL: 'http://localhost:1423',
            timeout: 1000 * 60 * 5,
        }
    };

    /** 获取数据中的数据 */
    requestDataData(op) {
        return this.requestData(op).then(({ data }) => data);
    }


    /**
     * get请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    getData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'get',
        });
    }
    /**
     * post请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    postData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'post',
        });
    }
    /**
     * put请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    putData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'put',
        });
    }
    /**
     * delete请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    deleteData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'delete',
        });
    }
    /**
     * patch请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    patchData(_op) {
        return this.requestDataData({
            ..._op,
            method: 'PATCH',
        });
    }
}

class TestAC extends BaseApiCon {
    static I = new TestAC();
    testGet() {
        return this.getData({
            url: '/test',
            params: {
                data: '哈哈',
            },
        });
    }
    testPost() {
        return this.postData({
            url: '/test',
            data: {
                data: '哈哈132132',
            },
        });
    }
    stsGet(op) {
        return this.getData({
            url: '/sts',
            params: op,
        });
    }
}

setTimeout(() => {
    document.getElementById('api_click').addEventListener('click', () => {
        console.log('发送请求');
        // TestAC.I.testGet().then((d) => {
        //     console.log('testGet', d);
        // });
        // TestAC.I.testPost().then((d) => {
        //     console.log('testPost', d);
        // });
        TestAC.I.stsGet().then((d) => {
            console.log('stsGet', d);
        }).catch(() => {
            console.log('请求失败');
        });
    });
}, 1000);

/***/ }),

/***/ "./src/web/base64.js":
/*!***************************!*\
  !*** ./src/web/base64.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { Base64 } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/Base64'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

console.log(Base64.decode(Base64.encode('哈哈哈')));

console.log(Base64.encode('哈哈哈'));

/***/ }),

/***/ "./src/web/fileT.js":
/*!**************************!*\
  !*** ./src/web/fileT.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { FileT } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/FileT'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { AliOSST } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/AliYun/AliOSST'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { GetFileItem } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/GetFileItem'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

const fileSelect = new GetFileItem();
const filesSelect = new GetFileItem('', 999);

// 测试文件分片
setTimeout(() => {
    let inputEl = document.getElementById('fileInput');
    let fileShowImg1El = document.getElementById('fileShow1');
    let fileShowImg2El = document.getElementById('fileShow2');
    inputEl.addEventListener('change', ({ target }) => {
        let file = target.files[0];

        let files = FileT.slice(file, 1024 * 100);

        console.log('文件分片列表', files);

        // 重新组装成原来的文件
        fileShowImg1El.src = URL.createObjectURL(
            new File(files, file.name, {
                type: file.type,
            })
        )

        //上传到阿里云
        new AliOSST({
            accessKeyId: 'LTAI5t8rbt7HHXn3e5vGKdCC',
            accessKeySecret: 'w3XdtmQngG2HrqhRP9VcX8lNVNnB3Q',
            bucket: 'yayaluoya-test',
            region: 'oss-cn-hangzhou',
        }).sliceUpdateFile(file, file.name, 1024 * 100, (n) => {
            console.log('上传进度', n);
        })
            .then((url) => {
                fileShowImg2El.src = url;
            });
    });

    let selectFile = document.getElementById('file_select');
    let selectFiles = document.getElementById('file_selects');

    fileSelect.on('change', undefined, (file) => {
        console.log(file);
    });
    selectFile.addEventListener('click', () => {
        fileSelect.select();
    });
    filesSelect.on('change', undefined, (file) => {
        console.log(file);
    });
    selectFiles.addEventListener('click', () => {
        filesSelect.select();
    });
}, 0);

/***/ }),

/***/ "./src/web/instanceT.js":
/*!******************************!*\
  !*** ./src/web/instanceT.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { instanceTool } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/instanceTool'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

class A {
    a = '我是一个A的实例';
    constructor(...arg) {
        console.log('实例化', ...arg);
    }
}

instanceTool('i', undefined, 1, 2, 3, 4, 5, 6)(A);

console.log(A.i);

/***/ }),

/***/ "./src/web/objProxy.js":
/*!*****************************!*\
  !*** ./src/web/objProxy.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { createProxyObj, cleanProxyObjCon, autoROF, getobjProxyMap } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/obj/createProxyObj'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { BaseDataProxy } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/localData/BaseDataProxy'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

let testData = createProxyObj({
    a: 10,
    b: [1, 2, 3],
    c: {
        a: 10,
        b: [1, 2, 3],
    },
    d: true,
    e: null,
}, {
    set(...arg) {
        // console.log('set', ...arg);
    },
    get(...arg) {
        // console.log('get', ...arg);
    },
});

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
    for (let i = 0; i < 10; i++) {
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
        console.log(getobjProxyMap());
    }, 1000);
}
f();

/***/ }),

/***/ "./src/web/objT.js":
/*!*************************!*\
  !*** ./src/web/objT.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { ObjectUtils } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/obj/ObjectUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
const { Clipboard } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/Clipboard'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { MathUtils } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/MathUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { TimeUtils } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/TimeUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { ObjectUtils } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/obj/ObjectUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

console.log('web端的测试');

__webpack_require__(/*! ./objProxy */ "./src/web/objProxy.js");
__webpack_require__(/*! ./base64 */ "./src/web/base64.js");
__webpack_require__(/*! ./URLTool */ "./src/web/URLTool.js");
__webpack_require__(/*! ./fileT */ "./src/web/fileT.js");
__webpack_require__(/*! ./instanceT */ "./src/web/instanceT.js");
__webpack_require__(/*! ./BaseEvent */ "./src/web/BaseEvent.js");
__webpack_require__(/*! ./BaseWS */ "./src/web/BaseWS.js");
__webpack_require__(/*! ./objT */ "./src/web/objT.js");
__webpack_require__(/*! ./ArrayT */ "./src/web/ArrayT.js");
__webpack_require__(/*! ./Crypto */ "./src/web/Crypto.js");
__webpack_require__(/*! ./api */ "./src/web/api.js");

window.Clipboard = Clipboard;

window.TimeUtils = TimeUtils;
window.MathUtils = MathUtils;
window.ObjectUtils = ObjectUtils;
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL3Rlc3QvLi9zcmMvd2ViL0Jhc2VFdmVudC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9CYXNlV1MuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvQ3J5cHRvLmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL1VSTFRvb2wuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvYXBpLmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9maWxlVC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9pbnN0YW5jZVQuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvb2JqUHJveHkuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvb2JqVC5qcyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBBcnJheVV0aWxzIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L0FycmF5VXRpbHMnKTtcclxuXHJcbi8qKlxyXG4gKiDmlbDnu4Tlt6XlhbfmtYvor5VcclxuICovXHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcnJheV9yYW5kb20nKTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBsZXQgYSA9IEFycmF5VXRpbHMucmFuZG9tKFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSwgNSwgeyAwOiAyIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGEsIEFycmF5VXRpbHMuaXNSZXBlYXQoYSkpO1xyXG4gICAgfSk7XHJcbn0sIDApOyIsImNvbnN0IHsgQmFzZUV2ZW50IH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L0Jhc2VFdmVudCcpO1xyXG5cclxubGV0IGUgPSBuZXcgQmFzZUV2ZW50KCk7XHJcblxyXG5lLm9uKCdvbicsIHVuZGVmaW5lZCwgKC4uLmFyZykgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29uJywgLi4uYXJnKTtcclxufSk7XHJcblxyXG5lLm9uKChhKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygn6aqM6K+BJywgYSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSwgdW5kZWZpbmVkLCAoLi4uYXJnKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb24gZnVuY3Rpb24nLCAuLi5hcmcpO1xyXG59KTtcclxuXHJcbmUub24oL29uMi8sIHVuZGVmaW5lZCwgKC4uLmFyZykgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29uIHJlZ0V4cCcsIC4uLmFyZyk7XHJcbn0pO1xyXG5cclxuLy8g5YWo6YOo5riF56m6XHJcbi8vIGUub2ZmKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG5cclxuZS5lbWl0KCdvbicsIDEsIDIsIDMpO1xyXG5lLmVtaXQoL29uMi8sIDEsIDIsIDMpO1xyXG4iLCJpbXBvcnQgeyBCYXNlV1MgYXMgQmFzZVdTXyB9IGZyb20gXCJ5YXlhbHVveWEtdG9vbC9kaXN0L2h0dHAvQmFzZVdTXCI7XHJcbmltcG9ydCB7IFdTIH0gZnJvbSBcInlheWFsdW95YS10b29sL2Rpc3Qvd2ViL1dTXCI7XHJcblxyXG5jbGFzcyBCYXNlV1MgZXh0ZW5kcyBCYXNlV1NfIHtcclxuICAgIHN0YXRpYyBnZXRXUyhrZXkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFdTKGB3czovL2xvY2FsaG9zdDozMDIxLyR7a2V5fWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5CYXNlV1Muc3RhcnQoJ3dlYicpO1xyXG5cclxubGV0IHdzID0gbmV3IEJhc2VXUygpO1xyXG5cclxud3Mub24oJ21lc3NhZ2UnLCB1bmRlZmluZWQsIChkKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygn5pS25Yiw5raI5oGvJywgZCk7XHJcbn0pOyIsImNvbnN0IHsgQ3J5cHRvIH0gPSByZXF1aXJlKFwieWF5YWx1b3lhLXRvb2wvZGlzdC9DcnlwdG9cIik7XHJcbmxldCBjID0gbmV3IENyeXB0bygnZmFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZmFzZGZhc2QnLCAnZmFzZGZkYXNkZicpO1xyXG5cclxuY29uc29sZS5sb2coQ3J5cHRvLm1kNSgn5ZOI5ZOI5ZOI5ZOIJykpO1xyXG5cclxuY29uc29sZS5sb2coYy5lbmNyeXB0aW9uRGF0YSgn5ZOI5ZOI5ZOIJykpO1xyXG5jb25zb2xlLmxvZyhjLmRlY3J5cHRpb25EYXRhKGMuZW5jcnlwdGlvbkRhdGEoJ+WTiOWTiOWTiCcpKSk7IiwiY29uc3QgeyBVUkxUIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L2h0dHAvVVJMVCcpO1xyXG5cclxuY29uc29sZS5sb2coJ3VybC10b29s5rWL6K+VJyk7XHJcblxyXG5jb25zb2xlLmxvZyhVUkxULmdldFF1ZXJ5KCdodHRwOi8vYmFpZHUuY29tP2E9MTAmYj0yMCcpKTtcclxuY29uc29sZS5sb2coVVJMVC5hZGRRdWVyeSgnaHR0cDovL2JhaWR1LmNvbT9hPTEwJmI9MjAnLCB7XHJcbiAgICBkOiAzMCxcclxufSkpO1xyXG5cclxuY29uc29sZS5sb2coVVJMVC5qb2luKCdodHRwOi8vYmFpZHUuY29tL2hoJywgJ2Zhc2QnLCAnZmRzL2ZhZHMvLy9mYWRzL2Zhc2QnKSk7XHJcblxyXG5jb25zb2xlLmxvZyhuZXcgVVJMVCgnP2E9MTAwJmI9MjAwJykuaHJlZik7XHJcblxyXG5jb25zb2xlLmxvZyhuZXcgVVJMVCgnaHR0cDovL2JhaWR1LmNvbScpLmpvaW4oJ2EnLCAnYicsICcvYy9kL1xcXFxcXFxcZS9mJykuaHJlZik7XHJcblxyXG5jb25zb2xlLmxvZyhVUkxULmNvbnRyYXN0KCdodHRwOi8vd3d3LmNvbVxcXFxhXFxcXGIvYy8nLCAnaHR0cDovL3d3dy5jb20vYS9iL2MnKSk7XHJcblxyXG5sZXQgdSA9IG5ldyBVUkxUKCdodHRwOi8vYmFpZHUuY29tP2E9MTAnKTtcclxuXHJcbnUuYWRkUXVlcnkoe1xyXG4gICAgYTogWzEsIDIsIDNdLFxyXG4gICAgYzoge1xyXG4gICAgICAgIGI6IDEwLFxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbnNvbGUubG9nKHUuaHJlZiwgdS5xdWVyeSk7XHJcblxyXG5jb25zb2xlLmxvZygndXJsLXRvb2zmtYvor5Xnu5PmnZ8nKTsiLCJjb25zdCB7IEJhc2VBcGlDb246IEJhc2VBcGlDb25fIH0gPSByZXF1aXJlKFwieWF5YWx1b3lhLXRvb2wvZGlzdC9ub2RlL0Jhc2VBcGlDb25cIik7XHJcbmNvbnN0IHsgUmVzRGF0YSB9ID0gcmVxdWlyZShcInlheWFsdW95YS10b29sL2Rpc3QvaHR0cC9SZXNEYXRhXCIpO1xyXG5cclxuY2xhc3MgQmFzZUFwaUNvbiBleHRlbmRzIEJhc2VBcGlDb25fIHtcclxuICAgIGdldCBvcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDoxNDIzJyxcclxuICAgICAgICAgICAgdGltZW91dDogMTAwMCAqIDYwICogNSxcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiDojrflj5bmlbDmja7kuK3nmoTmlbDmja4gKi9cclxuICAgIHJlcXVlc3REYXRhRGF0YShvcCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3REYXRhKG9wKS50aGVuKCh7IGRhdGEgfSkgPT4gZGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V06K+35rGC6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gX29wIOivt+axgumFjee9riBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YShfb3ApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RGF0YURhdGEoe1xyXG4gICAgICAgICAgICAuLi5fb3AsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHBvc3Tor7fmsYLojrflj5bmlbDmja5cclxuICAgICAqIEBwYXJhbSBfb3Ag6K+35rGC6YWN572uIFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gaGVhZGVycyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwb3N0RGF0YShfb3ApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RGF0YURhdGEoe1xyXG4gICAgICAgICAgICAuLi5fb3AsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBwdXTor7fmsYLojrflj5bmlbDmja5cclxuICAgICAqIEBwYXJhbSBfb3Ag6K+35rGC6YWN572uIFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gaGVhZGVycyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdXREYXRhKF9vcCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3REYXRhRGF0YSh7XHJcbiAgICAgICAgICAgIC4uLl9vcCxcclxuICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZGVsZXRl6K+35rGC6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gX29wIOivt+axgumFjee9riBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZGVsZXRlRGF0YShfb3ApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RGF0YURhdGEoe1xyXG4gICAgICAgICAgICAuLi5fb3AsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHBhdGNo6K+35rGC6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gX29wIOivt+axgumFjee9riBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcGF0Y2hEYXRhKF9vcCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3REYXRhRGF0YSh7XHJcbiAgICAgICAgICAgIC4uLl9vcCxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGVzdEFDIGV4dGVuZHMgQmFzZUFwaUNvbiB7XHJcbiAgICBzdGF0aWMgSSA9IG5ldyBUZXN0QUMoKTtcclxuICAgIHRlc3RHZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVybDogJy90ZXN0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiAn5ZOI5ZOIJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRlc3RQb3N0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3REYXRhKHtcclxuICAgICAgICAgICAgdXJsOiAnL3Rlc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiAn5ZOI5ZOIMTMyMTMyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0c0dldChvcCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoe1xyXG4gICAgICAgICAgICB1cmw6ICcvc3RzJyxcclxuICAgICAgICAgICAgcGFyYW1zOiBvcCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBpX2NsaWNrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axgicpO1xyXG4gICAgICAgIC8vIFRlc3RBQy5JLnRlc3RHZXQoKS50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCd0ZXN0R2V0JywgZCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gVGVzdEFDLkkudGVzdFBvc3QoKS50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCd0ZXN0UG9zdCcsIGQpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIFRlc3RBQy5JLnN0c0dldCgpLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0c0dldCcsIGQpO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ivt+axguWksei0pScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0sIDEwMDApOyIsImNvbnN0IHsgQmFzZTY0IH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L0Jhc2U2NCcpO1xyXG5cclxuY29uc29sZS5sb2coQmFzZTY0LmRlY29kZShCYXNlNjQuZW5jb2RlKCflk4jlk4jlk4gnKSkpO1xyXG5cclxuY29uc29sZS5sb2coQmFzZTY0LmVuY29kZSgn5ZOI5ZOI5ZOIJykpOyIsImNvbnN0IHsgRmlsZVQgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3Qvd2ViL0ZpbGVUJyk7XHJcbmNvbnN0IHsgQWxpT1NTVCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC93ZWIvQWxpWXVuL0FsaU9TU1QnKTtcclxuY29uc3QgeyBHZXRGaWxlSXRlbSB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC93ZWIvR2V0RmlsZUl0ZW0nKTtcclxuXHJcbmNvbnN0IGZpbGVTZWxlY3QgPSBuZXcgR2V0RmlsZUl0ZW0oKTtcclxuY29uc3QgZmlsZXNTZWxlY3QgPSBuZXcgR2V0RmlsZUl0ZW0oJycsIDk5OSk7XHJcblxyXG4vLyDmtYvor5Xmlofku7bliIbniYdcclxuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBsZXQgaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlSW5wdXQnKTtcclxuICAgIGxldCBmaWxlU2hvd0ltZzFFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2hvdzEnKTtcclxuICAgIGxldCBmaWxlU2hvd0ltZzJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2hvdzInKTtcclxuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgICAgICBsZXQgZmlsZSA9IHRhcmdldC5maWxlc1swXTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gRmlsZVQuc2xpY2UoZmlsZSwgMTAyNCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmlofku7bliIbniYfliJfooagnLCBmaWxlcyk7XHJcblxyXG4gICAgICAgIC8vIOmHjeaWsOe7hOijheaIkOWOn+adpeeahOaWh+S7tlxyXG4gICAgICAgIGZpbGVTaG93SW1nMUVsLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoXHJcbiAgICAgICAgICAgIG5ldyBGaWxlKGZpbGVzLCBmaWxlLm5hbWUsIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8v5LiK5Lyg5Yiw6Zi/6YeM5LqRXHJcbiAgICAgICAgbmV3IEFsaU9TU1Qoe1xyXG4gICAgICAgICAgICBhY2Nlc3NLZXlJZDogJ0xUQUk1dDhyYnQ3SEhYbjNlNXZHS2RDQycsXHJcbiAgICAgICAgICAgIGFjY2Vzc0tleVNlY3JldDogJ3czWGR0bVFuZ0cySHJxaFJQOVZjWDhsTlZObkIzUScsXHJcbiAgICAgICAgICAgIGJ1Y2tldDogJ3lheWFsdW95YS10ZXN0JyxcclxuICAgICAgICAgICAgcmVnaW9uOiAnb3NzLWNuLWhhbmd6aG91JyxcclxuICAgICAgICB9KS5zbGljZVVwZGF0ZUZpbGUoZmlsZSwgZmlsZS5uYW1lLCAxMDI0ICogMTAwLCAobikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5LiK5Lyg6L+b5bqmJywgbik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZVNob3dJbWcyRWwuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzZWxlY3RGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVfc2VsZWN0Jyk7XHJcbiAgICBsZXQgc2VsZWN0RmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9zZWxlY3RzJyk7XHJcblxyXG4gICAgZmlsZVNlbGVjdC5vbignY2hhbmdlJywgdW5kZWZpbmVkLCAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgfSk7XHJcbiAgICBzZWxlY3RGaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGZpbGVTZWxlY3Quc2VsZWN0KCk7XHJcbiAgICB9KTtcclxuICAgIGZpbGVzU2VsZWN0Lm9uKCdjaGFuZ2UnLCB1bmRlZmluZWQsIChmaWxlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIHNlbGVjdEZpbGVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGZpbGVzU2VsZWN0LnNlbGVjdCgpO1xyXG4gICAgfSk7XHJcbn0sIDApOyIsImNvbnN0IHsgaW5zdGFuY2VUb29sIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L2luc3RhbmNlVG9vbCcpO1xyXG5cclxuY2xhc3MgQSB7XHJcbiAgICBhID0gJ+aIkeaYr+S4gOS4qkHnmoTlrp7kvosnO1xyXG4gICAgY29uc3RydWN0b3IoLi4uYXJnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WunuS+i+WMlicsIC4uLmFyZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmluc3RhbmNlVG9vbCgnaScsIHVuZGVmaW5lZCwgMSwgMiwgMywgNCwgNSwgNikoQSk7XHJcblxyXG5jb25zb2xlLmxvZyhBLmkpOyIsImNvbnN0IHsgY3JlYXRlUHJveHlPYmosIGNsZWFuUHJveHlPYmpDb24sIGF1dG9ST0YsIGdldG9ialByb3h5TWFwIH0gPSByZXF1aXJlKFwieWF5YWx1b3lhLXRvb2wvZGlzdC9vYmovY3JlYXRlUHJveHlPYmpcIik7XHJcbmNvbnN0IHsgQmFzZURhdGFQcm94eSB9ID0gcmVxdWlyZShcInlheWFsdW95YS10b29sL2Rpc3Qvd2ViL2xvY2FsRGF0YS9CYXNlRGF0YVByb3h5XCIpO1xyXG5cclxubGV0IHRlc3REYXRhID0gY3JlYXRlUHJveHlPYmooe1xyXG4gICAgYTogMTAsXHJcbiAgICBiOiBbMSwgMiwgM10sXHJcbiAgICBjOiB7XHJcbiAgICAgICAgYTogMTAsXHJcbiAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgfSxcclxuICAgIGQ6IHRydWUsXHJcbiAgICBlOiBudWxsLFxyXG59LCB7XHJcbiAgICBzZXQoLi4uYXJnKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldCcsIC4uLmFyZyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KC4uLmFyZykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdnZXQnLCAuLi5hcmcpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG53aW5kb3cudGVzdERhdGEgPSB0ZXN0RGF0YTtcclxuXHJcbmF1dG9ST0YoKCkgPT4ge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ+iHquWKqOS+nei1luaJp+ihjCcsIHRlc3REYXRhLmMuYSk7XHJcbn0pO1xyXG5cclxuY2xhc3MgQSBleHRlbmRzIEJhc2VEYXRhUHJveHkge1xyXG4gICAgZ2V0TmV3RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgYjogWzEsIDIsIDNdLFxyXG4gICAgICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgICAgICBhOiAxMCxcclxuICAgICAgICAgICAgICAgIGI6IFsxLCAyLCAzXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDogdHJ1ZSxcclxuICAgICAgICAgICAgZTogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cubG9jYWxUZXN0RGF0YSA9IG5ldyBBKCk7XHJcblxyXG53aW5kb3cuY2xlYW5Qcm94eU9iakNvbiA9IGNsZWFuUHJveHlPYmpDb247XHJcblxyXG4vLyDlvLHlvJXnlKjmtYvor5VcclxubGV0IGYgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3REYXRhLmMgPSB7IGE6IDIwIH07XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5jO1xyXG4gICAgICAgICAgICAgICAgcigpO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhnZXRvYmpQcm94eU1hcCgpKTtcclxuICAgIH0sIDEwMDApO1xyXG59XHJcbmYoKTsiLCJjb25zdCB7IE9iamVjdFV0aWxzIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L29iai9PYmplY3RVdGlscycpO1xyXG5cclxuY29uc29sZS5sb2coJ+WFi+mahuWvueixoTEnLCBPYmplY3RVdGlscy5jbG9uZSh7XHJcbiAgICBhOiAxMCxcclxuICAgIGI6IHsgYzogMSB9LFxyXG4gICAgYzogWzEsIDIsIDNdLFxyXG4gICAgZDogbmV3IE1hcChbWzEsIDJdLCBbMiwgM11dKSxcclxuICAgIGU6IG5ldyBEYXRlKCksXHJcbn0pKTtcclxuXHJcbmNvbnNvbGUubG9nKCflhYvpmoblr7nosaEyJywgT2JqZWN0VXRpbHMuY2xvbmUyKHtcclxuICAgIGE6IDEwLFxyXG4gICAgYjogeyBjOiAxIH0sXHJcbiAgICBjOiBbMSwgMiwgM10sXHJcbiAgICBkOiBuZXcgTWFwKFtbMSwgMl0sIFsyLCAzXV0pLFxyXG4gICAgZTogbmV3IERhdGUoKSxcclxufSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgQ2xpcGJvYXJkIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9DbGlwYm9hcmQnKTtcclxuY29uc3QgeyBNYXRoVXRpbHMgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3QvTWF0aFV0aWxzJyk7XHJcbmNvbnN0IHsgVGltZVV0aWxzIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L1RpbWVVdGlscycpO1xyXG5jb25zdCB7IE9iamVjdFV0aWxzIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L29iai9PYmplY3RVdGlscycpO1xyXG5cclxuY29uc29sZS5sb2coJ3dlYuerr+eahOa1i+ivlScpO1xyXG5cclxucmVxdWlyZSgnLi9vYmpQcm94eScpO1xyXG5yZXF1aXJlKCcuL2Jhc2U2NCcpO1xyXG5yZXF1aXJlKCcuL1VSTFRvb2wnKTtcclxucmVxdWlyZSgnLi9maWxlVCcpO1xyXG5yZXF1aXJlKCcuL2luc3RhbmNlVCcpO1xyXG5yZXF1aXJlKCcuL0Jhc2VFdmVudCcpO1xyXG5yZXF1aXJlKCcuL0Jhc2VXUycpO1xyXG5yZXF1aXJlKCcuL29ialQnKTtcclxucmVxdWlyZSgnLi9BcnJheVQnKTtcclxucmVxdWlyZSgnLi9DcnlwdG8nKTtcclxucmVxdWlyZSgnLi9hcGknKTtcclxuXHJcbndpbmRvdy5DbGlwYm9hcmQgPSBDbGlwYm9hcmQ7XHJcblxyXG53aW5kb3cuVGltZVV0aWxzID0gVGltZVV0aWxzO1xyXG53aW5kb3cuTWF0aFV0aWxzID0gTWF0aFV0aWxzO1xyXG53aW5kb3cuT2JqZWN0VXRpbHMgPSBPYmplY3RVdGlsczsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=