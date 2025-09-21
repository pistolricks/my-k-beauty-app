import {Component, createEffect, createMemo, createSignal, Show} from "solid-js";
import {A, RouteSectionProps, useMatch, useNavigate} from "@solidjs/router";
import {cn} from "~/utils";
import {bars_3 as Bars3Icon, bookmarkSquare, home as HomeIcon, userCircle, userPlus,} from "solid-heroicons/outline";
import {Icon} from "solid-heroicons";
import {signal} from "solid-heroicons/solid";
import {Sidebar} from "./sidebar";


import BaseDrawer, {DrawerContent} from "~/components/ui/BaseDrawer";
import Drawer from "@corvu/drawer";
import {useAuth} from "~/components/Context";
import ClipboardCopy from "~/components/clipboard-copy";

export const baseUrl = "http://localhost:3000"


export const defaultSubMenu: [] = []


const Admin: Component<RouteSectionProps> = (props) => {
    const {session, signedIn, authenticatedRiman, logout} = useAuth();



    const isAbout = useMatch(() => `/about`);
    const isRegister = useMatch(() => `/register`);
    const isLogin = useMatch(() => `/login`);
    const isRiman = useMatch(() => `/riman`);

    const authenticated = createMemo(() => [
        {name: 'Home', href: baseUrl, icon: HomeIcon, current: true},
        {name: 'Riman', href: `${baseUrl}/riman`, icon: bookmarkSquare, current: !!isRiman()},
    ])


    const unauthenticated = createMemo(() => [
        {name: 'Login', href: `${baseUrl}/login`, icon: userCircle, current: !!isLogin()},
        {name: 'Register', href: `${baseUrl}/register`, icon: userPlus, current: !!isRegister()},
    ])

    const [getSidebarOpen, setSidebarOpen] = createSignal(false)


    const [getMode, setMode] = createSignal("INTERACTIVE")


    const navigate = useNavigate()


    createEffect(() => {
        console.log("getMode", getMode())


        console.log("isHome", true)
        console.log("isAbout", isAbout())
        console.log("isRegister", isRegister())
        console.log("isLogin", isLogin())
        console.log("isRiman", isRiman())

        console.log("getSidebarOpen", getSidebarOpen())


        console.log(getSidebarOpen())
    })


    return (
        <>
            <div class={"min-h-screen flex flex-col h-screen fixed inset-0"}>
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
                            authenticated={authenticated()}
                            unauthenticated={unauthenticated()}
                        />
                        {/* Sidebar component, swap this element with another sidebar if you like */}

                    </div>

                    <div class={cn(
                        getSidebarOpen() ? "pl-0 sm:pl-36 lg:pl-72" : "pl-16",
                        'flex flex-row overflow-y-hidden  border-b border-gray-200'
                    )}>
                        <header
                            class="sticky top-0 z-40 flex  w-full shrink-0 items-center   bg-gray-200 px-4 py-2 shadow-xs sm:gap-x-6 sm:px-6 lg:pr-8">


                            <div class="flex justify-between items-center space-x-1">
                                <Show

                                    fallback={
                                        <>
                                            <A
                                                href={"/register"}
                                                class={`px-3 py-2 text-sky-600 uppercase transition-colors duration-200  ${
                                                    !isRegister() ? "text-sky-900" : "border-transparent hover:text-sky-700"
                                                }`}
                                            >
                                                Register
                                            </A>
                                            <div aria-hidden="true" class=" h-8 w-px bg-gray-200 mx-4"/>
                                            <A
                                                href={"/login"}
                                                class={`px-3 py-2 text-sky-600 uppercase transition-colors duration-200  ${
                                                    !isLogin() ? "text-sky-900" : "border-transparent hover:text-sky-700"
                                                }`}
                                            >
                                                Login
                                            </A>
                                        </>
                                    }
                                    when={signedIn()}>


                                <span
                                    class={" text-sm uppercase text-gray-500"}>{session()?.name}</span>
                                    <div aria-hidden="true" class=" h-8 w-px bg-gray-200 mx-4"/>

                                    <Show
                                        fallback={
                                            <span
                                                class={"text-sm uppercase text-gray-500"}>

                                            <ClipboardCopy classRoot={"text-sm uppercase"} success={"TOKEN COPIED"}
                                                           value={session()?.rimanSession?.repSiteUrl}>
                                                <span
                                                    class={"uppercase text-emerald-700 size-5"}>{session()?.rimanSession?.repSiteUrl}</span>
                                            </ClipboardCopy>

                                        </span>
                                        }
                                        when={!authenticatedRiman() && isRiman()}>
                                        <></>

                                    </Show>
                                </Show>
                            </div>

                            {/* Separator */}


                            <div class="flex flex-1 sm:gap-x-4 self-stretch lg:gap-x-6">


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
                            'flex flex-row overflow-y-hidden'
                        )}>
                        <DrawerContent side={"right"} contextId={'admin-drawer'} class={"bg-white"}>


                        </DrawerContent>
                        <main class="flex w-full">

                            <div class={"overflow-hidden w-full h-full"}>
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