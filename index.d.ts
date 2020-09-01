import { ObjectWithMetrics } from './customMetrics';
import { ObjectWithDimensions } from './customDimensions';

interface ProductObjectCommon {
    /** The brand associated with the product (e.g. Google). */
    brand?: string;
    /** The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts). */
    category?: string;
    /** The variant of the product (e.g. Black). */
    variant?: string;
    /** The product's position in a list or collection (e.g. 2). */
    position?: number;
    /** The price of a product (e.g. 29.20). */
    price?: string;
}

/** One of id or name must be set. */
interface ObjectWithId {
    /** The product ID or SKU (e.g. P67890). */
    id: string;
}

/** One of id or name must be set. */
interface ObjectWithName {
    /** The name of the product (e.g. Android T-Shirt). */
    name: string;
}

type ObjectWithIdOrName = (ObjectWithId | ObjectWithName);

type BaseProductObject =  ObjectWithIdOrName & ProductObjectCommon & ObjectWithMetrics & ObjectWithDimensions;

export type ImpressionFieldObject = BaseProductObject & {
    /** The list or collection to which the product belongs (e.g. Search Results) */
    list?: string;
};

export type ProductFieldObject = BaseProductObject & {
    /** The quantity of a product (e.g. 2). */
    quantity?: number;
    /** The coupon code associated with a product (e.g. SUMMER_SALE13). */
    coupon?: string;
};

export type PromotionFieldObject = ObjectWithIdOrName & {
    /** The creative associated with the promotion (e.g. summer_banner2). */
    creative?: string;
    /** The position of the creative (e.g. banner_slot_1). */
    position?: string;
};

export interface ActionFieldObjectWithTransactionData {
    /** The transaction ID (e.g. T1234). Required if the action type is purchase or refund */
    id: string;
    /** The store or affiliation from which this transaction occurred (e.g. Google Store). */
    affiliation?: string;
    /**
     *  Specifies the total revenue or grand total associated with the transaction (e.g. 11.99).
     *  This value may include shipping, tax costs, or other adjustments to total revenue that you want to
     *  include as part of your revenue calculations.
     *  Note: If revenue is not set, its value will be automatically calculated using the product quantity and price
     *  fields of all products in the same hit.
     */
    revenue?: string;
    /** The total tax associated with the transaction. */
    tax?: string;
    /** The shipping cost associated with the transaction. */
    shipping?: string;
    /** The transaction coupon redeemed with the transaction. */
    coupon?: string;
    /** The list that the associated products belong to. Optional. */
    list?: string;
    /** A number representing a step in the checkout process. Optional on `checkout` actions. */
    step?: number;
    /** Additional field for checkout and checkout_option actions that can describe option information on the checkout page, like selected payment method. */
    option?: string;
}

export interface ActionFieldObjectWithStep {
    step: number;
}

export interface ActionFieldObjectWithOption {
    option: string;
}

export interface ActionFieldObjectWithList {
    list: string;
}

export type ActionFieldObjectWithStepAndOrOption = ActionFieldObjectWithStep | ActionFieldObjectWithOption | (ActionFieldObjectWithStep & ActionFieldObjectWithOption) | {};

export type ActionFieldObject = ActionFieldObjectWithStepAndOrOption | ActionFieldObjectWithList | ActionFieldObjectWithTransactionData | {};

export type ProductOrPromotionAction =
    'click' |           // A click on a product or product link for one or more products.
    'detail' |          // A view of product details.
    'add' |             // Adding one or more products to a shopping cart.
    'remove' |          // Remove one or more products from a shopping cart.
    'checkout' |        // Initiating the checkout process for one or more products.
    'checkout_option' | // Sending the option value for a given checkout step.
    'purchase' |        // The sale of one or more products.
    'refund' |          // The refund of one or more products.
    'promo_click';       // A click on an internal promotion.

interface EcommerceObject {
    currencyCode?: "EUR" | "USD" | string;
}

