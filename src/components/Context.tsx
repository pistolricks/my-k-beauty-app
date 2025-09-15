import { createAsync, useLocation, type AccessorWithLatest } from "@solidjs/router";
import { createContext, useContext, type ParentProps } from "solid-js";
import { logout, querySession } from "~/auth";
import type { Session } from "~/auth/server";

const Context = createContext<{
  session: AccessorWithLatest<Session | null | undefined>;
  signedIn: () => boolean;
  authenticatedRiman: () => boolean;
  logout: typeof logout;
}>();

export default function Auth(props: ParentProps) {
  const location = useLocation();
  const session = createAsync(() => querySession(location.pathname), {
    deferStream: true
  });
  const signedIn = () => Boolean(session()?.id);
  const authenticatedRiman = () => Boolean(session()?.rimanSession?.id);
  return (
    <Context.Provider value={{ session, signedIn, authenticatedRiman, logout }}>{props.children}</Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within Auth context");
  return context;
}
