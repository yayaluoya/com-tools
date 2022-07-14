const { URLT } = require('yayaluoya-tool/dist/http/URLT');

console.log(URLT.getQuery('http://baidu.com?a=10&b=20'));
console.log(URLT.addQuery('http://baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLT.join('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));

console.log(new URLT('?a=100&b=200').href);

console.log(new URLT('http://baidu.com').join('a', 'b', '/c/d///e').href);