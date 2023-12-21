import { ALL_PRODUCT_FAILED, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERRORS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAILED, PRODUCT_DETAIL_SUCCESS } from "../Constants/ProductConstants"

export const productReducer = ((state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductCount: action.payload.filteredProductCount
            }
        case ALL_PRODUCT_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

})


export const productDetailsReducer = ((state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }
        case PRODUCT_DETAIL_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
})