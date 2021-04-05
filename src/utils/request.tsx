import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import serviceConfig from 'scripts/service';

export class Request {
  private baseConfig: AxiosRequestConfig = {
    baseURL: serviceConfig.domain,
    headers: {},
    timeout: 8000,
  };

  // axios实例
  private instance: AxiosInstance = axios.create(this.baseConfig);

  public constructor() {
    this.setReqInterceptors();
    this.setResnterceptors();
  }

  // 设置请求头
  public setHeader = (headers: any) => {
    this.baseConfig.headers = { ...this.baseConfig.headers, ...headers };
    this.instance = axios.create(this.baseConfig);
    this.setReqInterceptors();
    this.setResnterceptors();
  };

  // get请求
  public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
    this.instance({
      ...{ url, method: 'get', params: data },
      ...config,
    });

  // post请求
  public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
    this.instance({
      ...{ url, method: 'post', data },
      ...config,
    });

  // 请求拦截器
  private setReqInterceptors = () => {
    this.instance.interceptors.request.use(
      config => config,
      err => {
        $message.error('请求失败');
        return Promise.reject(err);
      },
    );
  };

  // 响应拦截器
  private setResnterceptors = () => {
    this.instance.interceptors.response.use(
      res => {
        const { code, data, msg } = res.data;
        if (code === 200) {
          return data;
        }
        $message.error(msg || '获取数据失败');
        return Promise.reject(res);
      },
      err => {
        $message.error('服务器响应失败');
        return Promise.reject(err);
      },
    );
  };
}

export default new Request();
