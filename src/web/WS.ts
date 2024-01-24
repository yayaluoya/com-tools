import { BaseEvent } from '../BaseEvent';
import { IWS } from '../http/BaseWS';

/**
 * WebSocket的包装体
 */
export class WS extends BaseEvent<'close' | 'error' | 'message' | 'open'> implements IWS {
  /** ws 实例 */
  ws: WebSocket;

  /**
   * 返回当前 WebSocket 的链接状态
   * 0 (WebSocket.CONNECTING) 正在链接中
   * 1 (WebSocket.OPEN) 已经链接并且可以通讯
   * 2 (WebSocket.CLOSING) 连接正在关闭
   * 3 (WebSocket.CLOSED)连接已关闭或者没有链接成功
   */
  get readyState() {
    return this.ws.readyState;
  }

  constructor(url) {
    super();

    this.ws = new WebSocket(url);

    //转换事件
    this.ws.addEventListener('close', (e) => {
      Promise.resolve(this.handleEvent_close(e)).then((_) => {
        this.emit('close', _);
      });
    });
    this.ws.addEventListener('error', (e) => {
      Promise.resolve(this.handleEvent_error(e)).then((_) => {
        this.emit('error', _);
      });
    });
    this.ws.addEventListener('message', (e) => {
      Promise.resolve(this.handleEvent_message(e)).then((_) => {
        this.emit('message', _);
      });
    });
    this.ws.addEventListener('open', (e) => {
      Promise.resolve(this.handleEvent_open(e)).then((_) => {
        this.emit('open', _);
      });
    });
  }

  /** 发送消息 */
  send(data) {
    this.ws.send(data);
  }

  /** 关闭 */
  close() {
    this.ws.close();
  }

  /**
   * 事件处理
   * close
   */
  protected async handleEvent_close(e: WebSocketEventMap['close']) {
    return e;
  }
  /**
   * 事件处理
   * error
   */
  protected async handleEvent_error(e: WebSocketEventMap['error']) {
    return e;
  }
  /**
   * 事件处理
   * message
   */
  protected async handleEvent_message(e: WebSocketEventMap['message']) {
    return e;
  }
  /**
   * 事件处理
   * open
   */
  protected async handleEvent_open(e: WebSocketEventMap['open']) {
    return e;
  }
}
