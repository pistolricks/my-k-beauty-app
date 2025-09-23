import {Component} from "solid-js";
import {RimanProduct} from "~/types";
import {updateCartProducts} from "~/riman/shopping";
import {useAuth} from "~/components/Context";

type PROPS = {
    product: RimanProduct
    class?: string
}

const RimanCartProductsUpdate: Component<PROPS> = props => {
    const {session} = useAuth();
    const product = () => props.product;
    const className = () => props.class;

    return (
        <form class={"p-2"} action={updateCartProducts} method={"post"}>
            <input type={"hidden"} name={"token"} value={session()?.rimanSession?.token as string}/>
            <input type={"hidden"} name={"product_fk"} value={product()?.productPK}/>
            <button type={"submit"}
                    class={className() ?? "mt-4 py-2 text-xs uppercase rounded-lg font-light text-gray-900 border border-gray-200"}>
                Add to Cart
            </button>
        </form>
    );
};

export default RimanCartProductsUpdate;