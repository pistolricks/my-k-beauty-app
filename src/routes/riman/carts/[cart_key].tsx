import {Component} from "solid-js";
import {getCartDetails} from "~/riman/carts";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";

type PROPS = RouteSectionProps

export const route = {
    preload: ({ params }: {params: any}) => getCartDetails(params.cart_key as string),
} satisfies RouteDefinition;


const CartDetails: Component<PROPS> = props => {

    const cart = createAsync(() => getCartDetails(props.params.cart_key as string), {})

    return (
        <div>

        </div>
    );
};

export default CartDetails;