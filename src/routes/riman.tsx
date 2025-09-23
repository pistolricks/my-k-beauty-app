import {Component, createEffect, createMemo, createSignal, Match, Show, Switch} from "solid-js";
import {useAuth} from "~/components/Context";
import {Title} from "@solidjs/meta";
import {RimanPortal} from "~/components/ui/forms/riman-portal";
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
    const {session, authenticatedRiman, getCartKey} = useAuth();

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
        console.log(getCartKey())
    })


    const tabs = createMemo(() => [
        { name: 'Dashboard', path: `/riman`,  href: `/${session()?.rimanSession?.repSiteUrl?.toLowerCase()}/dashboard`, icon: chartBarSquare, current: !!isDashboard() },
        { name: 'Products', path: `/riman`, href: `/${session()?.rimanSession?.repSiteUrl?.toLowerCase()}/products`, icon: shoppingBag, current: !!isProducts() },
        { name: 'Carts', path: `/riman`, href: `/${session()?.rimanSession?.repSiteUrl?.toLowerCase()}/carts`, icon: shoppingCart, current: !!isCarts() },
        { name: 'Shipping', path: `/riman`, href: `/${session()?.rimanSession?.repSiteUrl?.toLowerCase()}/shipping`, icon: truck, current: !!isShipping() },
        { name: 'Orders', path: `/riman`, href: `/${session()?.rimanSession?.repSiteUrl?.toLowerCase()}/orders`, icon: rectangleStack, current: !!isOrders() },
    ])

    return (

        <div>
            <Title>Riman</Title>


            <Switch>
                <Match when={!authenticatedRiman()}>
                    <div class={"flex justify-center items-center h-screen"}>
                        <div class="sm:mx-auto sm:w-full flex flex-col space-y-5 sm:max-w-[480px]">
                            <div
                                class="text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                                <RimanLogo class={"w-full h-full"}/>
                            </div>
                            <div
                                class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                                <RimanPortal/>
                            </div>
                        </div>

                    </div>
                </Match>
            <Match when={authenticatedRiman()}>
                <SectionHeading
                    title={getCartKey() ?? session()?.rimanSession?.repSiteUrl}
                    titleClass={getCartKey() ? "text-emerald-800" : ""}
                    subTitle={session()?.rimanSession?.email}
                    status={getCartKey() ? "SHOPPING" : authenticatedRiman() ? "ONLINE" : "OFFLINE"}
                />

                <MenuX  menu={tabs()}/>


                {props.children}

            </Match>
            </Switch>
        </div>

    );
};

export default RimanLayout;