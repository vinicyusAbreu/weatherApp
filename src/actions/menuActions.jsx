import {
    TOGGLE_MENU
} from './types';

export const toggleMenu = (e) => dispatch => {
    
    dispatch({ type: TOGGLE_MENU });
}