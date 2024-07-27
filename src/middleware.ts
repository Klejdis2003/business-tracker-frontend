import {NextRequest, NextResponse} from "next/server";
import {retrieveSessionId} from "@/service/tools/session";
import {BUSINESS_API, NEXT_SERVER} from "@/constants";

export async function middleware(request: NextRequest) {
    const session = await retrieveSessionId();
    if (!session) {
        return NextResponse.redirect(`${NEXT_SERVER}/auth/login?redirectUrl=${request.nextUrl}`);
    }
    return NextResponse.next();

}

export const config = {
    //everything except /auth/**
    matcher: ['/((?!auth/).*)']
}
