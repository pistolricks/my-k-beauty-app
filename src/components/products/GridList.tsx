import {Component, For} from "solid-js";

import {RimanProduct} from "~/types";
import {A} from "@solidjs/router";
import {Icon} from "solid-heroicons";
import {star} from "solid-heroicons/outline";
import {cn} from "~/utils";

const GridList: Component<{
    products: RimanProduct[]
}> = (props) => {

    const products = () => props.products

    return (
        <div class="bg-white">
            <div class="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
                <h2 class="sr-only">Products</h2>

                <div class="-mx-px grid grid-cols-2 border-l border-gray-50 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                    <For each={products()}>
                        {(product) => (
                            <div class="aspect-3/2 group relative border-r border-b border-gray-50 p-4 sm:p-6">
                                <img
                                    alt={product.name}
                                    src={product.imageUrl}
                                    class="aspect-square rounded-lg  object-cover group-hover:opacity-75"
                                />
                                <div class="pt-10 pb-4 text-center">
                                    <h3 class="text-sm font-medium text-gray-900 min-h-[3rem]">
                                        <A href={`/${import.meta.env.RIMAN_SHOP}/products/${product?.productPK}`}>
                                            <span aria-hidden="true" class="absolute inset-0"/>
                                            {product.name}
                                        </A>
                                    </h3>
                                    <div class="flex flex-col items-center">
                                        <p class="sr-only">5 out of 5 stars</p>
                                        <div class="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <Icon
                                                    path={star}
                                                    aria-hidden="true"
                                                    class={cn(
                                                        rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                        'size-4 shrink-0',
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <div class={"mt-3  flex justify-start items-center"}>
                                            ${product.pricing?.[0]?.formattedPrice}
                                        </div>
                                    </div>
                                    <p class="mt-4 py-2 text-xs uppercase rounded-lg font-light text-gray-900 border border-gray-200">
                                        Add to Bag
                                    </p>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    )
}

export default GridList;