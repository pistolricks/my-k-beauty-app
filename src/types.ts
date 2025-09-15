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

export type RimanCart = {
    id?: number;
    cart_key?: string;
    cart_type?: string;
    country_code?: string;
    main_fk?: number;
    main_referrer_fk?: number;
    culture?: string;
    language_fk?: number;
    main_order_type_fk?: number;
    price_list_fk?: number;
    campaign_code?: string;
    sales_campaign_fk?: number;
    ip?: string;
    date_entered: Date;
    ga_code?: string;
    facebook_code?: string;
    lucky_orange?: string;
    referrer_site_url?: string;
    referrer_is_corporate?: boolean;
    customer_referral_id?: string;
    main_credit_cards_fk?: number;
    main_orders_fk?: number;
    shipping_type_fk?: number;
    cart_status?: number;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    date_modified: Date;
    sub_total?: number;
    formatted_sub_total?: string;
    tax?: number;
    formatted_tax?: string;
    shipping?: number;
    formatted_shipping?: string;
    discount?: number;
    formatted_discount?: string;
    total?: number;
    formatted_total?: string;
    points_total?: number;
    ship_signature_required?: boolean;
    ship_signature_fee?: number;
    currency_fk?: number;
    currency_code?: string;
    main_discount_code?: string;
    active_smart_delivery?: boolean;
    allow_import_cart?: boolean;
    offer_preferred_cust?: boolean;
    is_affiliate_on?: boolean;
    is_volume_based_rsb?: boolean;
    offer_loyalty_program?: boolean;
    offer_smart_delivery?: boolean;
    is_retail_signup?: boolean;
    has_retail_starter_kit?: boolean;
    allow_retail_signup?: boolean;
    event_member_id?: number;
    show_abandoned_order_warning?: boolean;
    should_create_account?: boolean;
    is_cart_created_from_bag?: boolean;
    is_cart_created_from_signup?: boolean;
    currency_symbol?: string;
    shipping_address?: any;
    mailing_address?: any;
    billing_address?: any;
    formatted_autoship_subtotal?: string;
    cart_items?: any;
}