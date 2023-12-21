import axios from 'axios';
import {
    CLEAR_ERRORS, LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, GET_USER_SUCCESS
    , GET_USER_FAILED,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    DELETE_USER_PROFILE_SUCCESS,
    DELETE_USER_PROFILE_FAIL,
    DELETE_USER_PROFILE_REQUEST,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS
} from '../Constants/UserConstant';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post('api/login',
            { email, password }, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.response.data.message })
    }
}

export const RegisterUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const newUser = await axios.post('api/register', userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: newUser.data.user })
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAILED, payload: error.response.data.message })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.get('api/myProfile', config)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOAD_USER_FAILED, payload: error.response.data.message })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get('api/logout')
        dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGOUT_USER_FAILED, payload: error.response.data.message })
    }
}

export const getAllUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/admin/users')
        dispatch({ type: GET_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: GET_USER_FAILED, payload: error.response.data.message })
    }
}
export const updateUser = ({ name, email }) => async (dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put('api/myProfile/update', { name, email }, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

export const deleteProfile = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_PROFILE_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.delete(`api/user/${id}`, config)
        dispatch({ type: DELETE_USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELETE_USER_PROFILE_FAIL, payload: error.response.data.message })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USER_REQUEST })
        const { data } = await axios.get(`/api/admin/users`)
        dispatch({
            type: GET_ALL_USER_SUCCESS, payload: data.users
        })
    } catch (error) {
        dispatch({ type: GET_ALL_USER_FAIL, payload: error.response.data.message })

    }
}

export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/admin/user/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data.user
        })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })

    }
}

export const updateUserDetail = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`api/admin/user/${id}`, userData, config)
        dispatch({
            type: UPDATE_USER_SUCCESS, payload: data.user
        })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })

    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`api/admin/user/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS, payload: data.success
        })
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message })
    }
}