import axios from "axios";

export const apiTemp = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const apiGeoLocation = axios.create({
  baseURL: "https://api.openweathermap.org",
});
