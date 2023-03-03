import { GET_GEOLOCATION, SET_LOADING_SEARCH } from "./types";
import { apiGeoLocation } from "../Api";

export const setLoading = () => {
  return {
    type: SET_LOADING_SEARCH,
  };
};

export const getGeoLocation = (locale) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await apiGeoLocation.get(
      `geo/1.0/direct?q=${locale}&limit=5&appid=62061ccf07ad6a9853275cd2c0463a92`
    );

    const location = response.data;
    dispatch({
      type: GET_GEOLOCATION,
      payload: location,
    });
  } catch (error) {
    console.error(error);
  }
};
