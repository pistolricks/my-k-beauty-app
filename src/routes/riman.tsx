import {Component, createEffect, createMemo, Show} from "solid-js";
import {useAuth} from "~/components/Context";
import {Title} from "@solidjs/meta";
import {RimanPortal} from "~/components/ui/layouts/riman-portal";
import {RimanLogo} from "~/components/Icons";
import SectionHeading from "~/components/ui/section-heading";
import MenuX from "~/components/ui/MenuX";
import {
    chartBarSquare,
    circleStack,
    rectangleStack,
    shoppingBag,
    shoppingCart,
    truck,
    userCircle
} from "solid-heroicons/outline";
import {RouteSectionProps, useMatch} from "@solidjs/router";


type PROPS = RouteSectionProps







const RimanLayout: Component<PROPS> = props => {
    const {session, authenticatedRiman} = useAuth();

    const isDashboard = useMatch(() => "/riman/dashboard");
    const isProducts = useMatch(() => `/riman/products`);
    const isCarts = useMatch(() => `/riman/carts`);
    const isShipping = useMatch(() => `/riman/shipping`);
    const isOrders = useMatch(() => `/riman/orders`);


    createEffect(() => {
        console.log(isDashboard())
        console.log(isProducts())
        console.log(isCarts())
        console.log(isShipping())
        console.log(isOrders())
    })


    const tabs = createMemo(() => [
        { name: 'Dashboard', path: '/riman',  href: `/dashboard`, icon: chartBarSquare, current: !!isDashboard() },
        { name: 'Products', path: '/riman', href: `/products`, icon: shoppingBag, current: !!isProducts() },
        { name: 'Carts', path: '/riman', href: `/carts`, icon: shoppingCart, current: !!isCarts() },
        { name: 'Shipping', path: '/riman', href: `/shipping`, icon: truck, current: !!isShipping() },
        { name: 'Orders', path: '/riman', href: `/orders`, icon: rectangleStack, current: !!isOrders() },
    ])

    return (

        <div>
            <Title>Riman</Title>


            <Show
                fallback={
                    <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div
                            class="text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                            <RimanLogo class={"w-full h-full"}/>
                        </div>
                        <div
                            class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                            <RimanPortal/>
                        </div>
                    </div>

                }
                when={authenticatedRiman()}>
                <SectionHeading
                    title={session()?.rimanSession?.repSiteUrl}
                    subTitle={session()?.rimanSession?.email}
                    status={authenticatedRiman() ? "ONLINE" : "OFFLINE"}
                />

                <MenuX  menu={tabs()}/>


                {props.children}

            </Show>

        </div>

    );
};

export default RimanLayout;