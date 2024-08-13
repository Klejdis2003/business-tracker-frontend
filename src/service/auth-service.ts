import {HttpClient, HttpResponse} from "@/service/tools/http-client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {AxiosInstance} from "axios";


class AuthService {
    constructor(private httpClient: AxiosInstance) {}
     startLoginFlow(callbackUrl: string) {
         redirect(`https://localhost:8443/login?redirectUrl=${callbackUrl}&method=token`);
    }

    login(response: HttpResponse<any>): string{
        return response.headers.get("Authorization") as string;
    }

    async logout(): Promise<void> {
        await this.httpClient.get("/logout");
    }
}

export default AuthService;
