"use server";
import axios, {
    Axios,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig
} from "axios";
import {HttpClient, HttpResponse, UrlParam} from "@/service/tools/http-client";
import {Config} from "tailwindcss";

class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;
  private constructor(client: AxiosInstance, private debuggingMode: boolean = false) {
    this.client = client;
  }
  static create(config: CreateAxiosDefaults): AxiosHttpClient;
  static create(baseURL: string): AxiosHttpClient;
  static create(arg1: CreateAxiosDefaults | string): AxiosHttpClient {
        let config: CreateAxiosDefaults = {};
        if (typeof arg1 === "string") config.baseURL = arg1;
        else  config = arg1;
        return new AxiosHttpClient(axios.create(config));
  }

   addRequestInterceptor(interceptor: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>) {
      this.client.interceptors.request.use(async (config) => {
          return await interceptor(config);
        });
  }

  addResponseInterceptor(interceptor: (response: AxiosResponse) => Promise<AxiosResponse>) {
      this.client.interceptors.response.use(async (response) => {
            return await interceptor(response);
      });
    }

  private mapAxiosResponseToHttpResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
      const transformedHeaders = new Map<string, string>();
      for(const key in response.headers) {
            transformedHeaders.set(key, response.headers[key]);
      }
        return {
            status: response.status,
            headers: transformedHeaders,
            data: response?.data
        }
  }


  async GET<T>(url: string, urlParams: UrlParam[] = []): Promise<HttpResponse<T>> {
      const transformedParams = urlParams.reduce((acc, param) => ({...acc, [param.key]: param.value}), {});
      const response = await this.client.get<T>(url, {params: transformedParams})
      .catch((error) => {
            if (this.debuggingMode) {
                console.error(error);
            }
            throw error;
      });
      return this.mapAxiosResponseToHttpResponse(response);
  }
  async POST<T>(url: string, body?: T): Promise<HttpResponse<T>> {
      const response = await this.client.post<T>(url, body);
      return this.mapAxiosResponseToHttpResponse(response);
  }
  async PUT<T>(url: string, body?: T): Promise<HttpResponse<T>> {
      const response = await this.client.put<T>(url, body);
      return this.mapAxiosResponseToHttpResponse(response);
  }
  async DELETE<T, R>(url: string, urlParams: UrlParam[] = []): Promise<HttpResponse<T>> {
      const response = await this.client.delete<T>(url, {params: urlParams});
      return this.mapAxiosResponseToHttpResponse(response);
  }
}

export default AxiosHttpClient;
