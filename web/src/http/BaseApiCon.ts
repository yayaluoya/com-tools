import { ApiTool } from "./ApiTool";
import axios from "axios";

/**
 * 基类api控制器
 */
export class BaseApiCon {
    /**
     * 获取api
     * @param domainName 域
     * @param _name 名字
     * @param arg 其他参数
     * @returns 
     */
    static getApi(domainName, _name, ...arg) {
        return ApiTool.getApi(domainName, _name, ...arg);
    }

    /**
     * 发送axios请求
     * @param _url 请求url
     * @param _method 请求方法
     * @param _params 请求参数
     * @returns 
     */
    static axios(_url, _method, _params = undefined) {
        return axios({
            method: _method,
            url: _url,
            headers: {},
            data: _params,
        });
    }

    /**
     * 发送axios请求
     * @param _url 请求url
     * @param _method 请求方法
     * @param _params 请求参数
     * @returns 
     */
    static fetch(_url, _method, _params = undefined) {
        return fetch(_url, {
            method: _method,
            headers: {},
            body: _params,
        });
    }
}