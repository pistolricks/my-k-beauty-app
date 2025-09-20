import {Title} from "@solidjs/meta";
import {useSubmission} from "@solidjs/router";
import {Show} from "solid-js";
import {useOAuthLogin} from "start-oauth";
import {formRegister} from "~/auth";

export default function Register() {
    const login = useOAuthLogin();

    return (

        <main>
            <Title>Register</Title>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div
                    class="mb-2 text-center bg-white px-6 py-6 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                    <h1 class={"text-6xl text-sky-600"}>Register</h1>
                </div>
                <div
                    class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                    <PasswordRegister/>
                </div>
            </div>
        </main>
    );
}

function PasswordRegister() {
    const submission = useSubmission(formRegister);

    return (
        <form action={formRegister} method="post" class="space-y-4 space-x-12">
            <label for="name" class="block text-left w-full">
                Email
                <input
                    id="name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    placeholder="john"
                    required
                    class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </label>
            <label for="email" class="block text-left w-full">
                Email
                <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="john@doe.com"
                    required
                    class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </label>
            <button
                type="submit"
                disabled={submission.pending}
                class="w-full px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-sky-500/25"
            >
                Submit
            </button>
            <Show when={submission.error} keyed>
                {({message}) => <p class="text-red-600 mt-2 text-xs text-center">{message}</p>}
            </Show>
        </form>
    );
}
