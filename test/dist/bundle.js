/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
// require('./URLTool');

window.Clipboard = Clipboard;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpQkFBaUI7Ozs7Ozs7VUN6RGpCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLG1FQUFtQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uLi9kaXN0L3dlYi9DbGlwYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3dlYi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNsaXBib2FyZCA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIOWJquWIh+adv+W3peWFt1xyXG4gKi9cclxudmFyIENsaXBib2FyZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENsaXBib2FyZCgpIHtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5LiA5q615a2X56ym5Liy5Yiw5Ymq5YiH5p2/XHJcbiAgICAgKiBAcGFyYW0gX3N0ciDpnIDopoHlpI3liLbnmoTlrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgQ2xpcGJvYXJkLnNldCA9IGZ1bmN0aW9uIChfc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyLCBlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChfc3RyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IF9zdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDku47liarliIfmnb/ojrflj5blhoXlrrlcclxuICAgICAqL1xyXG4gICAgQ2xpcGJvYXJkLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHIsIGUpIHtcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcignJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHIoJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENsaXBib2FyZDtcclxufSgpKTtcclxuZXhwb3J0cy5DbGlwYm9hcmQgPSBDbGlwYm9hcmQ7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCB7IENsaXBib2FyZCB9ID0gcmVxdWlyZSgneWF5YWx1b3lhLXRvb2wvZGlzdC93ZWIvQ2xpcGJvYXJkJyk7XHJcblxyXG5jb25zb2xlLmxvZygnd2Vi56uv55qE5rWL6K+VJyk7XHJcblxyXG4vLyByZXF1aXJlKCcuL29ialByb3h5Jyk7XHJcbi8vIHJlcXVpcmUoJy4vYmFzZTY0Jyk7XHJcbi8vIHJlcXVpcmUoJy4vVVJMVG9vbCcpO1xyXG5cclxud2luZG93LkNsaXBib2FyZCA9IENsaXBib2FyZDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9