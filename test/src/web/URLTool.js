const { URLTool } = require('yayaluoya-tool/dist/http/URLTool');

console.log(URLTool.getQuery('baidu.com?a=10&b=20'));
console.log(URLTool.addQuery('baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLTool.joinURL('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));