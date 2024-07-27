import {NextRequest, NextResponse} from "next/server";
import {createSession} from "@/service/tools/session";
import {encryptWithPublicKey} from "@/util/rsa-encryption-util";
import {NEXT_SERVER} from "@/constants";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const sessionIdBase64 = request.nextUrl.searchParams.get("sessionId");
    if(!sessionIdBase64) {
        console.log("No token provided");
        return new Response("No token provided", {status: 401});
    }
    const sessionId = Buffer.from(sessionIdBase64, "base64").toString();
    const encryptedSessionId = encryptWithPublicKey(sessionId);
    await createSession(encryptedSessionId);
    let originUrl: string
    if(cookies().get("authOrigin")){
        originUrl = cookies().get("authOrigin")!.value;
        cookies().delete("authOrigin");
    }
    else {
        originUrl = NEXT_SERVER;
    }
    return NextResponse.redirect(originUrl);
}


