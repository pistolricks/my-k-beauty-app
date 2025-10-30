import {apiUrl} from "~/app";
import {Client} from "~/types";
import {User} from "~/auth/db";


const fetchLoginRiman = async (token: string, userInput: { userName: string, password: string }) =>
    (await fetch(`${apiUrl}/v2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(userInput),
        })
    ).json()

export async function loginRiman(token: string, userInput: { userName: string, password: string}) {
    let res: { user: User, client: Client, riman_token: string } = await fetchLoginRiman(token, userInput);
    console.log("user", res.user, "client", res.client, "riman_token", res.riman_token)
    return res;
}