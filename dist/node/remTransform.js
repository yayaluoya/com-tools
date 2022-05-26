var fs = require('fs');
var path = require('path');
// rem px 单位转换
readFile(path.join(__dirname, '../src'));
//获取所有文件
function readFile(url) {
    var stat = fs.statSync(url);
    //如果是目录的话
    if (stat.isDirectory()) {
        fs.readdirSync(url).forEach(function (_) {
            readFile(path.join(url, _));
        });
    }
    else if (stat.isFile()) {
        if (/\.vue$/.test(url)) {
            var str = fs.readFileSync(url).toString();
            //转化内容
            fs.writeFileSync(url, vueTransform(str));
        }
    }
}
/**
 * vue文件转换
 * @param {*} str
 * @returns
 */
function vueTransform(str) {
    return str.replace(/(<style.*?>)([\s\S]*)(<\/style>)/, function (_, a, style, c) {
        return "".concat(a).concat(unitTra(style)).concat(c);
    });
}
/**
 * 转换单位
 * @param {*} str
 * @returns
 */
function unitTra(str) {
    //转换之前的rem
    str = str.replace(/([0-9\.]+)rem/g, function (_, n) {
        return "".concat(parseFloat((parseFloat(n) * 75).toFixed(4)), "rem");
    });
    //所有px都转换成rem
    str = str.replace(/([0-9\.]+)px/g, function (_, n) {
        return "".concat(parseFloat(parseFloat(n).toFixed(4)), "rem");
    });
    return str;
}
