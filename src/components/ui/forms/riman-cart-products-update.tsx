import {Component, createEffect} from "solid-js";
import {RimanProduct} from "~/types";
import {updateProductInCart} from "~/riman/shopping";
import {useAuth} from "~/components/Context";

type PROPS = {
    product: RimanProduct
    class?: string
}

const RimanCartProductsUpdate: Component<PROPS> = props => {
    const {session, getCartKey} = useAuth();
    const product = () => props.product;
    const className = () => props.class;


    createEffect(() => {

        console.log("productPK", product()?.productPK)
    })

    return (
        <form class={"p-2"} action={updateProductInCart} method={"post"}>
            <input type={"hidden"} name={"token"} value={session()?.rimanSession?.token}/>
            <input type={"hidden"} name={"product_fk"} value={product()?.productPK}/>
            <input type={"hidden"} name={"cart_key"} value={getCartKey()}/>
            <input type={"number"} name={"quantity"} value={1} />
            <button type={"submit"}
                    class={className() ?? "mt-4 p-2 text-xs uppercase rounded-lg font-light text-gray-900 border border-gray-200"}>
                Add to Cart
            </button>
        </form>
    );
};

export default RimanCartProductsUpdate;