"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlContrast = void 0;
var getComPath_1 = require("./getComPath");
/**
 * 路径对比
 */
function urlContrast(a, b) {
    //先转成通用的路径
    a = (0, getComPath_1.getComPath)(a);
    b = (0, getComPath_1.getComPath)(b);
    //先用==对比一下，提高性能
    return a == b
        //
        || new RegExp("^/?".concat((a || '').replace(/^\/+|\/+$/g, ''), "/?$")).test(b);
}
exports.urlContrast = urlContrast;
