const { ArrayUtils } = require('yayaluoya-tool/dist/ArrayUtils');

/**
 * 数组工具测试
 */
setTimeout(() => {
    let button = document.getElementById('array_random');
    button.addEventListener('click', () => {
        console.log(ArrayUtils.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4));
    });
}, 0);