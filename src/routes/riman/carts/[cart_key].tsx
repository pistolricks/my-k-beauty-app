import {Component, createEffect, createSignal} from "solid-js";
import {cartStatusHandler, getCartDetails} from "~/riman/carts";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {useAuth} from "~/components/Context";
import {RimanCart} from "~/types";

type PROPS = RouteSectionProps


const CartDetails: Component<PROPS> = props => {
    const {session} = useAuth();
    const cart = createAsync(() => getCartDetails(session()?.rimanSession?.token, props.params.cart_key as string), {})
    const [getCart, setCart] = createSignal<RimanCart>()
    const cartStatus = async () => {
        if (!session()?.rimanSession?.token) return;

        let res = await cartStatusHandler(session()?.rimanSession?.token as string, cart()?.cart?.cart_key as string)

        setCart(() => res.cart)

        console.log("res", res)
    }

    createEffect(() => console.log("cart", getCart()))


    return (
        <div class={"flex flex-col gap-y-4 w-full"}>
            <button
                onClick={cartStatus}
                type={"button"}
                class="bg-emerald-500 p-2 text-white"
            >
                STATUS
            </button>
            <span>{JSON.stringify(getCart(), null, 2)}</span>
            <span>{JSON.stringify(cart()?.cart, null, 2)}</span>
        </div>
    );
};

export default CartDetails;