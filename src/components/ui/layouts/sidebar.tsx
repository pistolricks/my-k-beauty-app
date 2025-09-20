import {buildingStorefront, cog_6Tooth as Cog6ToothIcon, cube, userCircle,} from "solid-heroicons/outline";
import {Icon} from "solid-heroicons";
import {A, useMatch} from "@solidjs/router";
import {Component, For, Show} from "solid-js";
import {cn} from "~/utils";
import {navigationMenu, unauthenticatedSubMenu} from "~/components/ui/layouts/admin";
import {arrowRightOnRectangle} from "solid-heroicons/solid";
import {useAuth} from "~/components/Context";


type PROPS = {
    rid: string,
    store: string,
    isConnected: "connected" | "connecting" | "disconnected",
    onClick: () => void
    isOpen: boolean
}

export const Sidebar: Component<PROPS> = (props) => {
    const {session, signedIn, authenticatedRiman, logout} = useAuth();


    return (
        <>
            <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4 w-16">
                <div class="h-16 mt-6 items-center">
                    <button class={"flex justify-center items-center w-full"} onClick={props.onClick}>
                        <Icon path={cube}
                              aria-hidden="true"
                              class="size-6 text-gray-400 hover:text-emerald-600"
                        />
                    </button>
                </div>


                <nav class="flex flex-1 flex-col h-screen">
                    <ul role="list" class="flex flex-col items-center gap-y-7 h-full">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <For each={signedIn() ? navigationMenu : unauthenticatedSubMenu}>
                                    {(item) => (
                                        <li>
                                            <A
                                                href={item.href}
                                                activeClass="bg-gray-50 text-emerald-600 text-emerald-600"
                                                inactiveClass="text-gray-400 hover:text-emerald-600 hover:bg-gray-50"
                                                class={cn(
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <Icon
                                                    path={item.icon}
                                                    aria-hidden="true"
                                                    class={cn(
                                                        'text-current size-6 shrink-0',
                                                    )}
                                                />
                                                {/*
                                                        {item.name}
                                                        */}
                                            </A>
                                        </li>
                                    )}
                                </For>
                            </ul>
                        </li>


                        <li class="mt-auto flex flex-col items-start">
                            <a
                                href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 uppercase"
                            >
                                <Icon path={userCircle}
                                      aria-hidden="true"
                                      class="size-6 shrink-0 text-gray-400 group-hover:text-emerald-600"
                                />

                            </a>
                            <a
                                href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 uppercase"
                            >
                                <Icon path={buildingStorefront}
                                      aria-hidden="true"
                                      class="size-6 shrink-0 text-gray-400 group-hover:text-emerald-600"
                                />

                            </a>
                            <a
                                href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                            >
                                <Icon path={Cog6ToothIcon}
                                      aria-hidden="true"
                                      class="size-6 shrink-0 text-gray-400 group-hover:text-emerald-600"
                                />

                            </a>
                        </li>

                        <Show
                            fallback={
                                <div
                                    class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600">

                                </div>
                            }
                            when={signedIn()}>
                            <form
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                action={logout} method="post">
                                <button
                                    type="submit"
                                >
                                    <Icon path={arrowRightOnRectangle}
                                          aria-hidden="true"
                                          class="size-6 shrink-0 text-gray-400 group-hover:text-emerald-600"
                                    />
                                </button>
                            </form>
                        </Show>
                    </ul>
                </nav>
            </div>
        </>
    );
}



