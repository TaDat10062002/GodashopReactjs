import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';

const RootReducer = combineReducers({
    PopupReducer,
    AuthReducer,
    CartReducer
});

export default RootReducer;