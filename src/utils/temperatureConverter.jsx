const conversor = {
  celsius: (kelvin) => {
    kelvin = Math.round(kelvin);

    return kelvin - 273.15;
  },
  fahrenheit: (kelvin) => {
    kelvin = Math.round(kelvin);
    return (kelvin * 9) / 5 - 459.67;
  },
};

export default conversor;
