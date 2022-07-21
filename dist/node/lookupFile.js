"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupFile = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/**
 * 递归往上层查找文件
 * @param dir
 * @param formats 这个参数是格式的意思比如 ['a.ts','a.d.ts','a.js']
 * @param pathOnly
 * @returns
 */
function lookupFile(dir, formats, pathOnly) {
    var e_1, _a;
    if (pathOnly === void 0) { pathOnly = false; }
    try {
        for (var formats_1 = __values(formats), formats_1_1 = formats_1.next(); !formats_1_1.done; formats_1_1 = formats_1.next()) {
            var format = formats_1_1.value;
            var fullPath = path_1.default.join(dir, format);
            //如果存在这个路径并且它是个文件的话
            if (fs_1.default.existsSync(fullPath) && fs_1.default.statSync(fullPath).isFile()) {
                //如果只返回路径的话就返回全路径，否则返回文件值
                return pathOnly ? fullPath : fs_1.default.readFileSync(fullPath, 'utf-8');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (formats_1_1 && !formats_1_1.done && (_a = formats_1.return)) _a.call(formats_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // 递归往上层查找
    var parentDir = path_1.default.dirname(dir);
    if (parentDir !== dir) {
        return lookupFile(parentDir, formats, pathOnly);
    }
}
exports.lookupFile = lookupFile;
