import { ResData } from "../../http/ResData";
import { AliOSST as AliOSST_ } from "../../http/AliYun/AliOSST";

/**
 * 阿里云oss工具
 */
export class AliOSST extends AliOSST_ {
    updateFile(...arg: Parameters<AliOSST_['updateFile']>) {
        return super.updateFile(...arg)
            .catch((e) => {
                console.error('ali-oss上传文件失败', e);
                throw new ResData().fail('上传文件失败');
            });
    }

    sliceUpdateFile(...arg: Parameters<AliOSST_['sliceUpdateFile']>) {
        return super.sliceUpdateFile(...arg)
            .catch((e) => {
                console.error('ali-oss分片上传文件失败', e);
                throw new ResData().fail('上传文件失败');
            });
    }
}