import * as actionTypes from '../constants/userConstants'

const userState = {
    token: localStorage.getItem('token') || "",
    userId: ""
}

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case actionTypes.USER_AUTHENTICATED:
            const item = action.payload
            return {
                ...state,
                token: item.token,
                userId: item.id
            };
        case actionTypes.USER_REMOVED:
            return {
                ...state,
                token: "",
                userId: "",
            };
        default:
            return state;
    }
}