import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {createNewCartHandler, getCarts} from "~/riman/carts";
import {useAuth} from "~/components/Context";
import {RimanCart} from "~/types";
import {A, createAsync} from "@solidjs/router";
import {getProducts} from "~/riman/products";

type PROPS = {}

const Carts: Component<PROPS> = props => {
    const {session} = useAuth();
    const response = createAsync(() => getCarts(), {})
    const [getCart, setCart] = createSignal<RimanCart>()

    const createCart = async () => {
        if (!session()?.rimanSession?.token) return;

        let res = await createNewCartHandler(session()?.rimanSession?.token as string)

        setCart(() => res.cart)
    }


    createEffect(() => {
        console.log("cart", getCart())
    })

    return (
        <div>
            <div class={"w-full py-4"}>
                <CartPanel message={`KEY: ${getCart()?.cart_key ?? "NONE"}`} onClick={createCart}/>
            </div>
            <div class={"w-full py-4"}>
                <CartList carts={response()?.carts}/>
            </div>
        </div>
    );
};

export default Carts;

export function CartPanel(props: {
    message: string
    onClick: () => void
}) {
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
                            class="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:shadow-none dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500"
                        >
                            CREATE CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const CartList: Component<{
    carts: RimanCart[]
}> = (props) => {

    const carts = () => props.carts;

    return (
        <ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
            <Show when={carts()?.length > 0}>
                <For each={carts()}>
                    {(cart) => (
                        <li class="flex items-center justify-between gap-x-6 py-5w-full bg-white shadow sm:rounded-xs dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

                            <div class="px-4 py-5 sm:p-6">
                                <div class="min-w-0">
                                    <div class="flex items-start gap-x-3 uppercase">
                                        SHOP {cart.referrer_site_url}
                                        <p class="text-sm/6 font-semibold text-gray-900  dark:text-white">{cart.cart_key}</p>
                                    </div>
                                    <div
                                        class="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
                                        <p class="whitespace-nowrap">
                                            Created on <time
                                            date-time={cart.date_entered}>{`${cart.date_entered}`}</time>
                                        </p>
                                        <svg viewBox="0 0 2 2" class="size-0.5 fill-current">
                                            <circle r={1} cx={1} cy={1}/>
                                        </svg>
                                        <p class="truncate">Modified {`${cart.date_modified}`}</p>
                                    </div>
                                </div>

                            </div>


                            <A
                                href={`/riman/carts/${cart.cart_key}`}
                                type="button"
                                class="inline-flex mr-6 items-center rounded-xs bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:shadow-none dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500"
                            >
                                VIEW
                            </A>

                        </li>
                    )}
                </For>
            </Show>
        </ul>
    )
}
