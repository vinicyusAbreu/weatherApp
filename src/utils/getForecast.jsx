const getForecast = (weatherInformation) => {
  const forecasts = weatherInformation.daily.slice(1, 6);

  const forecastsForFiveDays = forecasts.map((forecast) => {
    const { dt, temp, weather } = forecast;
    return {
      dt,
      icon: weather[0].icon,
      temMax: temp.max,
      temMin: temp.min,
    };
  });

  return forecastsForFiveDays;
};

export default getForecast;
