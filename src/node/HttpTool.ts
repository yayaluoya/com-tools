import internalIp from "internal-ip";

/**
 * http工具
 */
export class HttpTool {
    /** 主机名字 */
    private static m_hostName: string;

    /**
     * 获取主机地址
     */
    public static get hostname(): string {
        if (!this.m_hostName) {
            this.m_hostName = internalIp.v4.sync();
        }
        //
        return this.m_hostName;
    }
}