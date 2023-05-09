import { BaseEvent } from '../BaseEvent';

/**
 * 获取文件项
 */
export class GetFileItem extends BaseEvent<'change'> {
    private inputEl: HTMLInputElement;
    private _length: number;
    private _accept: string;

    /** 长度 */
    get length() {
        return this._length;
    }

    set length(v) {
        this.inputEl.multiple = v > 1;
        this._length = v;
    }

    /** 选择文件类型 */
    get accept() {
        return this._accept;
    }

    set accept(v) {
        this.inputEl.accept = v;
        this._accept = v;
    }

    constructor(accept = '', length = 1) {
        super();
        let input = document.createElement('input');
        input.type = 'file';
        input.style.setProperty('display', 'none');
        document?.body?.appendChild(input);
        //
        this.inputEl = input;
        this.accept = accept;
        this.length = length;
        //
        input.addEventListener('change', (event) => {
            let files: File[] = [...(event.target as any).files];
            if (files && files.length > 0) {
                this.length > 1 ? this.emit('change', files) : this.emit('change', files[0]);
            }
            input.value = null;
        });
    }

    /**
     * 选择
     */
    select() {
        this.inputEl.click();
    }
}
