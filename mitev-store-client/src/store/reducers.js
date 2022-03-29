import {ADD_PRODUCT_TO_CART, LOGIN, REMOVE_PRODUCT_FROM_CART,} from './actions'


const initState = {
    products: [],
    userId: '',
    token: ''
};

function mainReducer(state = initState, action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                products: [...state.products, action.product],
            };
        case REMOVE_PRODUCT_FROM_CART: {
            let newStateProducts = state.products;
            const index = state.products.findIndex(pr => pr.product_id === action.id); // check if it should be product_id or only
            if (index >= 0) {
                newStateProducts.splice(index, 1);
                return {
                    ...state,
                    products: newStateProducts,
                }
            } else {
                return state;
            }
        }
        case LOGIN: {
            let newUserId = action.userId;
            let newToken = action.token;
            return {
                ...state,
                userId: newUserId,
                token: newToken
            }
        }
        default:
            return state
    }
}

// const mainReducer = combineReducers({
//   productsInCart,
// })

export default mainReducer;
