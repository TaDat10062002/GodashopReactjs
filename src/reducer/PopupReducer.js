import { POPUP_CART, POPUP_CLOSE, POPUP_FORGOT_PASSWORD, POPUP_LOGIN, POPUP_MOBILE, POPUP_REGISTER } from "../constant/PopupConstant";

const initialState = {
    popup_type: ''
}
const PopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case POPUP_LOGIN:
            return { popup_type: POPUP_LOGIN }
        case POPUP_REGISTER:
            return { popup_type: POPUP_REGISTER }
        case POPUP_CLOSE:
            return { popup_type: POPUP_CLOSE }
        case POPUP_FORGOT_PASSWORD:
            return { popup_type: POPUP_FORGOT_PASSWORD }
        case POPUP_CART:
            return { popup_type: POPUP_CART }
        case POPUP_MOBILE:
            return { popup_type: POPUP_MOBILE }
        default:
            return state;
    }
}

export default PopupReducer