'use server';
import {cookies} from "next/headers";

/**
 * @returns The session id from cookies or null if no session id is found.
 */
export async function retrieveSessionId(){
    return cookies().get("sessionId")?.value;
}

/**
 * Creates a session with the given id and sets a secure httpOnly cookie to the response headers.
 */
export async function createSession(id: string): Promise<Session> {
    const session = {
        id: id,
        createdAt: new Date()
    }
    await setSecureCookie({name: "sessionId", value: id});
    return session;
}

/**
 * Sets a secure httpOnly cookie to the response headers.
 * @param cookie The {@link Cookie} to set
 */
export async function setSecureCookie(cookie: Cookie) {
    const {name, value} = cookie;
    cookies().set(name, value, {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 10,
        path: "/",
        }
    );
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


