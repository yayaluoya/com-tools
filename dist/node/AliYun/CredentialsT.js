"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsT = void 0;
var ali_oss_1 = __importDefault(require("ali-oss"));
/**
 * 凭证管理
 */
var CredentialsT = /** @class */ (function () {
    function CredentialsT(op) {
        this.op = op;
        this.sts = new ali_oss_1.default.STS(op);
    }
    /**
     * 获取临时访问凭证
     * @returns
     */
    CredentialsT.prototype.getSts = function (roleArn) {
        return this.sts.assumeRole(roleArn).then(function (result) {
            return result.credentials;
        });
    };
    return CredentialsT;
}());
exports.CredentialsT = CredentialsT;
