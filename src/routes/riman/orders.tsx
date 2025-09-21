import {Component} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = RouteSectionProps

const OrdersLayout: Component<PROPS> = props => {


    return (
        <div class={"h-screen overflow-y-auto rounded scrollbar-hide"}>

            {props.children}

        </div>
    );
};

export default OrdersLayout;