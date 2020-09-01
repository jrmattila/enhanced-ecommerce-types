import {
    AddToCartDataLayerPush,
    DetailDataLayerPush,
    ImpressionsDataLayerPush,
    ProductClickDataLayerPush,
    PromotionClickDataLayerPush,
    PromoViewDataLayerPush,
    RemoveFromCartDataLayerPush
} from 'enhanced-ecommerce-types';

const impressionsDataLayerPush: ImpressionsDataLayerPush = {
    ecommerce: {
        currencyCode: 'EUR',
        impressions: [
            {
                name: 'Triblend Android T-Shirt',
                id: '12345',
                price: '15.25',
                brand: 'Google',
                category: 'Apparel',
                variant: 'Gray',
                list: 'Search Results',
                position: 1
            },
            {
                name: 'Donut Friday Scented T-Shirt',
                id: '67890',
                price: '33.75',
                brand: 'Google',
                category: 'Apparel',
                variant: 'Black',
                list: 'Search Results',
                position: 2
            }]
    }
};

const productClickDataLayerPush: ProductClickDataLayerPush = {
    event: 'productClick',
    ecommerce: {
        click: {
            actionField: {list: 'Search Results'},
            products: [{
                name: 'name',
                id: 'id',
                price: 'price',
                brand: 'brand',
                category: 'cat',
                variant: 'variant',
                position: 4
            }]
        }
    },
    eventCallback: () => {}
};

const detailDataLayerPush: DetailDataLayerPush = {
    ecommerce: {
        detail: {
            actionField: {list: 'Apparel Gallery'},
            products: [{
                name: 'Triblend Android T-Shirt',
                id: '12345',
                price: '15.25',
                brand: 'Google',
                category: 'Apparel',
                variant: 'Gray'
            }]
        }
    }
};

const addToCartDataLayerPush: AddToCartDataLayerPush = {
    event: 'addToCart',
    ecommerce: {
        currencyCode: 'EUR',
        add: {
            products: [{
                name: 'Triblend Android T-Shirt',
                id: '12345',
                price: '15.25',
                brand: 'Google',
                category: 'Apparel',
                variant: 'Gray',
                quantity: 1
            }]
        }
    }
};

const removeFromCartDataLayerPush: RemoveFromCartDataLayerPush = {
    event: 'removeFromCart',
    ecommerce: {
        remove: {
            products: [{
                name: 'Triblend Android T-Shirt',
                id: '12345',
                price: '15.25',
                brand: 'Google',
                category: 'Apparel',
                variant: 'Gray',
                quantity: 1
            }]
        }
    }
};

const promoViewDataLayerPush: PromoViewDataLayerPush = {
    ecommerce: {
        promoView: {
            promotions: [
                {
                    id: 'JUNE_PROMO13',
                    name: 'June Sale',
                    creative: 'banner1',
                    position: 'slot1'
                },
                {
                    id: 'FREE_SHIP13',
                    name: 'Free Shipping Promo',
                    creative: 'skyscraper1',
                    position: 'slot2'
                }]
        }
    }
};

const promotionClickDataLayerPush: PromotionClickDataLayerPush = {
    event: 'promotionClick',
    ecommerce: {
        promoClick: {
            promotions: [
                {
                    id: 'id',
                    name: 'name',
                    creative: 'creative',
                    position: 'pos',
                }]
        }
    },
    eventCallback: () => {}
};
