import {Component, createEffect, createSignal, ErrorBoundary, For, Show, Suspense} from "solid-js";
import {cartStatusHandler, createNewCartHandler, getCarts} from "~/riman/carts";
import {useAuth} from "~/components/Context";
import {RimanCart} from "~/types";
import {A, createAsync, revalidate} from "@solidjs/router";
import {Format} from "@ark-ui/solid";

type PROPS = {}

export const route = {
    preload: () => getCarts(),
};

const Carts: Component<PROPS> = props => {
    const {session} = useAuth();
    const response = createAsync(() => getCarts())
    const [getCart, setCart] = createSignal<RimanCart>()

    const createCart = async () => {
        if (!session()?.rimanSession?.token) return;

        let res = await createNewCartHandler(session()?.token, session()?.rimanSession?.token as string)

        setCart(() => res.cart)

        await revalidate(getCarts.key);

    }



    createEffect(() => {
        console.log("cart", getCart())
    })

    return (
        <div class={"h-screen overflow-y-auto rounded scrollbar-hide"}>
            <div class={"w-full py-4"}>
                <CartPanel actionMessage={"CREATE"} message={"Create a new cart instance."} onClick={createCart}/>
            </div>
            <div class={"w-full py-4"}>
                <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CartList path={session()?.rimanSession?.repSiteUrl?.toLowerCase()} carts={response()?.carts}/>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>

    );
};

export default Carts;

export function CartPanel(props: {
    message: string
    actionMessage: string
    onClick: () => void
}) {

    const actionMessage = () => props.actionMessage ?? "CART";

    return (
        <div
            class="w-full bg-white shadow sm:rounded-xs dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white">Cart</h3>
                <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div class="max-w-xl text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            {props.message}
                        </p>
                    </div>
                    <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
                        <button
                            onClick={props.onClick}
                            type="button"
                            class="inline-flex items-center rounded-xs bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:shadow-none dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500"
                        >
                            {actionMessage()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const CartList: Component<{
    path: string,
    carts: RimanCart[]
}> = (props) => {

    const path = () => props.path;
    const carts = () => props.carts;


    return (
        <ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
            <Show when={carts()?.length > 0}>
                <For each={carts().reverse()}>
                    {(cart) => (
                        <li class="flex items-center justify-between gap-x-6 py-5 w-full bg-white shadow sm:rounded-xs dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

                            <div class="px-4 py-5 sm:p-6">
                                <div class="min-w-0">
                                    <div class="flex items-start gap-x-3 uppercase">
                                        SHOP {cart.referrer_site_url}
                                        <p class="text-sm/6 font-semibold text-gray-900  dark:text-white">{cart.cart_key}</p>
                                    </div>
                                    <div
                                        class="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
                                        <p class="whitespace-nowrap">
                                            Created on <Format.RelativeTime value={new Date(cart?.date_entered)}/>
                                        </p>
                                        <svg viewBox="0 0 2 2" class="size-0.5 fill-current">
                                            <circle r={1} cx={1} cy={1}/>
                                        </svg>
                                        <p class="truncate">Modified <Format.RelativeTime
                                            value={new Date(cart?.date_modified)}/></p>
                                    </div>
                                </div>

                            </div>

                            <div class={"mr-6 gap-x-2  flex justify-end"}>


                            <A
                                href={`/riman/${path()}/carts/${cart.cart_key}`}
                                type="button"
                                class="inline-flex items-center rounded-xs bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:shadow-none dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500"
                            >
                                VIEW
                            </A>
                            </div>
                        </li>
                    )}
                </For>
            </Show>
        </ul>
    )
}
