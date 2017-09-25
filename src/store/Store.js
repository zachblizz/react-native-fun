import { createStore } from 'redux'
import config from '../config'

const reducer = (state={}, action) => {
    switch(action.type) {
        case config.constants.UPDATE_USER_ID: {
            state = { ...state, userId: action.payload }
            break;
        }
        case config.constants.UPDATE_USER_NAME: {
            state = { ...state, username: action.payload }
            break;
        }
    }

    return state
}

const Store = createStore(reducer)

export default Store
