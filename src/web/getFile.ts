/**
 * 获取一个文件
 * @param accept 文件格式
 * @param length 长度
 * @returns 
 */
export function getFile(accept = '', length = 1) {
    return new Promise<File | File[]>((r, e) => {
        let input = document.createElement('input');
        input.type = 'file';
        input.style.setProperty('display', 'none');
        document?.body?.appendChild(input);
        let multiple = length > 1;
        input.accept = accept;
        input.multiple = multiple;
        input.addEventListener('change', (event) => {
            let files: File[] = (event.target as any).files;
            if (files && files.length > 0) {
                multiple ? r(files) : r(files[0]);
            } else {
                e('未选择文件');
            }
            input.remove();
        });
        input.click();
    });
}