

import {Component, For} from "solid-js";

import {cn} from "~/utils";
import {userCircle} from "solid-heroicons/outline";
import {Icon} from "solid-heroicons";

const tabs = [
    { name: 'My Account', href: '#', icon: userCircle, current: false },
    { name: 'Company', href: '#', icon: userCircle, current: false },
    { name: 'Team Members', href: '#', icon: userCircle, current: true },
    { name: 'Billing', href: '#', icon: userCircle, current: false },
]



const MenuX: Component<{}> = (props) => {
    return (
        <div class={"w-full"}>
            <div class="w-full  ">
                <div class="w-full flex justify-center items-center border-b border-gray-200 dark:border-white/10">
                    <nav aria-label="Tabs" class="-mb-px flex space-x-8">
                        <For each={tabs}>
                        {(tab) => (
                            <a
                                href={tab.href}
                                aria-current={tab.current ? 'page' : undefined}
                                class={cn(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300',
                                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                                )}
                            >
                                <Icon
                                    path={tab.icon}
                                    aria-hidden="true"
                                    class={cn(
                                        tab.current
                                            ? 'text-indigo-500 dark:text-indigo-400'
                                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400',
                                        'mr-2 -ml-0.5 size-5',
                                    )}
                                />
                                <span>{tab.name}</span>
                            </a>
                        )}
                        </For>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default MenuX;