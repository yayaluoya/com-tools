/**
 * URL工具
 */
export class URLT {
  url: URL;
  /** 是否没有源 */
  private readonly ifNoOrigin: boolean = false;

  /** 获取源 */
  get origin() {
    if (this.ifNoOrigin) {
      return '';
    }
    return this.url.origin;
  }

  /** 完整路径 */
  get href() {
    if (this.ifNoOrigin) {
      // 完整的路径为路径+查询参数+hash
      return `${this.path}${this.url.search}${this.url.hash}`;
    }
    return this.url.href;
  }

  /** 路径 */
  set path(path: string) {
    this.url.pathname = path
      // 统一路径分隔符
      .replace(/\\/g, '/')
      // 去掉多余的路径分隔符
      .replace(/\/{2,}/g, '/')
      // 去掉末尾的路径分隔符
      .replace(/\/$/, '');
  }

  get path(): string {
    return this.url.pathname;
  }

  /** 查询参数 */
  get query(): Record<string, any> {
    let d = {};
    this.url.searchParams.forEach((value: string, key: string) => {
      d[key] = value;
    });
    return d;
  }

  /**
   * 拼接路径路径
   * @param paths
   */
  join(...paths: string[]): this {
    for (let path of paths) {
      this.path = `${this.path}/${path}`;
    }
    return this;
  }

  /**
   * 添加查询参数
   * @param query
   * @param objectHandle object数据处理器
   * @returns
   */
  addQuery(
    query: Record<string, string> = {},
    objectHandle: { (any): string } = JSON.stringify,
  ): this {
    for (let i in query) {
      this.url.searchParams.set(
        i,
        typeof query[i] == 'object' ? objectHandle(query[i]) : query[i],
      );
    }
    return this;
  }

  constructor(path: string, origin?: string) {
    // 如果路径没带协议的话，自动加上http协议
    if (/^\/\//.test(path)) {
      path = `http:${path}`;
    }
    // 如果没加域的话自动加上域，不然会报错
    if (!/^(https?|wss?):\/\//.test(path) && !origin) {
      origin = 'http://localhost/';
      this.ifNoOrigin = true;
    }
    this.url = new URL(path, origin);
    //统一处理下
    this.path = this.path;
  }

  /**
   * 添加查询参数
   * @param url 原url
   * @param query 查询参数
   */
  static addQuery(url: string, query: Record<string, string> = {}): string {
    return new URLT(url).addQuery(query).href;
  }

  /**
   * 获取查询参数
   */
  static getQuery(url: string): Record<string, string> {
    return new URLT(url).query;
  }

  /**
   * 拼接url
   * @param arg
   */
  static join(...arg: string[]): string {
    let urls = arg.map((_) => new URLT(_));
    let oneUrl = urls.splice(0, 1)[0];
    return urls.reduce((a, b) => {
      a.join(b.path);
      return a;
    }, oneUrl).href;
  }

  /**
   * 路径对比
   * @param a
   * @param b
   */
  static contrast(a: string, b: string): boolean {
    return a == b || new URLT(a).href == new URLT(b).href;
  }
}
