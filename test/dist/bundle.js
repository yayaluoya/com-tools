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
        console.log(ArrayUtils.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4));
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
    console.log('收到消息', d);
});

/***/ }),

/***/ "./src/web/URLTool.js":
/*!****************************!*\
  !*** ./src/web/URLTool.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { URLT } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/http/URLT'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

console.log(URLT.getQuery('http://baidu.com?a=10&b=20'));
console.log(URLT.addQuery('http://baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLT.join('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));

console.log(new URLT('?a=100&b=200').href);

console.log(new URLT('http://baidu.com').join('a', 'b', '/c/d/\\\\e/f').href);

console.log(URLT.contrast('http://www.com\\a\\b/c/', 'http://www.com/a/b/c'));

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

const { FileT } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/FileT'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { AliOSST } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/AliOSST'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const { getFile } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/web/getFile'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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

    selectFile.addEventListener('click', () => {
        getFile().then((e) => {
            console.log(e);
        });
    });
    selectFiles.addEventListener('click', () => {
        getFile('', 2).then((e) => {
            console.log(e);
        });
    });
}, 0);

/***/ }),

/***/ "./src/web/instanceT.js":
/*!******************************!*\
  !*** ./src/web/instanceT.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { InstanceTool } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'yayaluoya-tool/dist/InstanceTool'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

class A {
    a = '我是一个A的实例';
    constructor(...arg) {
        console.log('实例化', ...arg);
    }
}

InstanceTool('i', undefined, 1, 2, 3, 4, 5, 6)(A);

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

console.log(ObjectUtils.clone_({
    a: 10,
    b: { c: 1 },
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

window.Clipboard = Clipboard;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQSxRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLGdLQUFtQztBQUNqRTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLHlDQUFZO0FBQ3BCLG1CQUFPLENBQUMscUNBQVU7QUFDbEIsbUJBQU8sQ0FBQyx1Q0FBVztBQUNuQixtQkFBTyxDQUFDLG1DQUFTO0FBQ2pCLG1CQUFPLENBQUMsMkNBQWE7QUFDckIsbUJBQU8sQ0FBQywyQ0FBYTtBQUNyQixtQkFBTyxDQUFDLHFDQUFVO0FBQ2xCLG1CQUFPLENBQUMsaUNBQVE7QUFDaEIsbUJBQU8sQ0FBQyxxQ0FBVTtBQUNsQjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvQXJyYXlULmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL0Jhc2VFdmVudC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9CYXNlV1MuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvVVJMVG9vbC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvZmlsZVQuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvaW5zdGFuY2VULmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL29ialByb3h5LmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvd2ViL29ialQuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBBcnJheVV0aWxzIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L0FycmF5VXRpbHMnKTtcclxuXHJcbi8qKlxyXG4gKiDmlbDnu4Tlt6XlhbfmtYvor5VcclxuICovXHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcnJheV9yYW5kb20nKTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhBcnJheVV0aWxzLnJhbmRvbShbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV0sIDQpKTtcclxuICAgIH0pO1xyXG59LCAwKTsiLCJjb25zdCB7IEJhc2VFdmVudCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC9CYXNlRXZlbnQnKTtcclxuXHJcbmxldCBlID0gbmV3IEJhc2VFdmVudCgpO1xyXG5cclxuZS5vbignb24nLCB1bmRlZmluZWQsICguLi5hcmcpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvbicsIC4uLmFyZyk7XHJcbn0pO1xyXG5cclxuZS5vbigoYSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ+mqjOivgScsIGEpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0sIHVuZGVmaW5lZCwgKC4uLmFyZykgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29uIGZ1bmN0aW9uJywgLi4uYXJnKTtcclxufSk7XHJcblxyXG5lLm9uKC9vbjIvLCB1bmRlZmluZWQsICguLi5hcmcpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvbiByZWdFeHAnLCAuLi5hcmcpO1xyXG59KTtcclxuXHJcbi8vIOWFqOmDqOa4heepulxyXG4vLyBlLm9mZih1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuXHJcbmUuZW1pdCgnb24nLCAxLCAyLCAzKTtcclxuZS5lbWl0KC9vbjIvLCAxLCAyLCAzKTtcclxuIiwiaW1wb3J0IHsgQmFzZVdTIGFzIEJhc2VXU18gfSBmcm9tIFwieWF5YWx1b3lhLXRvb2wvZGlzdC9odHRwL0Jhc2VXU1wiO1xyXG5pbXBvcnQgeyBXUyB9IGZyb20gXCJ5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9XU1wiO1xyXG5cclxuY2xhc3MgQmFzZVdTIGV4dGVuZHMgQmFzZVdTXyB7XHJcbiAgICBzdGF0aWMgZ2V0V1Moa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXUyhgd3M6Ly9sb2NhbGhvc3Q6MzAyMS8ke2tleX1gKTtcclxuICAgIH1cclxufVxyXG5cclxuQmFzZVdTLnN0YXJ0KCd3ZWInKTtcclxuXHJcbmxldCB3cyA9IG5ldyBCYXNlV1MoKTtcclxuXHJcbndzLm9uKCdtZXNzYWdlJywgdW5kZWZpbmVkLCAoZCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ+aUtuWIsOa2iOaBrycsIGQpO1xyXG59KTsiLCJjb25zdCB7IFVSTFQgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3QvaHR0cC9VUkxUJyk7XHJcblxyXG5jb25zb2xlLmxvZyhVUkxULmdldFF1ZXJ5KCdodHRwOi8vYmFpZHUuY29tP2E9MTAmYj0yMCcpKTtcclxuY29uc29sZS5sb2coVVJMVC5hZGRRdWVyeSgnaHR0cDovL2JhaWR1LmNvbT9hPTEwJmI9MjAnLCB7XHJcbiAgICBkOiAzMCxcclxufSkpO1xyXG5cclxuY29uc29sZS5sb2coVVJMVC5qb2luKCdodHRwOi8vYmFpZHUuY29tL2hoJywgJ2Zhc2QnLCAnZmRzL2ZhZHMvLy9mYWRzL2Zhc2QnKSk7XHJcblxyXG5jb25zb2xlLmxvZyhuZXcgVVJMVCgnP2E9MTAwJmI9MjAwJykuaHJlZik7XHJcblxyXG5jb25zb2xlLmxvZyhuZXcgVVJMVCgnaHR0cDovL2JhaWR1LmNvbScpLmpvaW4oJ2EnLCAnYicsICcvYy9kL1xcXFxcXFxcZS9mJykuaHJlZik7XHJcblxyXG5jb25zb2xlLmxvZyhVUkxULmNvbnRyYXN0KCdodHRwOi8vd3d3LmNvbVxcXFxhXFxcXGIvYy8nLCAnaHR0cDovL3d3dy5jb20vYS9iL2MnKSk7IiwiY29uc3QgeyBCYXNlNjQgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3QvQmFzZTY0Jyk7XHJcblxyXG5jb25zb2xlLmxvZyhCYXNlNjQuZGVjb2RlKEJhc2U2NC5lbmNvZGUoJ+WTiOWTiOWTiCcpKSk7XHJcblxyXG5jb25zb2xlLmxvZyhCYXNlNjQuZW5jb2RlKCflk4jlk4jlk4gnKSk7IiwiY29uc3QgeyBGaWxlVCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC9GaWxlVCcpO1xyXG5jb25zdCB7IEFsaU9TU1QgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3Qvd2ViL0FsaU9TU1QnKTtcclxuY29uc3QgeyBnZXRGaWxlIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9nZXRGaWxlJyk7XHJcblxyXG4vLyDmtYvor5Xmlofku7bliIbniYdcclxuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBsZXQgaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlSW5wdXQnKTtcclxuICAgIGxldCBmaWxlU2hvd0ltZzFFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2hvdzEnKTtcclxuICAgIGxldCBmaWxlU2hvd0ltZzJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2hvdzInKTtcclxuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgICAgICBsZXQgZmlsZSA9IHRhcmdldC5maWxlc1swXTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gRmlsZVQuc2xpY2UoZmlsZSwgMTAyNCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmlofku7bliIbniYfliJfooagnLCBmaWxlcyk7XHJcblxyXG4gICAgICAgIC8vIOmHjeaWsOe7hOijheaIkOWOn+adpeeahOaWh+S7tlxyXG4gICAgICAgIGZpbGVTaG93SW1nMUVsLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoXHJcbiAgICAgICAgICAgIG5ldyBGaWxlKGZpbGVzLCBmaWxlLm5hbWUsIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8v5LiK5Lyg5Yiw6Zi/6YeM5LqRXHJcbiAgICAgICAgbmV3IEFsaU9TU1Qoe1xyXG4gICAgICAgICAgICBhY2Nlc3NLZXlJZDogJ0xUQUk1dDhyYnQ3SEhYbjNlNXZHS2RDQycsXHJcbiAgICAgICAgICAgIGFjY2Vzc0tleVNlY3JldDogJ3czWGR0bVFuZ0cySHJxaFJQOVZjWDhsTlZObkIzUScsXHJcbiAgICAgICAgICAgIGJ1Y2tldDogJ3lheWFsdW95YS10ZXN0JyxcclxuICAgICAgICAgICAgcmVnaW9uOiAnb3NzLWNuLWhhbmd6aG91JyxcclxuICAgICAgICB9KS5zbGljZVVwZGF0ZUZpbGUoZmlsZSwgZmlsZS5uYW1lLCAxMDI0ICogMTAwLCAobikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5LiK5Lyg6L+b5bqmJywgbik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZVNob3dJbWcyRWwuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzZWxlY3RGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVfc2VsZWN0Jyk7XHJcbiAgICBsZXQgc2VsZWN0RmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9zZWxlY3RzJyk7XHJcblxyXG4gICAgc2VsZWN0RmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnZXRGaWxlKCkudGhlbigoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgc2VsZWN0RmlsZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZ2V0RmlsZSgnJywgMikudGhlbigoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59LCAwKTsiLCJjb25zdCB7IEluc3RhbmNlVG9vbCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC9JbnN0YW5jZVRvb2wnKTtcclxuXHJcbmNsYXNzIEEge1xyXG4gICAgYSA9ICfmiJHmmK/kuIDkuKpB55qE5a6e5L6LJztcclxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflrp7kvovljJYnLCAuLi5hcmcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnN0YW5jZVRvb2woJ2knLCB1bmRlZmluZWQsIDEsIDIsIDMsIDQsIDUsIDYpKEEpO1xyXG5cclxuY29uc29sZS5sb2coQS5pKTsiLCJjb25zdCB7IGNyZWF0ZVByb3h5T2JqLCBjbGVhblByb3h5T2JqQ29uLCBhdXRvUk9GLCBnZXRvYmpQcm94eU1hcCB9ID0gcmVxdWlyZShcInlheWFsdW95YS10b29sL2Rpc3Qvb2JqL2NyZWF0ZVByb3h5T2JqXCIpO1xyXG5jb25zdCB7IEJhc2VEYXRhUHJveHkgfSA9IHJlcXVpcmUoXCJ5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9sb2NhbERhdGEvQmFzZURhdGFQcm94eVwiKTtcclxuXHJcbmxldCB0ZXN0RGF0YSA9IGNyZWF0ZVByb3h5T2JqKHtcclxuICAgIGE6IDEwLFxyXG4gICAgYjogWzEsIDIsIDNdLFxyXG4gICAgYzoge1xyXG4gICAgICAgIGE6IDEwLFxyXG4gICAgICAgIGI6IFsxLCAyLCAzXSxcclxuICAgIH0sXHJcbiAgICBkOiB0cnVlLFxyXG4gICAgZTogbnVsbCxcclxufSwge1xyXG4gICAgc2V0KC4uLmFyZykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXQnLCAuLi5hcmcpO1xyXG4gICAgfSxcclxuICAgIGdldCguLi5hcmcpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ2V0JywgLi4uYXJnKTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxud2luZG93LnRlc3REYXRhID0gdGVzdERhdGE7XHJcblxyXG5hdXRvUk9GKCgpID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCfoh6rliqjkvp3otZbmiafooYwnLCB0ZXN0RGF0YS5jLmEpO1xyXG59KTtcclxuXHJcbmNsYXNzIEEgZXh0ZW5kcyBCYXNlRGF0YVByb3h5IHtcclxuICAgIGdldE5ld0RhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYTogMTAsXHJcbiAgICAgICAgICAgIGI6IFsxLCAyLCAzXSxcclxuICAgICAgICAgICAgYzoge1xyXG4gICAgICAgICAgICAgICAgYTogMTAsXHJcbiAgICAgICAgICAgICAgICBiOiBbMSwgMiwgM10sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQ6IHRydWUsXHJcbiAgICAgICAgICAgIGU6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LmxvY2FsVGVzdERhdGEgPSBuZXcgQSgpO1xyXG5cclxud2luZG93LmNsZWFuUHJveHlPYmpDb24gPSBjbGVhblByb3h5T2JqQ29uO1xyXG5cclxuLy8g5byx5byV55So5rWL6K+VXHJcbmxldCBmID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5jID0geyBhOiAyMCB9O1xyXG4gICAgICAgICAgICAgICAgdGVzdERhdGEuYztcclxuICAgICAgICAgICAgICAgIHIoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2V0b2JqUHJveHlNYXAoKSk7XHJcbiAgICB9LCAxMDAwKTtcclxufVxyXG5mKCk7IiwiY29uc3QgeyBPYmplY3RVdGlscyB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC9vYmovT2JqZWN0VXRpbHMnKTtcclxuXHJcbmNvbnNvbGUubG9nKE9iamVjdFV0aWxzLmNsb25lXyh7XHJcbiAgICBhOiAxMCxcclxuICAgIGI6IHsgYzogMSB9LFxyXG59KSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgQ2xpcGJvYXJkIH0gPSByZXF1aXJlKCd5YXlhbHVveWEtdG9vbC9kaXN0L3dlYi9DbGlwYm9hcmQnKTtcclxuXHJcbmNvbnNvbGUubG9nKCd3ZWLnq6/nmoTmtYvor5UnKTtcclxuXHJcbnJlcXVpcmUoJy4vb2JqUHJveHknKTtcclxucmVxdWlyZSgnLi9iYXNlNjQnKTtcclxucmVxdWlyZSgnLi9VUkxUb29sJyk7XHJcbnJlcXVpcmUoJy4vZmlsZVQnKTtcclxucmVxdWlyZSgnLi9pbnN0YW5jZVQnKTtcclxucmVxdWlyZSgnLi9CYXNlRXZlbnQnKTtcclxucmVxdWlyZSgnLi9CYXNlV1MnKTtcclxucmVxdWlyZSgnLi9vYmpUJyk7XHJcbnJlcXVpcmUoJy4vQXJyYXlUJyk7XHJcblxyXG53aW5kb3cuQ2xpcGJvYXJkID0gQ2xpcGJvYXJkO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=