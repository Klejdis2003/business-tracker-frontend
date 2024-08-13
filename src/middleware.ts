import { NextRequest, NextResponse } from "next/server";
import { retrieveSessionId } from "@/service/tools/session";
import { NEXT_SERVER } from "@/constants";
import { businessApiClient } from "@/service/definitions";
import { HttpStatusCode } from "axios";

export async function middleware(request: NextRequest) {
  const session = await retrieveSessionId();
  const loginUrl = `${NEXT_SERVER}/auth/login?redirectUrl=${request.nextUrl}`;

  if (!session) return NextResponse.redirect(loginUrl);

  try {
    const response = await businessApiClient.get("/validate-session");
    if (response.status == HttpStatusCode.Ok) return NextResponse.next();
  } catch (e: any) {
    if (e.response?.status === HttpStatusCode.Unauthorized)
      return NextResponse.redirect(loginUrl);
    return NextResponse.next();
  }
}

export const config = {
  //everything except /auth/**
  matcher: ["/((?!auth/).*)"],
};
