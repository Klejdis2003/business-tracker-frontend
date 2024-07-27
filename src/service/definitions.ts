import AxiosHttpClient from "@/service/tools/axios-http-client";
import {ItemService} from "@/service/item-service";
import AuthService from "@/service/auth-service";
import axios, {HttpStatusCode} from "axios";
import {redirect} from "next/navigation";
import {retrieveSessionId} from "@/service/tools/session";
import {BUSINESS_API, NEXT_SERVER, PRIVATE_API_TOKEN} from "@/constants";

function getAxios(): AxiosHttpClient{
    const axiosHttpClient = AxiosHttpClient.create({
        baseURL: BUSINESS_API,
        maxRedirects: 0,
    });
    axiosHttpClient.addRequestInterceptor(async (config) => {
        const response = await axios.post(
            `${NEXT_SERVER}/auth/decrypt-session`,
            {
                sessionId: await retrieveSessionId(),
                token: PRIVATE_API_TOKEN
            },
            )
        const sessionId = response.data.sessionId;
        const headers = config.headers;
        if(config.url === "/login") return config;
        if(!headers){
            console.log("No headers");
            return config;
        }
        if (sessionId) {
            console.log("Session found");
            const headers = config.headers;
            headers!["Authorization"] = sessionId;
        }
        else throw new axios.Cancel("No session");

        return config;
    });

    axiosHttpClient.addResponseInterceptor(async (response) => {
        console.log("Response interceptor");
        if (response.status === HttpStatusCode.PermanentRedirect || response.status === HttpStatusCode.TemporaryRedirect){
            const newLocation = response.headers["Location"];
            if (newLocation) redirect(newLocation);
        }
        return response;
    });
    return axiosHttpClient;
}

export const httpClient = getAxios();
const axiosHttpClient = axios.create({baseURL: BUSINESS_API});
axiosHttpClient.interceptors.request.use(async (config) => {
    const response = await axios.post(
        `${NEXT_SERVER}/auth/decrypt-session`,
        {
            sessionId: await retrieveSessionId(),
            token: PRIVATE_API_TOKEN
        },
    )
    const sessionId = response.data.sessionId;
    const headers = config.headers;
    if(config.url === "/login") return config;
    if(!headers){
        console.log("No headers");
        return config;
    }
    if (sessionId) {
        console.log("Session found");
        const headers = config.headers;
        headers!["Authorization"] = sessionId;
    }
    else throw new axios.Cancel("No session");

    return config;
});

axiosHttpClient.interceptors.response.use(async (response) => {
    console.log("Response interceptor");
    if (response.status === HttpStatusCode.PermanentRedirect || response.status === HttpStatusCode.TemporaryRedirect){
        const newLocation = response.headers["Location"];
        if (newLocation) redirect(newLocation);
    }
    return response;
});

export {axiosHttpClient};

export const AUTH_SERVICE = new AuthService(httpClient);
export const ITEM_SERVICE = new ItemService(httpClient)
