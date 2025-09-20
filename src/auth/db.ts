import {createStorage} from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";
import {query} from "@solidjs/router";
import {apiUrl} from "~/app";
import {TOKEN} from "~/auth/server";

export interface User {
    id: number;
    created_at: string;
    name: string;
    email: string;
    password?: string;
    password_hash?: string;
    activated: boolean;
    version: number;
}

const storage = createStorage({driver: fsLiteDriver({base: "./.data"})});

const fetchRegister = async (userInput: { name: string, email: string, password?: string }) =>
    (await fetch(`${apiUrl}/v1/users`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    ).json()

export async function createUser(data: Pick<User, "name" | "email" | "password">) {

    let userInput = {name: data.name, email: data.email, password: data.password};

    let res: { user: User, token: TOKEN } = await fetchRegister(userInput);

    return res;
}

const fetchLogin = async (userInput: { email: string, password: string }) =>
    (await fetch(`${apiUrl}/v1/tokens/authentication`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    ).json()

export async function loginUser(credentials: { email: string, password: string }) {
    let res: {user: User, token: TOKEN} = await fetchLogin(credentials);
    return res;
}

const fetchUserByID = async (id: number) =>
    (await fetch(`${apiUrl}/v1/users/${id}`)
    ).json()

const fetchUserByEmail = async (email: string) =>
    (await fetch(`${apiUrl}/v1/profile/${email}`)
    ).json()


export async function findUser({ email, id }: { email?: string; id?: number }) {
    if (id) return await fetchUserByID(id);
    if (email) return await fetchUserByEmail(email)
    else return undefined;
}