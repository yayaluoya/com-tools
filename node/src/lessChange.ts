import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';

const _changeDir = path.resolve(__dirname, '../pages/');
const matchReg = /\.less$/;

console.log('less转换监听中。。。');

// 监听文件
chokidar.watch(_changeDir).on('all', (event, _path) => {
    if (event == 'change' && matchReg.test(_path)) {
        //在同级目录下生成普通的wxss文件
        let _newPath = _path.replace(matchReg, '.wxss');
        child_process.execSync(`lessc ${_path} > ${_newPath}`);
        //替换图片
        let _content = fs.readFileSync(_newPath).toString();
        _content = _content.replace(/url\("(.*)"\)/g, (_, _url) => {
            let _imgContent = fs.readFileSync(path.resolve(path.dirname(_path), _url));
            let _base64 = Buffer.from(_imgContent).toString('base64');
            return `url("data:image/${path.extname(_url).replace(/^\./, '')};base64,${_base64}")`;
        });
        fs.writeFileSync(_newPath, _content);
        //提示
        console.log('文件变化', _newPath, new Date());
    }
});