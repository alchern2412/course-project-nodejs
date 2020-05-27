import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

let socket = io('http://localhost:5000')
let socketIoMiddleware = createSocketIoMiddleware(
    socket,
    'server/'
)

const initialState = {}
const middleware = [thunk, socketIoMiddleware]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

store.subscribe(() => {
    console.log('new client state', store.getState())
})
export default store

