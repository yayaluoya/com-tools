/**
 * http状态码
 */
export enum HttpStatus {
  /**
   * 100-199 用于指定客户端应相应的某些动作。
   */

  /** Continue/继续 */
  CONTINUE = 100,
  /** Switching Protocols/转换协议 */
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,

  /**
   * 200-299 用于表示请求成功。
   */

  /** OK/正常 */
  OK = 200,
  /** Created/已创建 */
  CREATED = 201,
  /** Accepted/接受 */
  ACCEPTED = 202,
  /** Non-Authoritative Information/非官方信息 */
  NON_AUTHORITATIVE_INFORMATION = 203,
  /** No Content/无内容 */
  NO_CONTENT = 204,
  /** Reset Content/重置内容 */
  RESET_CONTENT = 205,
  /** Partial Content/局部内容 */
  PARTIAL_CONTENT = 206,

  /**
   * 300-399 用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息。
   */

  /** Multiple Choices/多重选择 */
  AMBIGUOUS = 300,
  /** Moved Permanently */
  MOVED_PERMANENTLY = 301,
  /** Found/找到 */
  FOUND = 302,
  /** See Other/参见其他信息 */
  SEE_OTHER = 303,
  /** Not Modified/为修正 */
  NOT_MODIFIED = 304,
  /** Use Proxy/使用代理 */
  USE_PROXY = 305,
  /** Temporary Redirect/临时重定向 */
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  /**
   * 400-499 用于指出客户端的错误。
   */

  /** Bad Request/错误请求 */
  BAD_REQUEST = 400,
  /** Unauthorized/未授权 */
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  /** Forbidden/禁止 */
  FORBIDDEN = 403,
  /** Not Found/未找到 */
  NOT_FOUND = 404,
  /** Method Not Allowed/方法未允许 */
  METHOD_NOT_ALLOWED = 405,
  /** Not Acceptable/无法访问 */
  NOT_ACCEPTABLE = 406,
  /** Proxy Authentication Required/代理服务器认证要求 */
  PROXY_AUTHENTICATION_REQUIRED = 407,
  /** Request Timeout/请求超时 */
  REQUEST_TIMEOUT = 408,
  /** Conflict/冲突 */
  CONFLICT = 409,
  /** Gone/已经不存在 */
  GONE = 410,
  /** Length Required/需要数据长度 */
  LENGTH_REQUIRED = 411,
  /** Precondition Failed/先决条件错误 */
  PRECONDITION_FAILED = 412,
  /** Request Entity Too Large/请求实体过大 */
  PAYLOAD_TOO_LARGE = 413,
  /** Request URI Too Long/请求URI过长 */
  URI_TOO_LONG = 414,
  /** Unsupported Media Type/不支持的媒体格式 */
  UNSUPPORTED_MEDIA_TYPE = 415,
  /** Requested Range Not Satisfiable/请求范围无法满足 */
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  /** Expectation Failed/期望失败 */
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  TOO_MANY_REQUESTS = 429,

  /**
   * 500-599 用于支持服务器错误。
   */

  /** Internal Server Error/内部服务器错误 */
  INTERNAL_SERVER_ERROR = 500,
  /** Not Implemented/未实现 */
  NOT_IMPLEMENTED = 501,
  /** Bad Gateway/错误的网关 */
  BAD_GATEWAY = 502,
  /** Service Unavailable/服务无法获得 */
  SERVICE_UNAVAILABLE = 503,
  /** Gateway Timeout/网关超时 */
  GATEWAY_TIMEOUT = 504,
  /** HTTP Version Not Supported/不支持的 HTTP 版本 */
  HTTP_VERSION_NOT_SUPPORTED = 505,
}
