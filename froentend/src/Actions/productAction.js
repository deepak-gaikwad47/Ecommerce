import axios from 'axios';
import { ALL_PRODUCT_FAILED, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS } from "../Constants/ProductConstants"

export const getProducts = (currentPage = 1, price = [0, 25000]) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAILED,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/product/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAILED,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}