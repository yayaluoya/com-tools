const { exec } = require('child_process');
const path = require('path');

console.log('开始打包src');

let a = exec('tsc -w -p ./tsconfig.json', {
    cwd: path.join(__dirname, '../'),
});
a.stdout.setEncoding('utf-8');
a.stdout.on('data', (d) => {
    console.log('common', d);
});
a.stderr.setEncoding('utf-8');
a.stderr.on('data', (err) => {
    console.log('common-err', err);
});

let b = exec('tsc -w -p ./tsconfig-esm.json', {
    cwd: path.join(__dirname, '../'),
});
b.stdout.setEncoding('utf-8');
b.stdout.on('data', (d) => {
    console.log('esm', d);
});
b.stderr.setEncoding('utf-8');
b.stderr.on('data', (err) => {
    console.log('esm-err', err);
});
