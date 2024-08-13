import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("sessionIDValid", "false");
  return NextResponse.json({ message: "Session cleared" });
}
