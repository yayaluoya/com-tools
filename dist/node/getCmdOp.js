"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCmdOp = void 0;
var commander_1 = require("commander");
/**
 * 获取命令行选项
 */
function getCmdOp(hand) {
    var program = new commander_1.Command();
    program.option('-v --version');
    hand && hand(program);
    program.parse(process.argv);
    return program.opts();
}
exports.getCmdOp = getCmdOp;
