import {Component} from "solid-js";
import {createAsync, RouteSectionProps} from "@solidjs/router";
import {getBestSellers, getFeaturedProducts, getProducts} from "~/riman/products";

type PROPS = RouteSectionProps

const ShippingLayout: Component<PROPS> = props => {



    return (
        <div class={"h-screen overflow-y-auto rounded scrollbar-hide"}>

            {props.children}

        </div>
    );
};

export default ShippingLayout;