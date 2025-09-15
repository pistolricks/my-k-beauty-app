import {Component, createEffect, createSignal, Show} from "solid-js";
import {A, RouteSectionProps, useMatch, useNavigate} from "@solidjs/router";
import {cn} from "~/utils";
import {
    bars_3 as Bars3Icon,
    chartPie as ChartPieIcon,
    home as HomeIcon,
    magnifyingGlass as MagnifyingGlassIcon,
    shoppingBag as ShoppingBagIcon,
    shoppingCart as ShoppingCartIcon,
    truck as TruckIcon,
    userCircle,
    userPlus,
} from "solid-heroicons/outline";
import {Icon} from "solid-heroicons";
import {signal} from "solid-heroicons/solid";
import {Sidebar} from "./sidebar";


import BaseDrawer, {DrawerContent} from "~/components/ui/BaseDrawer";
import Drawer from "@corvu/drawer";
import {useAuth} from "~/components/Context";


export const navigationMenu = [
    {name: 'Home', href: '/', icon: HomeIcon, current: true},
    {name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false},
    {name: 'Shipping', href: '/shipping', icon: TruckIcon, current: false},
    {name: 'Products', href: '/products', icon: ShoppingBagIcon, current: false},
    {name: 'Reports', href: '/reports', icon: ChartPieIcon, current: false},
]

export const unauthenticatedSubMenu = [
    {name: 'Login', href: '/login', icon: userCircle, current: true},
    {name: 'Register', href: '/register', icon: userPlus, current: true},
]


export const defaultSubMenu: [] = []


const Admin: Component<RouteSectionProps> = (props) => {
    const {session, signedIn, authenticatedRiman, logout} = useAuth();
    const isHome = useMatch(() => "/");
    const isAbout = useMatch(() => "/about");
    const isRegister = useMatch(() => "/register");
    const isLogin = useMatch(() => "/login");
    const isRimanLogin = useMatch(() => "/riman/login");


    const [getSidebarOpen, setSidebarOpen] = createSignal(false)


    const [getMode, setMode] = createSignal("INTERACTIVE")


    const navigate = useNavigate()


    createEffect(() => {
        console.log("getMode", getMode())


        console.log("getSidebarOpen", getSidebarOpen())


        console.log(getSidebarOpen())
    })


    return (
        <>
            <div class={"min-h-screen flex flex-col h-screen"}>
                {/* DIALOG */}
                <BaseDrawer contextId={'admin-drawer'} side={"right"}>
                    {/* Static sidebar for desktop */}
                    <div class={
                        cn(
                            getSidebarOpen() ? "w-0 sm:w-36 lg:w-72 border-r border-gray-400" : "w-16",
                            "fixed inset-y-0 z-50 flex flex-col"
                        )}>

                        <Sidebar
                            isOpen={getSidebarOpen()}
                            onClick={() => setSidebarOpen(p => (!p))}
                            isConnected={authenticatedRiman() ? "connected" : "disconnected"}
                            store={`${session()?.rimanSession?.repSiteUrl}`}
                            rid={`${session()?.rimanSession?.username}`}
                        />
                        {/* Sidebar component, swap this element with another sidebar if you like */}

                    </div>

                    <div class={cn(
                        getSidebarOpen() ? "pl-0 sm:pl-36 lg:pl-72" : "pl-16",
                        'flex flex-row overflow-y-hidden h-16'
                    )}>
                        <header
                            class="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center  border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:pr-8">


                            <div class="flex justify-between items-center space-x-1">
                                <Show

                                    fallback={
                                        <>
                                            <A
                                                href={"/register"}
                                                class={`px-3 py-2 text-sky-600 uppercase transition-colors duration-200  ${
                                                    isRegister() ? "text-sky-900" : "border-transparent hover:text-sky-700"
                                                }`}
                                            >
                                                Register
                                            </A>
                                            <div aria-hidden="true" class=" h-8 w-px bg-gray-200 mx-4"/>
                                            <A
                                                href={"/login"}
                                                class={`px-3 py-2 text-sky-600 uppercase transition-colors duration-200  ${
                                                    isLogin() ? "text-sky-900" : "border-transparent hover:text-sky-700"
                                                }`}
                                            >
                                                Login
                                            </A>
                                        </>
                                    }
                                    when={signedIn()}>


                                <span
                                    class={" text-sm uppercase text-gray-500"}>{session()?.name}</span>

                                    <div aria-hidden="true" class="hidden lg:block mx-4 lg:h-6 lg:w-px lg:bg-gray-200"/>
                                    <Show
                                        fallback={<span
                                            class={"text-sm uppercase text-gray-500"}>{session()?.rimanSession?.repSiteUrl}</span>}
                                        when={!authenticatedRiman()}>
                                        <A
                                            href={"/riman/login"}
                                            class={`px-3 text-sm py-2 text-sky-600 uppercase transition-colors duration-200  ${
                                                isRimanLogin() ? "text-sky-900" : "border-transparent hover:text-sky-700"
                                            }`}
                                        >
                                            Riman Portal
                                        </A>


                                    </Show>
                                </Show>
                            </div>

                            {/* Separator */}


                            <div aria-hidden="true" class=" h-8 w-px bg-gray-200"/>

                            <div class="flex flex-1 sm:gap-x-4 self-stretch lg:gap-x-6">

                                <form action="#" method="get" class=" flex-1 grid-cols-1">
                                    <input
                                        name="search"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        class="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                                    />
                                    <Icon path={MagnifyingGlassIcon}
                                          aria-hidden="true"
                                          class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                                    />
                                </form>
                                <div class="flex items-center justify-end w-full gap-x-4 lg:gap-x-6">

                                    <span class="sr-only">View notifications</span>
                                    <Icon path={signal} aria-hidden="true" class={cn(
                                        authenticatedRiman() ? 'text-emerald-600 animate-pulse' : 'text-gray-400',
                                        'size-6')}
                                    />


                                    {/* Separator */}
                                    <div aria-hidden="true" class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"/>

                                    {/* Profile dropdown */}
                                    <Drawer.Trigger contextId={"admin-drawer"} type="button"
                                                    class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">

                                        <span class="sr-only">Open sidebar</span>
                                        <Icon path={Bars3Icon} aria-hidden="true" class="size-6"/>

                                    </Drawer.Trigger>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div class={
                        cn(
                            getSidebarOpen() ? "pl-0 sm:pl-36 lg:pl-72" : "pl-16",
                            'flex-1 flex flex-row overflow-y-hidden'
                        )}>
                        <main class="flex-1">

                            <DrawerContent side={"right"} contextId={'admin-drawer'} class={"bg-white"}>


                            </DrawerContent>

                            <div class={"overflow-hidden sm:overflow-y-auto h-full"}>
                                {props.children}
                            </div>
                        </main>
                    </div>
                </BaseDrawer>
            </div>
        </>
    )
}
export default Admin;