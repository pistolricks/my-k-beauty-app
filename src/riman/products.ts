import {query} from "@solidjs/router";
import {baseUrl} from "~/app";



export const getProducts = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products`)
    return (await response.json()) as any;
}, "products");

export const getProductsSearch = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/search`)
    return (await response.json()) as any;
}, "search");


export const getFeaturedProducts = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/featured`)
    return (await response.json()) as any;
}, "featured");


export const getBestSellers = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/best-sellers`)
    return (await response.json()) as any;
}, "best-sellers");

export const getFeaturedBrands = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/brands/featured`)
    return (await response.json()) as any;
}, "brands-featured");


export const getBrandSpotlight = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/brands/spotlight`)
    return (await response.json()) as any;
}, "brands-spotlight");


export const getSelections = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/selections`)
    return (await response.json()) as any;
}, "selections");


export const getProductDetail = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/detail`)
    return (await response.json()) as any;
}, "detail");

export const getLovedProducts = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/loved`)
    return (await response.json()) as any;
}, "loved");


export const getRemainingProducts = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/remaining-products`)
    return (await response.json()) as any;
}, "remaining-products");

export const getRitual = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/ritual`)
    return (await response.json()) as any;
}, "ritual");

export const getCategories = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/categories`)
    return (await response.json()) as any;
}, "categories");

export const getCategory = query(async (id: string) => {
    const response = await fetch(`${baseUrl}/v2/products/categories/${id}`)
    return (await response.json()) as any;
}, "category");

export const getSubCategories = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/sub-categories`)
    return (await response.json()) as any;
}, "sub-categories");

export const getFunctions = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/functions`)
    return (await response.json()) as any;
}, "functions");

export const getInvalidateCache = query(async () => {
    const response = await fetch(`${baseUrl}/v2/products/invalidate-cache`)
    return (await response.json()) as any;
}, "invalidate-cache");