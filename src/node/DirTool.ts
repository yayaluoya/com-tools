import { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from "fs";

/**
 * dir工具
 */
export class DirTool {
    /**
     * 同步删除文件夹下的所有内容
     * @param path 
     */
    static delDirChildSync(path) {
        let files = [];
        if (existsSync(path)) {
            files = readdirSync(path);
            files.forEach((file, i) => {
                let curPath = path + "/" + file;
                if (statSync(curPath).isDirectory()) {
                    this.delDirChildSync(curPath); //递归删除文件夹
                    rmdirSync(curPath);
                } else {
                    unlinkSync(curPath); //删除文件
                }
            });
        }
    }
}
