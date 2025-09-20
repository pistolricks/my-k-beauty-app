import {apiUrl} from "~/app";
import {Client} from "~/types";
import {User} from "~/auth/db";


const fetchLoginRiman = async (userInput: { userName: string, password: string }) =>
    (await fetch(`${apiUrl}/v2/token`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    ).json()

export async function loginRiman(credentials: { userName: string, password: string}) {
    let res: { user: User, client: Client, riman_token: string } = await fetchLoginRiman(credentials);
    console.log("user", res.user, "client", res.client, "riman_token", res.riman_token)
    return res;
}