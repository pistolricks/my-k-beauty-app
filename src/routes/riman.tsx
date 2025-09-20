import {Component, Show} from "solid-js";
import {useAuth} from "~/components/Context";
import {Title} from "@solidjs/meta";
import {RimanPortal} from "~/components/ui/layouts/riman-portal";
import {RimanLogo} from "~/components/Icons";
import SectionHeading from "~/components/ui/section-heading";
import MenuX from "~/components/ui/MenuX";
import {userCircle} from "solid-heroicons/outline";

type PROPS = {}
const tabs = [
    { name: 'My Account', href: '#', icon: userCircle, current: false },
    { name: 'Company', href: '#', icon: userCircle, current: false },
    { name: 'Team Members', href: '#', icon: userCircle, current: true },
    { name: 'Billing', href: '#', icon: userCircle, current: false },
]


const RimanLayout: Component<PROPS> = props => {
    const {session, signedIn, authenticatedRiman, logout} = useAuth();

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
                <MenuX menu={tabs}/>


                <div
                    class="mb-2 text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

                </div>
            </Show>

        </div>

    );
};

export default RimanLayout;