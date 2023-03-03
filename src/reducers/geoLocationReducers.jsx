import { GET_GEOLOCATION, SET_LOADING_SEARCH } from "../actions/types";

const initialState = {
  geoLocation: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GEOLOCATION:
      return {
        ...state,
        geoLocation: action.payload,
        loading: false,
      };
    case SET_LOADING_SEARCH:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
