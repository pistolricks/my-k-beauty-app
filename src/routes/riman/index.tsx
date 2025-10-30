import {Component, createEffect, createSignal} from "solid-js";
import {Title} from "@solidjs/meta";
import {RouteSectionProps} from "@solidjs/router";
import {bulkImportRimanProductsHandler} from "~/riman/importer";
import {useAuth} from "~/components/Context";
import {Banner} from "~/components/ui/Banner";

type PROPS = RouteSectionProps

const Riman: Component<PROPS> = props => {
    const [getShopPath, setShopPath] = createSignal(props.params.shop_path)
    const {session} = useAuth();

    const [getButtonText, setButtonText] = createSignal("Import")

    const importProducts = async() => {
        let res = await bulkImportRimanProductsHandler(session()?.rimanSession?.token)
        setButtonText(`${res?.saved} Imported`)
    }

    createEffect(() => {
        setShopPath(() => props.params.shop_path)
        console.log("shop path", getShopPath())
        console.log("buttonText", getButtonText())
    })

    return (

        <div>
            <Title>Riman</Title>

            <Banner title={"RIMAN"} subTitle={"Bulk Import Products"} onClick={importProducts} buttonText={getButtonText()}/>



            {props.children}

        </div>

    );
};

export default Riman;