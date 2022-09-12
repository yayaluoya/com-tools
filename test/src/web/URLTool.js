const { URLT } = require('yayaluoya-tool/dist/http/URLT');

console.log('url-tool测试');

console.log(URLT.getQuery('http://baidu.com?a=10&b=20'));
console.log(URLT.addQuery('http://baidu.com?a=10&b=20', {
    d: 30,
}));

console.log(URLT.join('http://baidu.com/hh', 'fasd', 'fds/fads///fads/fasd'));

console.log(new URLT('?a=100&b=200').href);

console.log(new URLT('http://baidu.com').join('a', 'b', '/c/d/\\\\e/f').href);

console.log(URLT.contrast('http://www.com\\a\\b/c/', 'http://www.com/a/b/c'));

let u = new URLT('http://baidu.com?a=10');

u.addQuery({
    a: [1, 2, 3],
    c: {
        b: 10,
    }
});

console.log(u.href, u.query);

console.log('url-tool测试结束');