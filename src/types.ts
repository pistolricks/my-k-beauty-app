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


export interface Client {
    id: number;
    created_at: Date;
    first_name: string;
    middle_name?: string;
    last_name: string;
    suffix?: string;
    email: string;
    mobile?: string;
    username: string;
    riman_user_id: number;
    status: boolean;
    organization_type?: string;
    signup_date: string;
    anniversary_date: string;
    account_type: string;
    sponsor_username?: string;
    member_id: string;
    rank?: string;
    enrollment_date?: string;
    personal_orders_volume?: number;
    personal_clients_volume?: number;
    total_personal_volume?: number;
    current_month_sp?: number;
    current_month_bp?: number;
    last_order_date?: string;
    last_order_id?: number;
    last_order_sp?: number;
    last_order_bp?: number;
    lifetime_spend?: number;
    most_recent_12_month_spend?: number;
    data?: any;
    password_hash: string;
    token: string;
    password: SecretPassword;
    rep_site_url: string;
}

export interface SecretPassword {
    plaintext: string | null;
    hash: Uint8Array;
}


