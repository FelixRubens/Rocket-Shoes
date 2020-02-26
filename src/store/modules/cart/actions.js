export function addToCartRequest(id) {
    return {
        type: '@cart/ADD_REQUEST',
        id,
    }
}

export function addToCartSuccess(product) {
    return {
        type: '@cart/ADD_SUCCESS',
        product,
    }

}

export function updateAmountRequest(product, amount) {
    return {
        type: '@cart/UPDATE_REQUEST',
        product,
        amount
    }
}

export function updateAmountSuccess(product, amount) {
    return {
        type: '@cart/UPDATE_SUCCESS',
        product,
        amount
    }
}

export function removeProductFromCart(product) {
    return {
        type: '@cart/REMOVE_PRODUCT',
        product,
    }
}
