const fs = require('fs');
const path = require('path');

try {
  fs.rmSync(path.join(__dirname, '../dist'), {
    recursive: true,
  });
  console.log('dist目录已删除');
} catch (e) {
  console.log('删除错误', e);
}

try {
  fs.rmSync(path.join(__dirname, '../dist_esm'), {
    recursive: true,
  });
  console.log('dist_esm目录已删除');
} catch (e) {
  console.log('删除错误', e);
}
