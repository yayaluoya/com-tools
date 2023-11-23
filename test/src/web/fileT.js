const { FileT } = require('yayaluoya-tool/web/FileT');
const { AliOSST } = require('yayaluoya-tool/web/AliYun/AliOSST');
const { GetFileItem } = require('yayaluoya-tool/web/GetFileItem');

const fileSelect = new GetFileItem();
const filesSelect = new GetFileItem('', 999);

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

        let aliyunItem = new AliOSST({
            accessKeyId: 'LTAI5t8rbt7HHXn3e5vGKdCC',
            accessKeySecret: 'w3XdtmQngG2HrqhRP9VcX8lNVNnB3Q',
            bucket: 'yayaluoya-test',
            region: 'oss-cn-hangzhou',
        });
        let p;
        if (false) {
            //上传到阿里云
            p = aliyunItem.sliceUpdateFile(file.name, file, {
                partSize: 1024 * 100,
                progress: (n) => {
                    console.log('上传进度', n);
                }
            });
        } else {
            p = aliyunItem.updateFile(file.name, file);
        }
        p.then((url) => {
            console.log(url);
            fileShowImg2El.src = url;
        });
    });

    let selectFile = document.getElementById('file_select');
    let selectFiles = document.getElementById('file_selects');

    fileSelect.on('change', undefined, (file) => {
        console.log(file);
    });
    selectFile.addEventListener('click', () => {
        fileSelect.select();
    });
    filesSelect.on('change', undefined, (file) => {
        console.log(file);
    });
    selectFiles.addEventListener('click', () => {
        filesSelect.select();
    });
}, 0);