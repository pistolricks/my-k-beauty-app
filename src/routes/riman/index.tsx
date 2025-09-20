import {Component, Show} from "solid-js";
import {useAuth} from "~/components/Context";
import {useMatch} from "@solidjs/router";
import {Title} from "@solidjs/meta";
import {RimanPortal} from "~/components/ui/layouts/riman-portal";

type PROPS = {}

const Riman: Component<PROPS> = props => {
    const {session, signedIn, authenticatedRiman, logout} = useAuth();

    return (

        <main>
            <Title>Riman</Title>


            <Show
                fallback={
                    <div
                        class="mb-2 text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                    <p>{session()?.rimanSession?.id}</p>
                    <p>{session()?.rimanSession?.repSiteUrl}</p>
                    <p>{session()?.rimanSession?.username}</p>
                    <p>{session()?.rimanSession?.email}</p>
                    <p>{session()?.rimanSession?.token}</p>
                </div>
                }
                when={!authenticatedRiman()}>
                <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">

                        <div
                            class="mb-2 text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                            <h1>RIMAN</h1>
                        </div>

                    <div
                        class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                        <RimanPortal/>
                    </div>
                </div>
            </Show>

        </main>

    );
};

export default Riman;