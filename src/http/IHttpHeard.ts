/**
 * http常用请求头类型接口
 * 文档地址 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers
 */
export interface IHttpHeard {
    /** Accept 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用MIME 类型来表示。 */
    'Accept'?: string;
    /** Accept-CH 头由服务器设置，以指定客户端应在后续请求中应包含哪些客户端 Client Hints (en-US) 提示头。 */
    'Accept-CH'?: string;
    /** Accept-Charset 请求头用来告知（服务器）客户端可以处理的字符集类型。 */
    'Accept-Charset'?: string;
    /** HTTP 请求头 Accept-Encoding 会将客户端能够理解的内容编码方式——通常是某种压缩算法——进行通知（给服务端）。 */
    'Accept-Encoding'?: string;
    /** Accept-Language 请求头允许客户端声明它可以理解的自然语言，以及优先选择的区域方言 */
    'Accept-Language'?: string;
    /** 服务器使用 HTTP 响应头 Accept-Patch 通知浏览器请求的媒体类型 (media-type) 可以被服务器理解。 */
    'Accept-Patch'?: string;
    /** 服务器使用 HTTP 响应头 Accept-Ranges 标识自身支持范围请求 (partial requests)。 */
    'Accept-Ranges'?: string;
    /** Access-Control-Allow-Credentials 响应头用于在请求要求包含 credentials（Request.credentials 的值为 include）时，告知浏览器是否可以将对请求的响应暴露给前端 JavaScript 代码。 */
    'Access-Control-Allow-Credentials'?: 'true';
    /** 响应首部 Access-Control-Allow-Headers 用于 preflight request（预检请求）中，列出了将会在正式请求的 Access-Control-Request-Headers 字段中出现的首部信息。 */
    'Access-Control-Allow-Headers'?: string;
    /** 响应首部 Access-Control-Allow-Methods 在对 preflight request.（预检请求）的应答中明确了客户端所要访问的资源允许使用的方法或方法列表。 */
    'Access-Control-Allow-Methods'?: string;
    /** Access-Control-Allow-Origin 响应标头指定了该响应的资源是否被允许与给定的来源（origin）共享。 */
    'Access-Control-Allow-Origin'?: string;
    /** 响应标头 Access-Control-Expose-Headers 允许服务器指示那些响应标头可以暴露给浏览器中运行的脚本，以响应跨源请求。 */
    'Access-Control-Expose-Headers'?: string;
    /** The Access-Control-Max-Age 这个响应头表示 preflight request （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息）可以被缓存多久。 */
    'Access-Control-Max-Age'?: string;
    /** 请求头 Access-Control-Request-Headers 出现于 preflight request（预检请求）中，用于通知服务器在真正的请求中会采用哪些请求头。 */
    'Access-Control-Request-Headers'?: string;
    /** 请求头 Access-Control-Request-Method 出现于 preflight request（预检请求）中，用于通知服务器在真正的请求中会采用哪种 HTTP 方法。 */
    'Access-Control-Request-Method'?: string;
    /** Age 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。 */
    'Age'?: string;
    /** Allow 首部字段用于枚举资源所支持的 HTTP 方法的集合。 */
    'Allow'?: string;
    /** Alt-Svc 全称为“Alternative-Service”，直译为“备选服务”。该头部列举了当前站点备选的访问方式列表。 */
    'Alt-Svc'?: string;
    /** HTTP Authorization 请求标头用于提供服务器验证用户代理身份的凭据，允许访问受保护的资源。 */
    'Authorization'?: string;
    /** Cache-Control 通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。 */
    'Cache-Control'?: string;
    /** Clear-Site-Data 响应头，表示清除当前请求网站有关的浏览器数据（cookie，存储，缓存）。 */
    'Clear-Site-Data'?: string;
    /** Connection 通用标头控制网络连接在当前会话完成后是否仍然保持打开状态。 */
    'Connection'?: 'keep-alive' | 'close';
    /** 在常规的 HTTP 应答中，Content-Disposition 响应标头指示回复的内容该以何种形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地。 */
    'Content-Disposition'?: string | 'inline' | 'attachment';
    /** 实体消息首部 Content-Encoding 列出了对当前实体消息（消息荷载）应用的任何编码类型，以及编码的顺序。 */
    'Content-Encoding'?: string;
    /** Content-Language 是一个 entity header（实体消息首部），用来说明访问者希望采用的语言或语言组合，这样的话用户就可以根据自己偏好的语言来定制不同的内容。 */
    'Content-Language'?: string;
    /** Content-Length 是一个实体消息首部，用来指明发送给接收方的消息主体的大小，即用十进制数字表示的八位元组的数目。 */
    'Content-Length'?: string;
    /** Content-Location 首部指定的是要返回的数据的地址选项。 */
    'Content-Location'?: string;
    /** 在 HTTP 协议中，响应首部 Content-Range 显示的是一个数据片段在整个文件中的位置。 */
    'Content-Range'?: string;
    /** HTTP 响应头 Content-Security-Policy 允许站点管理者控制用户代理能够为指定的页面加载哪些资源。 */
    'Content-Security-Policy'?: string;
    /** HTTP **Content-Security-Policy-Report-Only**响应头允许 web 开发人员通过监测 (但不强制执行) 政策的影响来尝试政策。 */
    'Content-Security-Policy-Report-Only'?: string;
    /** Content-Type 实体头部用于指示资源的 MIME 类型 media type 。 */
    'Content-Type'?: string;
    /** Cookie 是一个 HTTP 请求标头，其中含有先前由服务器通过 Set-Cookie 标头投放或通过 JavaScript 的 Document.cookie 方法设置，然后存储到客户端的 HTTP cookie 。 */
    'Cookie'?: string;
    /** HTTP Cross-Origin-Embedder-Policy (COEP) 响应标头可防止文档加载未明确授予文档权限 (通过 CORP (en-US) 或者 CORS) 的任何跨域资源。 */
    'Cross-Origin-Embedder-Policy'?: string;
    /** Cross-Origin-Resource-Policy 响应头会指示浏览器阻止对指定资源的无源跨域/跨站点请求。 */
    'Cross-Origin-Resource-Policy'?: string;
    /** Date 是一个通用首部，其中包含了报文创建的日期和时间。 */
    'Date'?: string;
    /** Digest 响应 HTTP 头提供了请求资源一个 摘要 。 */
    'Digest'?: string;
    /** ETag HTTP 响应头是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web 服务器不需要发送完整的响应。而如果内容发生了变化，使用 ETag 有助于防止资源的同时更新相互覆盖（“空中碰撞”）。 */
    'ETag'?: string;
    /** Expect 是一个请求消息头，包含一个期望条件，表示服务器只有在满足此期望条件的情况下才能妥善地处理请求。 */
    'Expect'?: string;
    /** Expect-CT 标头允许站点选择性地报告和/或执行证书透明度（Certificate Transparency）要求，来防止错误签发的网站证书的使用不被察觉。 */
    'Expect-CT'?: string;
    /** Expires 响应头包含日期/时间，即在此时候之后，响应过期。 */
    'Expires'?: string;
    /** Forwarded 首部中包含了代理服务器的客户端的信息，即由于代理服务器在请求路径中的介入而被修改或丢失的信息。 */
    'Forwarded'?: string;
    /** 请求首部 From 中包含一个电子邮箱地址，这个电子邮箱地址属于发送请求的用户代理的实际掌控者的人类用户。 */
    'From'?: string;
    /** Host 请求头指明了请求将要发送到的服务器主机名和端口号。 */
    'Host'?: string;
    /** 请求首部 If-Match 的使用表示这是一个条件请求。 */
    'If-Match'?: string;
    /** If-Modified-Since 是一个条件式请求首部，服务器只在所请求的资源在给定的日期时间之后对内容进行过修改的情况下才会将资源返回，状态码为 200 。 */
    'If-Modified-Since'?: string;
    /** If-None-Match 是一个条件式请求首部。 */
    'If-None-Match'?: string;
    /** If-Range HTTP 请求头字段用来使得 Range 头字段在一定条件下起作用：当字段值中的条件得到满足时，Range 头字段才会起作用，同时服务器回复206 部分内容状态码，以及**Range** 头字段请求的相应部分；如果字段值中的条件没有得到满足，服务器将会返回 200 OK 状态码，并返回完整的请求资源。 */
    'If-Range'?: string;
    /** HTTP 协议中的 If-Unmodified-Since 消息头用于请求之中，使得当前请求成为条件式请求：只有当资源在指定的时间之后没有进行过修改的情况下，服务器才会返回请求的资源，或是接受 POST 或其他 non-safe 方法的请求。 */
    'If-Unmodified-Since'?: string;
    /** Keep-Alive 是一个通用消息头，允许消息发送者暗示连接的状态，还可以用来设置超时时长和最大请求数。 */
    'Keep-Alive'?: string;
    /** Last-Modified 是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 */
    'Last-Modified'?: string;
    /** HTTP 实体报头 Link 提供了序列化 HTTP 头部链接的方法。 */
    'Link'?: string;
    /** Location 首部指定的是需要将页面重新定向至的地址。 */
    'Location'?: string;
    /** Max-Forwards 请求标头被用于限制 TRACE 方法可经过的服务器（通常指代理服务器）数目。 */
    'Max-Forwards'?: string;
    /** 请求标头 Origin 表示了请求的来源（协议、主机、端口）。 */
    'Origin'?: string;
    /** **Permissions-Policy**响应头提供了一种可以在本页面或包含的 iframe 上启用或禁止浏览器特性的机制。 */
    'Permissions-Policy'?: string;
    /** The HTTP Proxy-Authenticate 是一个响应首部，指定了获取 proxy server（代理服务器）上的资源访问权限而采用的身份验证方式。 */
    'Proxy-Authenticate'?: string;
    /** Proxy-Authorization 是一个请求首部，其中包含了用户代理提供给代理服务器的用于身份验证的凭证。 */
    'Proxy-Authorization'?: string;
    /** The Range 是一个请求首部，告知服务器返回文件的哪一部分。 */
    'Range'?: string;
    /** Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。 */
    'Referer'?: string;
    /** Referrer-Policy 首部用来监管哪些访问来源信息——会在 Referer 中发送——应该被包含在生成的请求当中。 */
    'Referrer-Policy'?: string;
    /** 在 HTTP 协议中，响应首部 Retry-After 表示用户代理需要等待多长时间之后才能继续发送请求。 */
    'Retry-After'?: string;
    /** Sec-Fetch-Dest Fetch 元数据请求标头指示请求的目标，即数据的来源以及如何使用这些获取到的数据。 */
    'Sec-Fetch-Dest'?: string;
    /** Sec-Fetch-Mode 获取元数据标头表明了一个请求的模式。 */
    'Sec-Fetch-Mode'?: string;
    /** Sec-Fetch-Site 获取元数据标头表明了一个请求发起者的来源与目标资源来源之间的关系。 */
    'Sec-Fetch-Site'?: string;
    /** Sec-Fetch-User 获取元数据标头表明了一个导航请求是否由用户激活触发。 */
    'Sec-Fetch-User'?: string;
    /** Sec-WebSocket-Accept 头（header）用在 websocket 开放握手中。 */
    'Sec-WebSocket-Accept'?: string;
    /** Server 首部包含了处理请求的源头服务器所用到的软件相关信息。 */
    'Server'?: string;
    /** Server-Timing 标头传达在一个给定请求 - 响应周期中的一个或多个参数和描述。 */
    'Server-Timing'?: string;
    /** 响应标头 Set-Cookie 被用来由服务器端向用户代理发送 cookie，所以用户代理可在后续的请求中将其发送回服务器。 */
    'Set-Cookie'?: string;
    /** SourceMap HTTP 响应头链接生成的代码到一个 source map，使浏览器能够重建原始的资源然后显示在调试器里。 */
    'SourceMap'?: string;
    /** HTTP Strict-Transport-Security（通常简称为 HSTS）响应标头用来通知浏览器应该只通过 HTTPS 访问该站点，并且以后使用 HTTP 访问该站点的所有尝试都应自动重定向到 HTTPS。 */
    'Strict-Transport-Security'?: string;
    /** TE 请求型头部用来指定用户代理希望使用的传输编码类型。 */
    'TE'?: string;
    /** 响应头 Timing-Allow-Origin 用于指定特定站点，以允许其访问Resource Timing API提供的相关信息，否则这些信息会由于跨源限制将被报告为零 */
    'Timing-Allow-Origin'?: string;
    /** Trailer 是一个响应首部，允许发送方在分块发送的消息后面添加额外的元信息，这些元信息可能是随着消息主体的发送动态生成的，比如消息的完整性校验，消息的数字签名，或者消息经过处理之后的最终状态等。 */
    'Trailer'?: string;
    /** Transfer-Encoding 消息首部指明了将 entity 安全传递给用户所采用的编码形式。 */
    'Transfer-Encoding'?: string;
    /** Upgrade-Insecure-Requests 是一个请求首部，用来向服务器端发送信号，表示客户端优先选择加密及带有身份验证的响应，并且它可以成功处理 upgrade-insecure-requests CSP (en-US) 指令。 */
    'Upgrade-Insecure-Requests'?: string;
    /** User-Agent 首部包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号。 */
    'User-Agent'?: string;
    /** Vary 是一个 HTTP 响应头部信息，它决定了对于未来的一个请求头，应该用一个缓存的回复 (response) 还是向源服务器请求一个新的回复。 */
    'Vary'?: string;
    /** Via 是一个通用首部，是由代理服务器添加的，适用于正向和反向代理，在请求和响应首部中均可出现。 */
    'Via'?: string;
    /** HTTP WWW-Authenticate 响应标头定义了 HTTP 身份验证的方法（“质询”），它用于获取特定资源的访问权限。 */
    'WWW-Authenticate'?: string;
    /** X-Content-Type-Options HTTP 消息头相当于一个提示标志，被服务器用来提示客户端一定要遵循在 Content-Type 首部中对 MIME 类型 的设定，而不能对其进行修改。 */
    'X-Content-Type-Options'?: string;
    /** X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 <frame>、<iframe>、<embed> 或者 <object> 中展现的标记。 */
    'X-Frame-Options'?: string;

    //
    [key: string]: string;
}