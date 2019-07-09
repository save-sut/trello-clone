import { CONSTANTS } from '../actions'
let listID = 0
const initialState = ['list-0']

const listOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST: {
            listID += 1
            const newId = `list-${listID}`
            return [...state, newId]
        }

        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload
            const newState = state

            // draggin lists around
            if (type === 'list') {
                const pulledOutList = newState.splice(droppableIndexStart, 1)
                newState.splice(droppableIndexEnd, 0, ...pulledOutList)
                return newState
            }
            return state
        }

        case CONSTANTS.DELETE_LIST: {
            const { listID } = action.payload
            return state.filter(id => id !== listID)
        }

        default:
            return state
    }
}

export default listOrderReducer
