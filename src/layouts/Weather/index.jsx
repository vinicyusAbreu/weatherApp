import React, { useEffect, Fragment } from "react";
import "animate.css";
import { BiTargetLock } from "react-icons/bi";
import { IoIosPin } from "react-icons/io";
import getData from "../../utils/getData";
import ButtonCircle from "../../components/ButtonCircle";
import { toggleMenu } from "../../actions/menuActions";
import { weatherLocation } from "../../actions/weatherActions";
import roundNumber from "../../utils/roundNumber";
import { connect } from "react-redux";
import conversor from "../../utils/temperatureConverter";
import Loading from "../../components/Loading";
import "./index.scss";
import PropTypes from "prop-types";

const Weather = ({
  weather: { weather, celsiusOrFahrenheit, loading },
  toggleMenu,
  weatherLocation,
}) => {
  console.log(loading);
  const onChangeLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        weatherLocation(latitude, longitude);
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  return (
    <Fragment>
      <div className="weather animate__animated animate__fadeInLeft">
        <div className="control-weather">
          <button className="btn-search" onClick={toggleMenu}>
            Seach for places
          </button>
          <ButtonCircle onClick={onChangeLocation}>
            <BiTargetLock size={22} color="#E7E7EB" />
          </ButtonCircle>
        </div>

        {loading ? (
          <Loading text="Loading" />
        ) : (
          <Fragment>
            {weather.main && (
              <Fragment>
                <div className="container-icone-weather">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt=""
                  />
                </div>
                <div className="info-weather">
                  <span className="number-temp">
                    {celsiusOrFahrenheit === "celsius"
                      ? roundNumber(
                          conversor[celsiusOrFahrenheit](weather.main.temp)
                        )
                      : roundNumber(
                          conversor[celsiusOrFahrenheit](weather.main.temp)
                        )}
                  </span>
                  <span className="temp-text">
                    {celsiusOrFahrenheit === "celsius" ? "°C" : "°F"}
                  </span>
                </div>
                <p className="weather-situation">{weather.weather[0].main}</p>
                <div className="container-data">
                  <p>Today</p>
                  <span></span>
                  <p>{getData(weather.dt)}</p>
                </div>
                <p className="location">
                  <IoIosPin size={20} color="#88869D" /> {weather.name}
                </p>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Weather.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  weatherLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
  weather: state.weather,
});

const mapDispatchToProps = {
  toggleMenu,
  weatherLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
