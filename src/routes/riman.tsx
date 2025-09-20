import { RouteSectionProps } from "@solidjs/router";

export default function RimanLayout(props: RouteSectionProps) {
    return <main>{props.children}</main>;
}