import {Component, createEffect, createSignal} from "solid-js";
import {Title} from "@solidjs/meta";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = RouteSectionProps

const Riman: Component<PROPS> = props => {
    const [getShopPath, setShopPath] = createSignal(props.params.shop_path)


    createEffect(() => {
        setShopPath(() => props.params.shop_path)
        console.log("shop path", getShopPath())
    })


    return (

        <main>
            <Title>Riman</Title>

            {props.children}

        </main>

    );
};

export default Riman;