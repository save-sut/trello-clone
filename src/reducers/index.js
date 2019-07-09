import { combineReducers } from 'redux'
import listReduscer from './listReducer'

export default combineReducers({
    lists: listReduscer
})