import {useSubmission} from "@solidjs/router";
import {Show} from "solid-js";
import {rimanLoginForm} from "~/riman";


export function RimanPortal() {
    const submission = useSubmission(rimanLoginForm);

    return (
        <form action={rimanLoginForm} method="post" class="space-y-4 space-x-12">
            <label for="userName" class="block text-left w-full">
                Username
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    autocomplete="username"
                    placeholder="username"
                    required
                    class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </label>
            <label for="password" class="block text-left w-full">
                Password
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="••••••••"
                    minLength={6}
                    required
                    class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </label>
            <button
                type="submit"
                disabled={submission.pending}
                class="w-full px-4 py-2 bg-gradient-to-r from-[#3c544b] to-emerald-900 text-white rounded-lg hover:from-emerald-700 hover:to-[#3c544b] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-sky-500/25"
            >
                LOGIN
            </button>
            <Show when={submission.error} keyed>
                {({message}) => <p class="text-red-600 mt-2 text-xs text-center">{message}</p>}
            </Show>
        </form>
    );
}
