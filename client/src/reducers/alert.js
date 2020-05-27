import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = [] // alert: {id, alertType, msg} 


export default (state = initialState, action) => {
    const { type, payload } = action
    
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)
        // case NOTIFY_LIKE:
        //     return payload[...state]
        default: 
            return [...state]
    }
}






