import {apiUrl} from "~/app";
import {query} from "@solidjs/router";
import cart_key from "~/routes/riman/[shop_path]/carts/[cart_key]";

const fetchNewCart = async (userInput: { token: string, riman_token: string }) =>
    (await fetch(`${apiUrl}/v1/shopping/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInput.token,
                "X-Riman-Token": userInput.riman_token,
            }
        })
    ).json()

export const createNewCartHandler = async (token: string, rimanToken: string) => {
    console.log("token", token)

    const userInput = {
        token: token,
        riman_token: rimanToken,
    }
    let res = await fetchNewCart(userInput);

    console.log("res", res)

    return res;
}

export const getCartDetails = query(async (token: string, cart_key: string) => {
    const response = await fetch(`${apiUrl}/v1/carts/${cart_key}`, {
        headers: {
            "Content-Type": "application/json",
            "X-Riman-Token": token,
        }
    })
    return (await response.json()) as any;
}, "cart-details");

export const getCarts = query(async () => {
    const response = await fetch(`${apiUrl}/v1/carts`)
    return (await response.json()) as any;
}, "carts");


const fetchCartStatus = async (userInput: { token: string }, cart_key: string ) =>
    (await fetch(`${apiUrl}/v1/shopping/carts/${cart_key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Riman-Token": userInput.token,
            },
        })
    ).json()

export const cartStatusHandler = async (token: string, cart_Key: string) => {
    console.log("token", token)

    const userInput = {
        token: token,
    }
    let res = await fetchCartStatus(userInput, cart_Key);

    console.log("res", res)

    return res;
}

