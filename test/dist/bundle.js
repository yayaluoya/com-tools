/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/http/URLT.js":
/*!****************************!*\
  !*** ../dist/http/URLT.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URLT = void 0;
/**
 * url 工具
 */
var URLT = /** @class */ (function () {
    function URLT(path, origin) {
        /** 是否没有源 */
        this.ifNoOrigin = false;
        if (!/^(https?|ws):\/\//.test(path) && !origin) {
            origin = 'http://localhost/';
            this.ifNoOrigin = true;
        }
        this.url = new URL(path, origin);
        //统一处理下
        this.path = this.path;
    }
    Object.defineProperty(URLT.prototype, "origin", {
        /** 获取源 */
        get: function () {
            if (this.ifNoOrigin) {
                return '';
            }
            return this.url.origin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLT.prototype, "href", {
        /** 完整路径 */
        get: function () {
            if (this.ifNoOrigin) {
                return this.path;
            }
            return this.url.href;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URLT.prototype, "path", {
        get: function () {
            return this.url.pathname;
        },
        /** 路径 */
        set: function (path) {
            this.url.pathname = path.replace(/\/{2,}/g, '/');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 添加路径
     * @param path
     */
    URLT.prototype.addPath = function (path) {
        this.path = "".concat(this.path, "/").concat(path);
    };
    return URLT;
}());
exports.URLT = URLT;


/***/ }),

/***/ "../dist/http/URLTool.js":
/*!*******************************!*\
  !*** ../dist/http/URLTool.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URLTool = void 0;
var URLT_1 = __webpack_require__(/*! ./URLT */ "../dist/http/URLT.js");
/**
 * URL工具
 */
var URLTool = /** @class */ (function () {
    function URLTool() {
    }
    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    URLTool.addQuery = function (_url, _query) {
        if (_query === void 0) { _query = {}; }
        if (!_url) {
            return _url;
        }
        //先提取原_url参数
        var urlStructure = _url.split('?');
        var __url = urlStructure[0];
        var __query = new URLSearchParams(urlStructure[1] || '');
        for (var i in _query) {
            __query.set(i, _query[i]);
        }
        return "".concat(__url, "?").concat(__query.toString());
    };
    /**
     * 获取查询参数
     */
    URLTool.getQuery = function (url) {
        var q = new URLSearchParams(url.split('?')[1] || '');
        var d = {};
        q.forEach(function (value, key) {
            d[key] = value;
        });
        return d;
    };
    /**
     * 拼接URL
     * @param arg
     */
    URLTool.joinURL = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var urls = arg.map(function (_) { return new URLT_1.URLT(_); });
        var oneUrl = urls.splice(0, 1)[0];
        return urls.reduce(function (a, b) {
            a.addPath(b.path);
            return a;
        }, oneUrl).href;
    };
    return URLTool;
}());
exports.URLTool = URLTool;


/***/ }),

/***/ "../dist/web/Clipboard.js":
/*!********************************!*\
  !*** ../dist/web/Clipboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Clipboard = void 0;
/**
 * 剪切板工具
 */
var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    /**
     * 设置一段字符串到剪切板
     * @param _str 需要复制的字符串
     */
    Clipboard.set = function (_str) {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(_str).then(function () {
                    r(true);
                }).then(function () {
                    r(false);
                });
            }
            else {
                try {
                    var input = document.createElement('input');
                    input.value = _str;
                    document.body.append(input);
                    input.select();
                    document.execCommand('copy');
                    input.remove();
                    r(true);
                }
                catch (_a) {
                    r(false);
                }
            }
        });
    };
    /**
     * 从剪切板获取内容
     */
    Clipboard.get = function () {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard.readText().then(function (value) {
                    r(value);
                }).then(function () {
                    r('');
                });
            }
            else {
                r('');
            }
        });
    };
    return Clipboard;
}());
exports.Clipboard = Clipboard;


/***/ }),

/***/ "./src/web/URLTool.js":
/*!****************************!*\
  !*** ./src/web/URLTool.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { URLTool } = __webpack_require__(/*! yayaluoya-tool/dist/http/URLTool */ "../dist/http/URLTool.js");

