import { ADD_TO_CART, DELETE_FROM_CART, EMPTY_CART, UPDATE_TO_CART } from '../constant/CartConstant.js';
import { process_add_to_cart, process_delete_from_cart, process_update_to_cart } from '../helper/utils.js';

const initialStore = JSON.parse(localStorage.getItem('cart') || '{"cartItems": []}');
const CartReducer = (state = initialStore, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const new_state = {
                cartItems: process_add_to_cart(state.cartItems, action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(new_state));
            return new_state;
        }
        case UPDATE_TO_CART: {
            const new_state = {
                cartItems: process_update_to_cart(state.cartItems, action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(new_state));
            return new_state;
        }
        case DELETE_FROM_CART:
            {
                const new_state = {
                    cartItems: process_delete_from_cart(state.cartItems, action.payload)
                }
                localStorage.setItem('cart', JSON.stringify(new_state));
                return new_state;
            }
        case EMPTY_CART: {
            const new_state = {
                cartItems: []
            }
            localStorage.setItem('cart', JSON.stringify(new_state));
            return new_state;
        }
        default:
            return state;
    }
}

export default CartReducer;