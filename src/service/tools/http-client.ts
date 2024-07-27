export interface UrlParam {
  key: string;
  value: string;
}

export interface HttpClient{
  /**
   * GET request
   * @param url The URL to send the request to
   * @param urlParams The URL parameters to send with the request, e.g [{key: "id", value: "123"}]
   * @returns The response data of type T or the full response of type R
   */
  GET<T>(url: string, urlParams?: Array<UrlParam>): Promise<HttpResponse<T>>;
  POST<T>(url: string, body?: T): Promise<HttpResponse<T>>;
  PUT<T>(url: string, body?: T): Promise<HttpResponse<T>>;
  DELETE<T, R>(url: string, urlParams?: Array<UrlParam>): Promise<HttpResponse<T>>;
}

export interface HttpHeader {
    key: string;
    value: string;

}
export interface HttpResponse<T> {
  status: number;
  headers: Map<string, string>
  error?: string;
  data?: T;
  blob?: () => Promise<Blob>;
}

