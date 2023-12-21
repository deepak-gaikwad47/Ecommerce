import {
    CLEAR_ERRORS, LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILED,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILED,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    DELETE_USER_PROFILE_SUCCESS,
    DELETE_USER_PROFILE_FAIL,
    DELETE_USER_PROFILE_REQUEST,
    USER_DETAILS_SUCCESS,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../Constants/UserConstant"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_FAILED:
        case REGISTER_USER_FAILED:
            return {
                ...state,
                user: null,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: null,
                loading: false,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true
            }
        case LOGOUT_USER_FAILED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error: action.payload,
            }
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case LOAD_USER_FAILED:
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const profileReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case DELETE_USER_PROFILE_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE_RESET:
            return {
                isUpdated: false,
                loading: false
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case DELETE_USER_PROFILE_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
                message: action.payload.message
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_USER_PROFILE_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const userDetailReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}