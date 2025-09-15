import { Title } from "@solidjs/meta";
import { json } from "@solidjs/router";
import { clientOnly, GET } from "@solidjs/start";
import { getServerFunctionMeta } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";
import { useAuth } from "~/components/Context";


const hello = GET(async (name: string) => {
    "use server";
    const e = getRequestEvent()!;
    const { id } = getServerFunctionMeta()!;
    console.log("ID", id, e.locals.foo);
    return json(
        { hello: new Promise<string>(r => setTimeout(() => r(name), 1000)) },
        { headers: { "cache-control": "max-age=60" } }
    );
});

export default function Home() {
  const { session } = useAuth();

  return (
    <main>
      <Title>Home</Title>
      <h1 class="text-center">Hello World</h1>
      <img src="/favicon.svg" alt="logo" class="w-28" />
      You are signed in as <b class="font-medium">{session()?.email}</b>

        <p>{session()?.rimanSession?.id}</p>
        <p>{session()?.rimanSession?.repSiteUrl}</p>
        <p>{session()?.rimanSession?.username}</p>
        <p>{session()?.rimanSession?.email}</p>
        <p>{session()?.rimanSession?.token}</p>


    </main>
  );
}
