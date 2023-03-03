import {
  DEFAULT_WEATHER,
  FORECAST_WEATHER,
  SET_CELSIUS_OR_FAHRENHEIT,
  SET_LOADING,
} from "./types";

import { apiTemp } from "../Api";
import getForecast from "../utils/getForecast";

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const forecastWeather =
  ({ lon: longitude, lat: latitude }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await apiTemp.get(
        `/onecall?lat=${latitude}&lon=${longitude}&appid=62061ccf07ad6a9853275cd2c0463a92&exclude=minutely,hourly&lang=pt_br`
      );

      const forecast = getForecast(response.data);

      dispatch({
        type: FORECAST_WEATHER,
        payload: forecast,
      });
    } catch (erro) {
      console.log(erro);
    }
  };

export const weatherLocation =
  (latitude = -22.9194, longitude = -42.8186) =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await apiTemp.get(
        `/weather?lat=${latitude}&lon=${longitude}&appid=62061ccf07ad6a9853275cd2c0463a92`
      );

      forecastWeather({
        lon: longitude,
        lat: latitude,
      })(dispatch);

      dispatch({
        type: DEFAULT_WEATHER,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const setCelsiusOrFahrenheit = (value) => (dispatch) => {
  dispatch({
    type: SET_CELSIUS_OR_FAHRENHEIT,
    payload: value,
  });
};
