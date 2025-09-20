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






        </div>
    );
};

export default Products;