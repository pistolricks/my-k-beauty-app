import {Component, createEffect, createSignal, Show} from "solid-js";
import {cartStatusHandler, getCartDetails} from "~/riman/carts";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {useAuth} from "~/components/Context";
import {RimanCart} from "~/types";
import {check, xMark} from "solid-heroicons/solid";
import {Icon} from "solid-heroicons";
import {cn} from "~/utils";

type PROPS = RouteSectionProps


const CartDetails: Component<PROPS> = props => {
    const {session, setCartKey, getCartKey} = useAuth();
    const cart = createAsync(() => getCartDetails(session()?.rimanSession?.token, props.params.cart_key as string), {})
    const [getCart, setCart] = createSignal<RimanCart>()
    const [showIsCart, setIsCart] = createSignal<boolean>(getCartKey() === props.params.cart_key)
    const cartStatus = async () => {
        if (!session()?.rimanSession?.token) return;

        let res = await cartStatusHandler(session()?.rimanSession?.token as string, cart()?.cart?.cart_key as string)

        setCart(() => res.cart)

        console.log("res", res)
    }

    const handleSelectCart = () => {
        setCartKey(() => props.params.cart_key)
    }

    const handleUnselectCart = () => {
        setCartKey()
    }

    createEffect(() => {
        setIsCart(() => getCartKey() === props.params.cart_key)
        console.log("cart", getCartKey())
        console.log("cart", getCart())
        console.log("showIsCart", showIsCart())
    })


    return (
        <div class={"h-full w-full"}>
            <div class={"flex flex-col gap-y-4 h-full w-full"}>
                <span>{JSON.stringify(getCart(), null, 2)}</span>
                <span>{JSON.stringify(cart()?.cart, null, 2)}</span>
            </div>


            <div class={"absolute bottom-0 inset-x-0 w-full"}>
                <div class={"flex justify-end items-center"}>
                    <Show
                        fallback={
                            <button
                                onClick={handleSelectCart}
                                type={"button"}

                            >
                                <Icon path={check} class={cn(
                                    "size-10",
                                    "bg-gray-400/40 p-2 text-white")}/>
                            </button>

                        }
                        when={showIsCart()}>
                        <button
                            onClick={handleUnselectCart}
                            type={"button"}
                        >
                            <Icon path={check} class={cn(
                                "size-10",
                                showIsCart() ? "bg-emerald-400 p-2 text-white" : "bg-gray-400/40 p-2 text-white")}/>
                        </button>
                    </Show>


                </div>
            </div>
        </div>
    );
};

export default CartDetails;