import {Component, JSXElement} from "solid-js";
import {Clipboard} from "@ark-ui/solid"
import {clipboardDocument, documentCheck} from "solid-heroicons/outline";
import {Icon} from "solid-heroicons";
import {IconProps} from "~/types";


type PROPS = {
    value: string
    icon?: IconProps[ 'path']
    class?: string
    classRoot?: string
    success?: JSXElement
    children?: JSXElement
}

const ClipboardCopy: Component<PROPS> = props => {

    const value = () => props.value;
    const icon = () => props.icon;
    const className = () => props.class;
    const classRoot = () => props.classRoot;
    const success = () => props.success;
    const children = () => props.children;

    return (
        <Clipboard.Root class={classRoot() ?? "w-full my-2"} value={value()}>
            {/*
            <Clipboard.Label>Copy this link</Clipboard.Label>
            */}
            <Clipboard.Control>
                {/*
                <Clipboard.Input />
                */}
                <Clipboard.Trigger type={"button"} class={"w-full"}>
                    <Clipboard.Indicator
                        copied={success() ?? <Icon path={documentCheck} class={"size-6 text-green-600"}/>}>
                        {children() ??
                            <Icon path={icon() ?? clipboardDocument} class={className() ?? "size-6 text-green-600"}/>}
                    </Clipboard.Indicator>
                </Clipboard.Trigger>
            </Clipboard.Control>
        </Clipboard.Root>
    );
};

export default ClipboardCopy;