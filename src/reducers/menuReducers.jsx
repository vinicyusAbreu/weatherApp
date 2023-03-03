import{
    TOGGLE_MENU
} from '../actions/types'

const initialState = {
    menuToggle: false,
}

export default (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_MENU:
            return{
                ...state,
                menuToggle: !state.menuToggle
            }
        default:
            return state
    }
}