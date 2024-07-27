import {HttpClient, HttpResponse} from "@/service/tools/http-client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


class AuthService {
    constructor(private httpClient: HttpClient) {}
     startLoginFlow(callbackUrl: string) {
         redirect(`https://localhost:8443/login?redirectUrl=${callbackUrl}&method=token`);
    }

    login(response: HttpResponse<any>): string{
        return response.headers.get("Authorization") as string;
    }

    async logout(): Promise<void> {
        await this.httpClient.GET<void>("/logout");
    }
}

export default AuthService;
