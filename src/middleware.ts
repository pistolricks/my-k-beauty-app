import { createMiddleware } from "@solidjs/start/middleware";
import {getSession} from "~/auth/server";



export default createMiddleware({
    onRequest: [
        async event => {
            const {data} = await getSession();
            event.locals.session = data;
            console.log(event.locals.session);
        }
    ],
    onBeforeResponse: [
        (event, { body }) => {
            event.locals.response = body;
            console.log("start", body, event.locals.response);
        }
    ]
});