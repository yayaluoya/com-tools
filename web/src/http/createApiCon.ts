/** 父对象键名 */
const parentObjKeyName: symbol = Symbol();
/** key值键名 */
const keyKeyName: symbol = Symbol();

/**
 * 创建api控制器
 * @param _rootPath 根路径
 * @param _apiObj api对象
 * @param _op 选项
 */
export function createApiCon<ApiObj extends object = {}>(_rootPath: string, _apiObj: ApiObj, _op?: {
    /** 路径节点键名 */
    pathNodeKeyName?: string,
}): ApiObj {
    //初始化
    _op = {
        pathNodeKeyName: 'pathNode',
        ..._op,
    };
    /** 递归创建api控制器 */
    function traverse(_apiObj: object) {
        for (let [_i, _item] of Object.entries(_apiObj)) {
            //如果值是方法的话
            if (typeof _item == 'function') {
                //重新赋值一个绑定了代理对象的方法
                _apiObj[_i] = (_item as Function).bind(getPathObjProxy(_apiObj));
            } else if (typeof _item == 'object' && _item) {
                //设置父对象
                _item[parentObjKeyName] = _apiObj;
                //设置键名
                _item[keyKeyName] = _i;
                //递归
                traverse(_item);
            }
        }
    }
    /** 获取一个路径对象代理 */
    function getPathObjProxy(_apiObj: object): {
        path: string,
    } {
        return new Proxy({
            path: ''
        }, {
            get(_, p: string | symbol) {
                switch (true) {
                    case /^\$?(path|api)$/i.test(p as string):
                        //返回一个整理好的路径
                        return _rootPath.replace(/\/+$/, '') + '/' + byApiObjGetPath(_apiObj, _op.pathNodeKeyName).replace(/^\/+/, '').replace(/\/+/g, '/');
                }
            },
        })
    }
    //
    traverse(_apiObj);
    //
    return _apiObj;
}

/** 通过api对象获取路径 */
function byApiObjGetPath(_obj: object, _nodeName: string): string {
    if (!_obj[parentObjKeyName]) { return ''; }
    let _left = byApiObjGetPath(_obj[parentObjKeyName], _nodeName);
    return (_left ? `${_left}/` : '') + (_obj[_nodeName] || _obj[keyKeyName]);
}