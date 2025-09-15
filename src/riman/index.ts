import {action} from "@solidjs/router";
import {rimanLogin} from "~/riman/server";
import {getSession} from "~/auth/server";

export const rimanLoginForm = action(async (formData: FormData) => {
    "use server";
    const userName = formData.get("userName");
    const password = formData.get("password");
    if (typeof userName !== "string" || typeof password !== "string")
        return new Error("Email and password are required");

    const { data } = await getSession();
    return await rimanLogin(userName.trim().toLowerCase(), password, data);
});