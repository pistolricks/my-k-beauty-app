import {Component, createEffect} from "solid-js";
import {createAsync, RouteSectionProps} from "@solidjs/router";
import {getBestSellers, getFeaturedProducts, getProducts} from "~/riman/products";
import GridList from "~/components/products/GridList";
import {useAuth} from "~/components/Context";

type PROPS = RouteSectionProps

const Products: Component<PROPS> = props => {
    const {session, setCartKey, getCartKey} = useAuth();
    const all = createAsync(() => getProducts(), {})
    const featured = createAsync(() => getFeaturedProducts(), {})
    const bestSellers = createAsync(() => getBestSellers(), {})


    createEffect(() => console.log("products", all()?.products))

    return (
        <div class={"h-screen overflow-y-auto rounded scrollbar-hide"}>


            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    FEATURED
                </h1>
            </div>
            <GridList path={session()?.rimanSession?.repSiteUrl?.toLowerCase()} products={featured()?.products}/>
            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    Best Sellers
                </h1>
            </div>
            <GridList path={session()?.rimanSession?.repSiteUrl?.toLowerCase()} products={bestSellers()?.products}/>
            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    ALL
                </h1>
            </div>
            <GridList path={session()?.rimanSession?.repSiteUrl?.toLowerCase()} products={all()?.products}/>
        </div>
    );
};

export default Products;