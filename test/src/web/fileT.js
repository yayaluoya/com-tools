const { FileT } = require('yayaluoya-tool/dist/FileT');
const { AliOSST } = require('yayaluoya-tool/dist/web/AliOSST');

// 测试文件分片
setTimeout(() => {
    let inputEl = document.getElementById('fileInput');
    let fileShowImg1El = document.getElementById('fileShow1');
    let fileShowImg2El = document.getElementById('fileShow2');
    inputEl.addEventListener('change', ({ target }) => {
        let file = target.files[0];

        let files = FileT.slice(file, 1024 * 100);

        console.log('文件分片列表', files);

        // 重新组装成原来的文件
        fileShowImg1El.src = URL.createObjectURL(
            new File(files, file.name, {
                type: file.type,
            })
        )

        //上传到阿里云
        new AliOSST({
            accessKeyId: 'LTAI5t8rbt7HHXn3e5vGKdCC',
            accessKeySecret: 'w3XdtmQngG2HrqhRP9VcX8lNVNnB3Q',
            bucket: 'yayaluoya-test',
            region: 'oss-cn-hangzhou',
        }).sliceUpdateFile(file, file.name, 1024 * 100, (n) => {
            console.log('上传进度', n);
        })
            .then((url) => {
                fileShowImg2El.src = url;
            });
    });
}, 0);