import {NextRequest} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {BUSINESS_SERVER, NEXT_SERVER} from "@/constants";

export async function GET(request: NextRequest) {
    const originUrl = request.nextUrl.searchParams.get("redirectUrl") || NEXT_SERVER;
    cookies().set("authOrigin", originUrl, {
        secure: false,
        httpOnly: false,
        maxAge: 60
    })
    // redirect to the login page provided by ktor server
    redirect(`${BUSINESS_SERVER}/login?redirectUrl=${NEXT_SERVER}/auth/callback&method=token`);
}