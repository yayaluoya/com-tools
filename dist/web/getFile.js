"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = void 0;
/**
 * 获取一个文件
 * @param accept 文件格式
 * @param length 长度
 * @returns
 */
function getFile(accept, length) {
    if (accept === void 0) { accept = ''; }
    if (length === void 0) { length = 1; }
    return new Promise(function (r, e) {
        var _a;
        var input = document.createElement('input');
        input.type = 'file';
        input.style.setProperty('display', 'none');
        (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.appendChild(input);
        var multiple = length > 1;
        input.accept = accept;
        input.multiple = multiple;
        input.addEventListener('change', function (event) {
            var files = event.target.files;
            if (files && files.length > 0) {
                multiple ? r(files) : r(files[0]);
            }
            else {
                e('未选择文件');
            }
            input.remove();
        });
        input.click();
    });
}
exports.getFile = getFile;
