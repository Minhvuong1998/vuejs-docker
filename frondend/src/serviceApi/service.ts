import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IFetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: any;
  expectedStatusCode: number;
  revoke?: boolean;
  noAuth?: boolean;
  headers?: any;
}

export interface IOptions {
  /**
   * API endpoint
   */
  endpoint: string;
  accessToken?: string;
  refreshToken?: string;
}

export class Service {
  private option: IOptions;
  constructor(option: IOptions) {
    this.option = option;
  }
  public async fetch<T>(fetchOption: IFetchOptions): Promise<AxiosResponse<T>> {
    try {
      const axiosOption: AxiosRequestConfig = {
        baseURL: this.option.endpoint,
        url: fetchOption.url,
        method: fetchOption.method,
        data: fetchOption.data,
        params: fetchOption.params,
        headers: {},
        validateStatus: (status: number) =>
          status === fetchOption.expectedStatusCode,
      };
      if (fetchOption.noAuth !== true) {
        axiosOption.headers.Authorization = `JWT ${this.option.accessToken}`;
      }
      if (fetchOption.headers !== undefined) {
        axiosOption.headers = {
          ...axiosOption.headers,
          ...fetchOption.headers,
        };
      }
      
      const result = await Axios(axiosOption);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
