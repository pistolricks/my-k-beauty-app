

//

import {apiUrl} from "~/app";

const fetchBulkImportRimanProducts = async (userInput: { token: string }) =>
    (await fetch(`${apiUrl}/v1/import/riman/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
    ).json()

export const bulkImportRimanProductsHandler = async (token: string) => {
    console.log("token", token)

    const userInput = {
        token: token,
    }
    let res = await fetchBulkImportRimanProducts(userInput);

    console.log("res", res)

    return res;
}
