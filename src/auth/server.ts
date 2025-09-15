import {redirect} from "@solidjs/router";
import {useSession} from "vinxi/http";
import {getRandomValues, subtle, timingSafeEqual} from "crypto";
import {createUser, loginUser} from "./db";

export interface TOKEN {
    token: string;
    expiry: string;
}

export interface RimanSession {
    id: number;
    repSiteUrl: string;
    username: string;
    email: string;
    token: string;

}

export interface Session {
    id: number;
    name: string;
    email: string;
    token: string;
    rimanSession?: RimanSession;

}

export const getSession = () =>
    useSession<Session>({
        password: process.env.SESSION_SECRET!
    });

export async function createSession(user: Session, redirectTo?: string) {
    const validDest = redirectTo?.[0] === "/" && redirectTo[1] !== "/";
    const session = await getSession();

    await session.update(user);
    return redirect(validDest ? redirectTo : "/");
}



async function createHash(password: string) {
    const salt = getRandomValues(new Uint8Array(16));
    const saltHex = Buffer.from(salt).toString("hex");
    const key = await subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: 100_000,
            hash: "SHA-512"
        },
        await subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
            "deriveBits"
        ]),
        512
    );
    const hash = Buffer.from(key).toString("hex");
    return `${saltHex}:${hash}`;
}

async function checkPassword(storedPassword: string, providedPassword: string) {
    const [storedSalt, storedHash] = storedPassword.split(":");
    if (!storedSalt || !storedHash) throw new Error("Invalid stored password format");
    const key = await subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: Buffer.from(storedSalt, "hex"),
            iterations: 100_000,
            hash: "SHA-512"
        },
        await subtle.importKey("raw", new TextEncoder().encode(providedPassword), "PBKDF2", false, [
            "deriveBits"
        ]),
        512
    );
    const hash = Buffer.from(key);
    const stored = Buffer.from(storedHash, "hex");
    if (stored.length !== hash.length || !timingSafeEqual(stored, hash))
        throw new Error("Invalid email or password");
}

export async function passwordLogin(email: string, password: string) {
    let credentials: { email: string, password: string } = {email, password}

    let res = await loginUser(credentials);

    let session = {id: res.user?.id, name: res.user?.name, email: res?.user.email, token: res?.token?.token, rimanSession: undefined}

    console.log("session", session)

    if (!res.user)
        throw new Error("Invalid email or password");
    else return createSession(session);

}

export async function registerUser(name: string, email: string, password: string) {
    let res = await createUser({
        name,
        email,
        password
    });
    let session = {id: res.user?.id, name: res.user?.name, email: res?.user.email, token: res?.token?.token, rimanSession: undefined}
    if (!res.user)
        return redirect("/login?error");

    return createSession(session);
}