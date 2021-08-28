/**
 * 创建api控制器
 */
export function createApiCon<OP extends object = {}>(_domain: string, _op: OP): OP {
    return _op;
}

let apiCon = createApiCon('http://baidu.com', {
    a: 10,
    func() { },
    c: {
        f: '',
        get() {
            return this.api;
        },
    },
});

console.log(apiCon.c.get());