import {NextRequest, NextResponse} from "next/server";
import {decryptWithPrivateKey} from "@/util/rsa-encryption-util";
import {HttpStatusCode} from "axios";

export async function POST(request: NextRequest) {
    const {sessionId, token} = (await request.json())
    if(!sessionId) {
        return NextResponse.json(
            {error: "No session id provided to decrypt"},
            {status: HttpStatusCode.BadRequest});
    }
    if(token != process.env.PRIVATE_API_TOKEN) return NextResponse.json({error: "Invalid token"}, {status: 401});
    console.log(decryptWithPrivateKey(sessionId));
    return NextResponse.json({sessionId: decryptWithPrivateKey(sessionId)});
}