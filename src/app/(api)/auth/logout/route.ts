import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_API_TOKEN } from "@/constants";
import { clearSession, retrieveSessionId } from "@/service/tools/session";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  console.log(`Route Handler ... Session id is ${await retrieveSessionId()}`);
  const json = await request.json();
  const token = json.token;
  if (token != PRIVATE_API_TOKEN)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  cookies().set("sessionId", "", { maxAge: 0 });
  return NextResponse.json({ message: "Session cleared" });
}
