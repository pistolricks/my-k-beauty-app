import {apiUrl} from "~/app";
import {action} from "@solidjs/router";


const fetchUpdateCartProducts = async (token: string, userInput: {
    cart_key: string,
    discount: number,
    extra_fee: number,
    main_cart_fk: string,
    main_cart_items_pk: number,
    product_fk: number,
    quantity: number,
    setup_for_as: boolean
}) =>
    (await fetch(`${apiUrl}/vendors/carts/products/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Riman-Token": token,
            },
            body: JSON.stringify(userInput),
        })
    ).json();

export const updateCartProducts = action(async (data: FormData) => {
    const userInput = {
        cart_key: String(data.get("cart_key")),
        config_fk: null, // String(data.get("config_fk") ?? ""),
        discount: Number(data.get("discount") ?? 0),
        extra_fee: Number(data.get("extra_fee") ?? 0),
        main_cart_fk: String(window.localStorage.getItem("cart_key")),
        main_cart_items_pk: Number(data.get("main_cart_items_pk") ?? 0),
        product_fk: Number(data.get("product_fk")),
        quantity: Number(data.get("quantity") ?? 1),
        setup_for_as: Boolean(data.get("setup_for_as") ?? false),
    }

    console.log("userInput", userInput)

    let res = await fetchUpdateCartProducts(String(data.get("token")), userInput)

    console.log("res", res)

    return res;

})
