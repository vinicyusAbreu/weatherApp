import { combineReducers } from "redux";
import menuReducers from "./menuReducers";
import weatherReducers from "./weatherReducers";
import geoLocationReducers from "./geoLocationReducers";

export default combineReducers({
  menu: menuReducers,
  weather: weatherReducers,
  geoLocation: geoLocationReducers,
});
