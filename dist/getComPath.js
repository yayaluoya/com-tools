"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComPath = void 0;
var path_1 = __importDefault(require("path"));
/**
 * 获取通用的路径
 * 采用/作为路径分隔符
 * @param _path
 */
function getComPath(_path) {
    if (_path === void 0) { _path = ''; }
    return path_1.default.normalize(_path).replace(/\\+/g, '/');
}
exports.getComPath = getComPath;