console.log(URLTool.getQuery('baidu.com?a=10&b=20'));
console.log(URLTool.addQuery('baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLTool.joinURL('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
const { Clipboard } = __webpack_require__(/*! yayaluoya-tool/dist/web/Clipboard */ "../dist/web/Clipboard.js");

console.log('web端的测试');

// require('./objProxy');
// require('./base64');
__webpack_require__(/*! ./URLTool */ "./src/web/URLTool.js");

window.Clipboard = Clipboard;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsaURBQWlELEdBQUc7QUFDcEQsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxZQUFZOzs7Ozs7Ozs7Ozs7QUM1REM7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZTtBQUNmLGFBQWEsbUJBQU8sQ0FBQyxvQ0FBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRDtBQUNBO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNELGVBQWU7Ozs7Ozs7Ozs7OztBQzFERjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpQkFBaUI7Ozs7Ozs7Ozs7O0FDekRqQixRQUFRLFVBQVUsRUFBRSxtQkFBTyxDQUFDLGlFQUFrQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7VUNQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsUUFBUSxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxtRUFBbUM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsdUNBQVc7QUFDbkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi4vZGlzdC9odHRwL1VSTFQuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L2h0dHAvVVJMVG9vbC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4uL2Rpc3Qvd2ViL0NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9VUkxUb29sLmpzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy93ZWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5VUkxUID0gdm9pZCAwO1xyXG4vKipcclxuICogdXJsIOW3peWFt1xyXG4gKi9cclxudmFyIFVSTFQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVUkxUKHBhdGgsIG9yaWdpbikge1xyXG4gICAgICAgIC8qKiDmmK/lkKbmsqHmnInmupAgKi9cclxuICAgICAgICB0aGlzLmlmTm9PcmlnaW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoIS9eKGh0dHBzP3x3cyk6XFwvXFwvLy50ZXN0KHBhdGgpICYmICFvcmlnaW4pIHtcclxuICAgICAgICAgICAgb3JpZ2luID0gJ2h0dHA6Ly9sb2NhbGhvc3QvJztcclxuICAgICAgICAgICAgdGhpcy5pZk5vT3JpZ2luID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cmwgPSBuZXcgVVJMKHBhdGgsIG9yaWdpbik7XHJcbiAgICAgICAgLy/nu5/kuIDlpITnkIbkuItcclxuICAgICAgICB0aGlzLnBhdGggPSB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVVJMVC5wcm90b3R5cGUsIFwib3JpZ2luXCIsIHtcclxuICAgICAgICAvKiog6I635Y+W5rqQICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlmTm9PcmlnaW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmwub3JpZ2luO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVUkxULnByb3RvdHlwZSwgXCJocmVmXCIsIHtcclxuICAgICAgICAvKiog5a6M5pW06Lev5b6EICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlmTm9PcmlnaW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsLmhyZWY7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVSTFQucHJvdG90eXBlLCBcInBhdGhcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmwucGF0aG5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKiog6Lev5b6EICovXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnVybC5wYXRobmFtZSA9IHBhdGgucmVwbGFjZSgvXFwvezIsfS9nLCAnLycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gcGF0aFxyXG4gICAgICovXHJcbiAgICBVUkxULnByb3RvdHlwZS5hZGRQYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiLmNvbmNhdCh0aGlzLnBhdGgsIFwiL1wiKS5jb25jYXQocGF0aCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFVSTFQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVVJMVCA9IFVSTFQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVVJMVG9vbCA9IHZvaWQgMDtcclxudmFyIFVSTFRfMSA9IHJlcXVpcmUoXCIuL1VSTFRcIik7XHJcbi8qKlxyXG4gKiBVUkzlt6XlhbdcclxuICovXHJcbnZhciBVUkxUb29sID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVVJMVG9vbCgpIHtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5p+l6K+i5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gX3VybCDljp91cmxcclxuICAgICAqIEBwYXJhbSBfcXVlcnkg5p+l6K+i5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIFVSTFRvb2wuYWRkUXVlcnkgPSBmdW5jdGlvbiAoX3VybCwgX3F1ZXJ5KSB7XHJcbiAgICAgICAgaWYgKF9xdWVyeSA9PT0gdm9pZCAwKSB7IF9xdWVyeSA9IHt9OyB9XHJcbiAgICAgICAgaWYgKCFfdXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WFiOaPkOWPluWOn191cmzlj4LmlbBcclxuICAgICAgICB2YXIgdXJsU3RydWN0dXJlID0gX3VybC5zcGxpdCgnPycpO1xyXG4gICAgICAgIHZhciBfX3VybCA9IHVybFN0cnVjdHVyZVswXTtcclxuICAgICAgICB2YXIgX19xdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsU3RydWN0dXJlWzFdIHx8ICcnKTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIF9xdWVyeSkge1xyXG4gICAgICAgICAgICBfX3F1ZXJ5LnNldChpLCBfcXVlcnlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoX191cmwsIFwiP1wiKS5jb25jYXQoX19xdWVyeS50b1N0cmluZygpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafpeivouWPguaVsFxyXG4gICAgICovXHJcbiAgICBVUkxUb29sLmdldFF1ZXJ5ID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHZhciBxID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuc3BsaXQoJz8nKVsxXSB8fCAnJyk7XHJcbiAgICAgICAgdmFyIGQgPSB7fTtcclxuICAgICAgICBxLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgZFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDmi7zmjqVVUkxcclxuICAgICAqIEBwYXJhbSBhcmdcclxuICAgICAqL1xyXG4gICAgVVJMVG9vbC5qb2luVVJMID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhcmcgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVybHMgPSBhcmcubWFwKGZ1bmN0aW9uIChfKSB7IHJldHVybiBuZXcgVVJMVF8xLlVSTFQoXyk7IH0pO1xyXG4gICAgICAgIHZhciBvbmVVcmwgPSB1cmxzLnNwbGljZSgwLCAxKVswXTtcclxuICAgICAgICByZXR1cm4gdXJscy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgYS5hZGRQYXRoKGIucGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0sIG9uZVVybCkuaHJlZjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVVJMVG9vbDtcclxufSgpKTtcclxuZXhwb3J0cy5VUkxUb29sID0gVVJMVG9vbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DbGlwYm9hcmQgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiDliarliIfmnb/lt6XlhbdcclxuICovXHJcbnZhciBDbGlwYm9hcmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDbGlwYm9hcmQoKSB7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4gOauteWtl+espuS4suWIsOWJquWIh+adv1xyXG4gICAgICogQHBhcmFtIF9zdHIg6ZyA6KaB5aSN5Yi255qE5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIENsaXBib2FyZC5zZXQgPSBmdW5jdGlvbiAoX3N0cikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAociwgZSkge1xyXG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLmNsaXBib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoX3N0cikudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBfc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICByKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5LuO5Ymq5YiH5p2/6I635Y+W5YaF5a65XHJcbiAgICAgKi9cclxuICAgIENsaXBib2FyZC5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyLCBlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoJycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDbGlwYm9hcmQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQ2xpcGJvYXJkID0gQ2xpcGJvYXJkO1xyXG4iLCJjb25zdCB7IFVSTFRvb2wgfSA9IHJlcXVpcmUoJ3lheWFsdW95YS10b29sL2Rpc3QvaHR0cC9VUkxUb29sJyk7XHJcblxyXG5jb25zb2xlLmxvZyhVUkxUb29sLmdldFF1ZXJ5KCdiYWlkdS5jb20/YT0xMCZiPTIwJykpO1xyXG5jb25zb2xlLmxvZyhVUkxUb29sLmFkZFF1ZXJ5KCdiYWlkdS5jb20/YT0xMCZiPTIwJywge1xyXG4gICAgZDogMzAsXHJcbn0pKTtcclxuXHJcbmNvbnNvbGUubG9nKFVSTFRvb2wuam9pblVSTCgnaHR0cDovL2JhaWR1LmNvbS9oaCcsICdmYXNkJywgJ2Zkcy9mYWRzLy8vZmFkcy9mYXNkJykpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCB7IENsaXBib2FyZCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC93ZWIvQ2xpcGJvYXJkJyk7XHJcblxyXG5jb25zb2xlLmxvZygnd2Vi56uv55qE5rWL6K+VJyk7XHJcblxyXG4vLyByZXF1aXJlKCcuL29ialByb3h5Jyk7XHJcbi8vIHJlcXVpcmUoJy4vYmFzZTY0Jyk7XHJcbnJlcXVpcmUoJy4vVVJMVG9vbCcpO1xyXG5cclxud2luZG93LkNsaXBib2FyZCA9IENsaXBib2FyZDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9