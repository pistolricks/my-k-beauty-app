import {Component} from "solid-js";
import {Title} from "@solidjs/meta";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = RouteSectionProps

const Riman: Component<PROPS> = props => {


    return (

        <main>
            <Title>Riman</Title>

            {props.children}

        </main>

    );
};

export default Riman;