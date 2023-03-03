import {
  DEFAULT_WEATHER,
  FORECAST_WEATHER,
  SET_CELSIUS_OR_FAHRENHEIT,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  weather: {},
  forecast: [],
  celsiusOrFahrenheit: "celsius",
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_WEATHER:
      return {
        ...state,
        weather: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FORECAST_WEATHER:
      return {
        ...state,
        forecast: action.payload,
        loading: false,
      };
    case SET_CELSIUS_OR_FAHRENHEIT:
      return {
        ...state,
        celsiusOrFahrenheit: action.payload,
      };
    default:
      return state;
  }
};