export type ImpressionsEcommerceObject = EcommerceObject & {
    impressions: ImpressionFieldObject[];
};

export interface EcommercePayloadWithActionFieldList {
    actionField?: ActionFieldObjectWithList;
}

export interface EcommercePayloadWithActionFieldStepAndOrOption {
    actionField?: ActionFieldObjectWithStepAndOrOption;
}

export type ProductClickEcommerceObject = EcommerceObject & {
    click: EcommercePayloadWithActionFieldList & {
        products: ProductFieldObject[];
    }
};

export type DetailEcommerceObject = EcommerceObject & {
    detail: EcommercePayloadWithActionFieldList & {
        products: ProductFieldObject[];
    }
};

export type AddEcommerceObject = EcommerceObject & {
    add: {
        products: ProductFieldObject[];
    }
};

export type RemoveEcommerceObject = EcommerceObject & {
    remove: {
        products: ProductFieldObject[];
    }
};

export type PromoViewEcommerceObject = EcommerceObject & {
    promoView: {
        promotions: PromotionFieldObject[];
    }
};

export type PromotionClickEcommerceObject = EcommerceObject & {
    promoClick: {
        promotions: PromotionFieldObject[];
    }
};

export type CheckoutEcommerceObject = EcommerceObject & {
    checkout: EcommercePayloadWithActionFieldStepAndOrOption & {
        products: ProductFieldObject[];
    }
};

export type CheckoutOptionEcommerceObject = EcommerceObject & {
    checkout: EcommercePayloadWithActionFieldStepAndOrOption;
};

export type PurchaseEcommerceObject = EcommerceObject & {
    purchase: {
        actionField: ActionFieldObjectWithTransactionData;
        products: ProductFieldObject[];
    }
};

export interface RefundProductObject {
    id: string;
    quantity: number;
}

export interface RefundEcommerceObject {
    actionField: ObjectWithId;
    products?: RefundProductObject[];
}

export interface ImpressionsDataLayerPush {
    ecommerce: ImpressionsEcommerceObject;
}

export enum EnhancedEcommerceEventNames {
    PRODUCT_CLICK = 'productClick',
    ADD_TO_CART = 'addToCart',
    REMOVE_FROM_CART = 'removeFromCart',
    PROMOTION_CLICK = 'promotionClick',
    CHECKOUT = 'checkout',
    CHECKOUT_OPTION = 'checkoutOption',
}

interface CommonDataLayerPush {
    eventCallback?: () => void;
}

export type ProductClickDataLayerPush = CommonDataLayerPush & {
    event: 'productClick';
    ecommerce: ProductClickEcommerceObject;
};

export type DetailDataLayerPush = CommonDataLayerPush & {
    ecommerce: DetailEcommerceObject;
};

export type AddToCartDataLayerPush = CommonDataLayerPush & {
    event: 'addToCart';
    ecommerce: AddEcommerceObject;
};

export type RemoveFromCartDataLayerPush = CommonDataLayerPush & {
    event: 'removeFromCart';
    ecommerce: RemoveEcommerceObject;
};

export type PromoViewDataLayerPush = CommonDataLayerPush & {
    ecommerce: PromoViewEcommerceObject;
};

export type PromotionClickDataLayerPush = CommonDataLayerPush & {
    event: 'promotionClick';
    ecommerce: PromotionClickEcommerceObject;
};

export type CheckoutDataLayerPush = CommonDataLayerPush & {
    event: 'checkout';
    ecommerce: CheckoutEcommerceObject;
};

export type CheckoutOptionDataLayerPush = CommonDataLayerPush & {
    event: 'checkoutOption';
    ecommerce: CheckoutOptionEcommerceObject;
};

export type DataLayerPush =
    ProductClickDataLayerPush |
    DetailDataLayerPush |
    AddToCartDataLayerPush |
    RemoveFromCartDataLayerPush |
    PromoViewDataLayerPush |
    PromotionClickDataLayerPush |
    CheckoutDataLayerPush |
    CheckoutOptionDataLayerPush;

export {};
