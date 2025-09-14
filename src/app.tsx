import { type RouteDefinition, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { Suspense } from "solid-js";
import { querySession } from "./auth";
import Auth from "./components/Context";
import Nav from "./components/Nav";
import ErrorNotification from "./components/Error";
import "./app.css";
export const baseUrl = "http://localhost:4020"
export const route: RouteDefinition = {
  preload: ({ location }) => querySession(location.pathname)
};

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Auth>
            <Suspense>
              <Nav />
              {props.children}
              <ErrorNotification />
            </Suspense>
          </Auth>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
