/**
 * 通过一个url下载文件到本地
 * @param _url 地址
 * @param _name 文件保存名字
 */
export function byUrlLoadFile(_url: string, _name?: string) {
    let a = document.createElement('a');
    a.href = _url;
    a.download = _name;
    a.click();
}