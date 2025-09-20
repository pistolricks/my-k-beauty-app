import {Component} from "solid-js";
import {createAsync} from "@solidjs/router";
import {
    getBestSellers,
    getBrandSpotlight,
    getFeaturedProducts,
    getFunctions, getLovedProducts,
    getProducts, getRemainingProducts, getRitual,
    getSelections, getSubCategories
} from "~/riman/products";
import GridList from "~/components/products/GridList";

type PROPS = {}

const Products: Component<PROPS> = props => {

    const all = createAsync(() => getProducts(), {})
    const featured = createAsync(() => getFeaturedProducts(), {})
    const bestSellers = createAsync(() => getBestSellers(), {})


    return (
        <div class={"h-screen overflow-y-auto rounded scrollbar-hide"}>





            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    FEATURED
                </h1>
            </div>
            <GridList products={featured()?.products}/>
            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                 Best Sellers
                </h1>
            </div>
            <GridList products={bestSellers()?.products}/>
            <div class="px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                  ALL
                </h1>
            </div>
            <GridList products={all()?.products}/>
        </div>
    );
};

export default Products;