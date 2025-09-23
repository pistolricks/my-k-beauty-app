import {createAsync, useLocation, type AccessorWithLatest, useParams} from "@solidjs/router";
import {createContext, useContext, type ParentProps, createSignal, Setter, Accessor, createEffect} from "solid-js";
import { logout, querySession } from "~/auth";
import type { Session } from "~/auth/server";

const Context = createContext<{
  session: AccessorWithLatest<Session | null | undefined>;
  setCartKey: Setter<string>;
  getCartKey: Accessor<string>;
  signedIn: () => boolean;
  authenticatedRiman: () => boolean;
  logout: typeof logout;
}>();

export default function Auth(props: ParentProps) {
  const location = useLocation();
  const params = useParams()
  const session = createAsync(() => querySession(location.pathname), {
    deferStream: true
  });
  const [getCartKey, setCartKey] = createSignal(params?.cart_key)
  const signedIn = () => Boolean(session()?.id);
  const authenticatedRiman = () => Boolean(session()?.rimanSession?.id);

  createEffect(() => {
      console.log("cart_key", getCartKey())
  })

  return (
    <Context.Provider value={{ session, setCartKey, getCartKey, signedIn, authenticatedRiman, logout }}>{props.children}</Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within Auth context");
  return context;
}
