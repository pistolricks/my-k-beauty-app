

import {Component, createEffect, For} from "solid-js";

import {cn} from "~/utils";

import {Icon} from "solid-heroicons";
import {A} from "@solidjs/router";
import {baseUrl} from "~/app";





const MenuX: Component<{
    menu: {name: string, path: string, href: string, icon: any, current: boolean}[]
}> = (props) => {


    const menu = () => props.menu;


    createEffect(() => {
        console.log("menu", menu())
    })


    return (
        <div class={"w-full bg-white"}>
            <div class="w-full">
                <div class="w-full flex justify-center items-center border-b border-gray-200 dark:border-white/10">
                    <nav aria-label="Tabs" class="-mb-px flex space-x-12">
                        <For each={menu()}>
                        {(tab) => (
                            <A
                                href={`${baseUrl}${tab.path}${tab.href}`}
                                aria-current={tab.current ? 'page' : undefined}
                                class={cn(
                                    tab.current
                                        ? 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300',
                                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                                )}
                            >
                                <Icon
                                    path={tab.icon}
                                    aria-hidden="true"
                                    class={cn(
                                        tab.current
                                            ? 'text-emerald-500 dark:text-emerald-400'
                                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400',
                                        'sm:mr-2 sm:-ml-0.5 size-5',
                                    )}
                                />
                                <span class={"uppercase hidden sm:block"}>{tab.name}</span>
                            </A>
                        )}
                        </For>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default MenuX;