import OAuth from "start-oauth";
import { createUser, findUser } from "~/auth/db";
import { createSession } from "~/auth/server";

export const GET = OAuth({
  password: process.env.SESSION_SECRET!,
  discord: {
    id: process.env.DISCORD_ID!,
    secret: process.env.DISCORD_SECRET!
  },
  async handler({ name, email, password }: {name: string, email: string, password?: string }, redirectTo: any) {
    let user = await findUser({ email });
    if (!user) user = await createUser({name, email, password});
    return createSession(user, redirectTo);
  }
});
