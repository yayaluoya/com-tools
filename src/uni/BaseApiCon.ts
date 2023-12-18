import { BaseApiCon as BaseApiCon_ } from '../http/BaseApiCon';
import { HttpStatus } from '../http/HttpStatus';
import { IComApiResType } from '../http/IComApiResType';
import { ResData } from '../http/ResData';
import { ObjectUtils } from '../obj/ObjectUtils';

/**
 * 基类Api控制器
 */
export abstract class BaseApiCon
  extends BaseApiCon_<RequestOptions, RequestSuccessCallbackResult>
  implements IComApiResType<RequestOptions>
{
  /** 可配置选项 */
  protected get op(): Omit<RequestOptions, 'url' | 'data'> {
    return {};
  }

  /**
   * 发送请求
   * 无论成功与否都返回的response
   * @param op 请求配置
   * @returns
   */
  request(op: RequestOptions) {
    //添加请求拦截器
    return this.request_(ObjectUtils.merge(this.op || {}, op))
      .then((config) => {
        return new Promise<RequestSuccessCallbackResult>((r, e) => {
          uni.request({
            ...config,
            success: r,
            fail: e,
          });
        });
      })
      .then((res) => {
        //添加响应拦截
        return this.response_(res);
      });
  }

  requestData<D>(_op: RequestOptions) {
    return this.request(_op)
      .catch((error: GeneralCallbackResult) => {
        throw this.resDataError_(error);
      })
      .then((res) => {
        return this.resData_(res) as ResData<D>;
      });
  }

  getData<D = any>(op: RequestOptions) {
    return this.requestData<D>({
      ...op,
      method: 'GET',
    });
  }

  postData<D = any>(op: RequestOptions) {
    return this.requestData<D>({
      ...op,
      method: 'POST',
    });
  }

  putData<D = any>(op: RequestOptions) {
    return this.requestData<D>({
      ...op,
      method: 'PUT',
    });
  }

  deleteData<D = any>(op: RequestOptions) {
    return this.requestData<D>({
      ...op,
      method: 'DELETE',
    });
  }

  /**
   * 响应数据获取
   * @param res
   * @returns
   */
  protected resData_(res: RequestSuccessCallbackResult) {
    return new ResData().mix(res.data as any);
  }

  /**
   * 响应数据失败处理
   * @param error
   */
  protected resDataError_(error: GeneralCallbackResult) {
    throw new ResData(null, HttpStatus.BAD_REQUEST, error.errMsg || '', Date.now());
  }
}
