import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { DirTool } from "./DirTool";
/**
 * 本地数操作工具
 * 仿前端接口的一个同步文件数据管理工具
 */
export class LocalStorage_ {
    /** 
     * 获取数据存储路径
     * TODO 需要重写
     */
    protected static get getPath(): string {
        return join(process.cwd(), '_localData');
    }

    /** 获取数据存储路径 */
    private static getDataPath(key: string): string {
        return join(this.getPath, `/${key}.json`);
    }

    /**
     * 保存数据
     * @param key 名字
     * @param value 值
     * @param _f 设置前处理
     */
    static setItem(key: string, value: any, _f?: (s: string) => string) {
        value = _f ? _f(JSON.stringify(value)) : JSON.stringify(value);
        //直接写入文件
        writeFileSync(this.getDataPath(key), value);
    }

    /**
     * 获取数据
     * @param key 名字
     * @param _f 获取前处理
     */
    static getItem<D = any>(key: string, _f?: (s: string) => string): D | null {
        try {
            let s = readFileSync(this.getDataPath(key)).toString();
            //从本地数据存储文件夹中找到目标文件并读取获取出来并序列化成目标类型的数据
            return JSON.parse(_f ? _f(s) : s);
        } catch {
            //说明该数据有误或者本来就没有，应该删除这个文件
            this.removeItem(key);
            return null;
        }
    }

    /**
     * 删除数据
     * @param key 名字
     */
    static removeItem(key: string) {
        try {
            unlinkSync(this.getDataPath(key));
        } catch { };
    }

    /**
     * 清理本地的全部数据
     */
    static clear() {
        DirTool.delDirChildSync(this.getPath);
    }
}