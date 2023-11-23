const { ArrayUtils } = require('yayaluoya-tool/ArrayUtils');

/**
 * 数组工具测试
 */
setTimeout(() => {
    let button = document.getElementById('array_random');
    button.addEventListener('click', () => {
        let a = ArrayUtils.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, { 0: 2 });
        console.log(a, ArrayUtils.isRepeat(a));
    });
}, 0);