import {createStorage} from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";
import {query} from "@solidjs/router";
import {baseUrl} from "~/app";

interface User {
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
    (await fetch(`${baseUrl}/v1/users`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    ).json()

export async function createUser(data: Pick<User, "name" | "email" | "password">) {

    let userInput = {name: data.name, email: data.email, password: data.password};

    let res: { user: User, token: string } = await fetchRegister(userInput);

    return res;
}

const fetchLogin = async (userInput: { email: string, password: string }) =>
    (await fetch(`${baseUrl}/v1/tokens/authentication`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    ).json()

export async function findUser(credentials: { email: string, password: string }) {
    let res: {user: User, token: string} = await fetchLogin(credentials);
    return res;
}

const fetchUser = async (id: number) =>
    (await fetch(`${baseUrl}/v1/users/${id}`)
    ).json()