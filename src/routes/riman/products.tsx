import {Component} from "solid-js";
import {createAsync} from "@solidjs/router";
import {getProducts} from "~/riman/products";
import GridList from "~/components/products/GridList";

type PROPS = {

}

const Products: Component<PROPS> = props => {

    const response = createAsync(() => getProducts(), {})

    return (
        <div>
            <GridList products={response()?.products} />
        </div>
    );
};

export default Products;