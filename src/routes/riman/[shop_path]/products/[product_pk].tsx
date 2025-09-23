import {Component, createEffect, createSignal, Show} from "solid-js";
import {cartStatusHandler, getCartDetails} from "~/riman/carts";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {useAuth} from "~/components/Context";
import {RimanCart, RimanProduct} from "~/types";
import {check, xMark} from "solid-heroicons/solid";
import {Icon} from "solid-heroicons";
import {cn} from "~/utils";
import {getProductDetail} from "~/riman/products";
import RimanCartProductsUpdate from "~/components/ui/forms/riman-cart-products-update";

type PROPS = RouteSectionProps


const ProductDetails: Component<PROPS> = props => {
    const {session} = useAuth();
    const res = createAsync(() => getProductDetail(session()?.rimanSession?.token, props.params.product_pk as string), {})
    const [getProduct, setProduct] = createSignal<RimanProduct>(res()?.product)



    createEffect(() => {
        setProduct(() => res()?.product)
        console.log("res", res())
        console.log("getProduct", getProduct())
    })


    return (
        <div class={"h-full w-full"}>
            <div class={"flex flex-col gap-y-4 h-full w-full"}>

                <RimanCartProductsUpdate product={getProduct()}/>


                <span>{JSON.stringify(res(), null, 2)}</span>

            </div>


            <div class={"absolute bottom-0 inset-x-0 w-full"}>
                <div class={"flex justify-end items-center"}>



                </div>
            </div>
        </div>
    );
};

export default ProductDetails;