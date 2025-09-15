import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
    onRequest: [
        event => {
            event.locals.foo = "bar";
            console.log("REQUEST");
        }
    ],
    onBeforeResponse: [
        (event, { body }) => {
            console.log("BEFORE RESPONSE");
        }
    ]
});