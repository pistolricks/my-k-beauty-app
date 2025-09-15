import {defineConfig} from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
    middleware: "./src/middleware.ts",
    ssr: false, // false for client-side rendering only
    server: {preset: ""}, // your deployment
    // @ts-ignore
    vite: {plugins: [tailwindcss()]}
});
