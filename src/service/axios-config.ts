import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { BUSINESS_SERVER, NEXT_SERVER, PRIVATE_API_TOKEN } from "@/constants";
import { retrieveSessionId } from "@/service/tools/session";

export function getConfiguredAxios(): AxiosInstance {
  const axiosHttpClient = axios.create({ baseURL: BUSINESS_SERVER });
  configureInterceptors(axiosHttpClient);
  return axiosHttpClient;
}

/**
 * Configures the request and response interceptors for the axios instance
 * @param axiosInstance The axios instance to configure
 */
function configureInterceptors(axiosInstance: AxiosInstance) {
  configureRequestInterceptors(axiosInstance);
  configureResponseInterceptors(axiosInstance);
}

/**
 * Configures the request interceptors for the axios instance. On every request,
 * the session id is first retrieved using {@link retrieveSessionId} and then decrypted
 * using the private endpoint `/auth/decrypt-session`. The decrypted session id is then
 * added to the request headers using the key `Authorization`.
 * @param axiosInstance The axios instance to configure
 */
function configureRequestInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const encryptedSessionId = await retrieveSessionId();
    const response = await axios.post(`${NEXT_SERVER}/auth/decrypt-session`, {
      sessionId: encryptedSessionId,
      token: PRIVATE_API_TOKEN,
    });
    const sessionId = response.data.sessionId;
    if (sessionId) {
      config.headers.Authorization = sessionId;
    } else throw new axios.Cancel("No session");

    return config;
  });
}

/**
 * Configures the response interceptors for the axios instance. If the response status is
 * {@link HttpStatusCode.Forbidden}, the user is redirected to the login page.
 * @param axiosInstance The axios instance to configure
 */
function configureResponseInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log("Unauthorized. Clearing session...");
      }
      return Promise.reject(error);
    },
  );
}
