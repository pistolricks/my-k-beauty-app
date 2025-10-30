import {getSession, RimanSession, Session} from "~/auth/server";
import {loginRiman} from "~/riman/auth";
import {redirect} from "@solidjs/router";

export async function createRimanSession(user: Session, rimanSession: RimanSession, redirectTo?: string) {
    const validDest = redirectTo?.[0] === "/" && redirectTo[1] !== "/";
    const session = await getSession();

    await session.update({
        id: user.id,
        name: user.name,
        email: user.email,
        token: user.token,
        rimanSession: rimanSession,
    });
    return redirect(validDest ? redirectTo : "/");
}

export async function rimanLogin(userName: string, password: string, session: Session) {
    let credentials: { userName: string, password: string } = {userName, password}

    console.log(credentials)

    let res = await loginRiman(session?.token, credentials);

    let rimanSession = {
        id: res.client?.id,
        repSiteUrl: res.client?.rep_site_url,
        username: res.client?.username,
        firstName: res.client?.first_name,
        lastName: res.client?.last_name,
        rid: res.client?.riman_user_id,
        email: res.client?.email,
        token: res.client?.token,
    }


    console.log(res?.client, rimanSession)

    if (!res.client)
        throw new Error("Invalid userName or password");
    else return createRimanSession(session, rimanSession, "/riman");

}