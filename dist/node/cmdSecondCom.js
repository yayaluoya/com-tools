"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdSecondCom = void 0;
var chalk_1 = __importDefault(require("chalk"));
var readline_1 = __importDefault(require("readline"));
/**
 * * readline 简介
    readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。
    readline 模块提供了用于从可读流（例如 process.stdin）每次一行地读取数据的接口。
    可以用它来模拟命令行，非常方便
 */
/**
 * 命令行二次确定
 */
function cmdSecondCom(title) {
    return new Promise(function (r, e) {
        var rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //
        rl.question(chalk_1.default.cyan(title), function (input) {
            rl.close();
            r(input);
        });
    });
}
exports.cmdSecondCom = cmdSecondCom;
