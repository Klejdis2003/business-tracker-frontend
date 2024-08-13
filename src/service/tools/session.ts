"use server";
import { cookies } from "next/headers";
import { SESSION_MAX_AGE } from "@/constants";

/**
 * @returns The session id from cookies or null if no session id is found.
 */
export async function retrieveSessionId() {
  return cookies().get("sessionId")?.value;
}

/**
 * Creates a session with the given id and sets a secure httpOnly cookie to the response headers.
 */
export async function createSession(id: string): Promise<Session> {
  const session = {
    id: id,
    createdAt: new Date(),
  };
  await setSecureCookie({ name: "sessionId", value: id });
  return session;
}

/**
 * Sets a secure httpOnly cookie to the response headers.
 * @param cookie The {@link Cookie} to set
 */
export async function setSecureCookie(cookie: Cookie) {
  const { name, value } = cookie;
  cookies().set(name, value, {
    secure: false,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

export async function clearSession() {
  cookies().set("sessionId", "", { maxAge: 0 });
}
interface Cookie {
  name: string;
  value: string;
}
interface Session {
  id: string;
  createdAt: Date;
}

export default Session;
