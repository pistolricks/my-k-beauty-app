export type  RimanProduct = {
    productPK?: number;
    productCode?: string;
    productCategory?: string;
    brandId?: number;
    brandName?: string;
    name?: string;
    imageUrl?: string;
    isPackage?: boolean;
    packageItems?: PackageItems[];
    isProductAvailableOnAutoship?: boolean;
    autoshipProductPk?: number;
    maxLimit?: number;
    bv?: number;
    sp?: number;
    productMenuId?: number;
    productMenu?: string;
    pricing?: Pricing[];
    description?: string;
    imageUrls?: ImageUrls[];
    isShippable?: boolean;
    seqNo?: number;
    mainType?: number;
    priceType?: string;
    offerSDOnShop?: boolean;
    isRetailCart?: boolean;
    productLineId?: number;
    productLine?: string;
    productFunction?: string;
    productCmsData?: ProductCmsData[];
}

export type PackageItems = {
    productPK?: number;
    name?: string;
    description?: string;
    imgUrl?: string;
    qty?: number;
}

export type Pricing = {
    priceType?: string;
    currencySymbol?: string;
    price?: number;
    noVatPrice?: number;
    formattedPrice?: string;
    priceWarning?: string;
}

export type ImageUrls = {
    imageUrl?: string;
    imageName?: string;
}

export type ProductCmsData = {
    name?: string;
    value?: string;
    dataTag?: string;
}

