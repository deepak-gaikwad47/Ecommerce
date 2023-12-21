import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDetailsReducer } from "./Reducers/ProductReducers";
import { allUsersReducer, profileReducer, userDetailReducer, userReducer } from "./Reducers/userReducers";


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    getAllUsers: allUsersReducer,
    userDetailReducer: userDetailReducer,
});

const initialState = [];

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;