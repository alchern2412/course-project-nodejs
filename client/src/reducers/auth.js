import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    ACCOUNT_DELETED,
    SET_TOAST
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    toast: {
        appearance: 'success',
        message: 'Hello'
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case SET_TOAST:
            console.log(payload);

            return {
                ...state,
                toast: state.user && state.user._id === payload.toUserId
                    && state.user._id !== payload.fromUser._id
                    ? {
                        appearance: payload.appearance,
                        message: `${payload.message}`
                    }
                    : state.toast
            }

        default:
            return { ...state }

    }
}







