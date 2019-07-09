import { combineReducers } from 'redux'
import listReduscer from './listReducer'
import listOrderReducer from './listOrderReducer'
import cardsReducer from './cardsReducer'

export default combineReducers({
    lists: listReduscer,
    listOrder: listOrderReducer,
    cards: cardsReducer
})