import React, { useEffect, Fragment } from "react";
import ButtonCircle from "../../components/ButtonCircle";
import Loading from "../../components/Loading";
import { MdNavigation } from "react-icons/md";
import { connect } from "react-redux";
import convertMetersToKm from "../../utils/convertMetersToKm";
import { setCelsiusOrFahrenheit } from "../../actions/weatherActions";
import getData from "../../utils/getData";
import roundNumber from "../../utils/roundNumber";
import conversor from "../../utils/temperatureConverter";
import "./index.scss";

const Info = ({
  weather: { weather, forecast, celsiusOrFahrenheit, loading },
  setCelsiusOrFahrenheit,
}) => {
  const changeTemperatureType = () => {
    setCelsiusOrFahrenheit(
      celsiusOrFahrenheit === "celsius" ? "fahrenheit" : "celsius"
    );
  };

  return (
    <Fragment>
      <div className="info">
        <div className="container-info">
          <div className="container-btn-temp">
            <ButtonCircle
              className={celsiusOrFahrenheit === "celsius" ? "active" : ""}
              onClick={changeTemperatureType}
            >
              °C
            </ButtonCircle>
            <ButtonCircle
              className={celsiusOrFahrenheit === "fahrenheit" ? "active" : ""}
              onClick={changeTemperatureType}
            >
              °F
            </ButtonCircle>
          </div>

          <div className="boxContainer">
            {loading ? (
              <Loading text="Loading Weather" />
            ) : (
              <Fragment>
                {forecast && (
                  <Fragment>
                    {forecast.map((item, index) => {
                      return (
                        <div className="card" key={index}>
                          <h3>{index == 0 ? "Tomorrow" : getData(item.dt)}</h3>
                          <img
                            src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                            alt=""
                          />
                          <div className="minAndMaxTemp">
                            <span className="maxTemp">
                              {celsiusOrFahrenheit === "celsius"
                                ? roundNumber(
                                    conversor[celsiusOrFahrenheit](item.temMax)
                                  )
                                : roundNumber(
                                    conversor[celsiusOrFahrenheit](item.temMax)
                                  )}
                              {celsiusOrFahrenheit === "celsius" ? "°C" : "°F"}
                            </span>
                            <span className="minTemp">
                              {celsiusOrFahrenheit === "celsius"
                                ? roundNumber(
                                    conversor[celsiusOrFahrenheit](item.temMin)
                                  )
                                : roundNumber(
                                    conversor[celsiusOrFahrenheit](item.temMin)
                                  )}
                              {celsiusOrFahrenheit === "celsius" ? "°C" : "°F"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
          <div className="boxInfoTemp">
            <h2>Today’s Hightlights </h2>

            <div className="cardTempInfo">
              <p className="title">Wind status</p>
              {loading ? (
                <Loading text="" />
              ) : (
                <p className="dataInfo">
                  <span className="dataNumbTemp">{weather.wind.speed}</span>
                  <span className="dataTextInfo">km/h</span>
                </p>
              )}
              <div className="containerIconTemp">
                <span
                  className="circleTemp"
                  style={{
                    transform: `rotate(${
                      weather && weather.wind && weather.wind.deg
                        ? weather.wind.deg
                        : 0
                    }deg)`,
                  }}
                >
                  <MdNavigation size={15} color="#E7E7EB" />
                </span>
                <span className="tempText">wsw</span>
              </div>
            </div>

            <div className="cardTempInfo">
              <p className="title">Humidity</p>
              {loading ? (
                <Loading text="" />
              ) : (
                <p className="dataInfo">
                  <span className="dataNumbTemp">{weather.main.humidity}</span>
                  <span className="dataTextInfo">%</span>
                </p>
              )}
              <div className="progress">
                <div className="progress-percentage">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                <div className="progessbar">
                  <span
                    className="inProgress"
                    style={{
                      width:
                        weather && weather.main && weather.main.humidity
                          ? weather.main.humidity + "%"
                          : "0%",
                    }}
                  ></span>
                </div>
                <span className="percentage">%</span>
              </div>
            </div>

            <div className="cardTempInfo">
              <p className="title">Visibility</p>
              {loading ? (
                <Loading text="" />
              ) : (
                <p className="dataInfo">
                  <span className="dataNumbTemp">
                    {convertMetersToKm(weather.visibility)}
                  </span>

                  <span className="dataTextInfo">km</span>
                </p>
              )}
            </div>

            <div className="cardTempInfo">
              <p className="title">Air Pressure</p>
              {loading ? (
                <Loading text="" />
              ) : (
                <p className="dataInfo">
                  <span className="dataNumbTemp">{weather.main.pressure}</span>
                  <span className="dataTextInfo">hPa</span>
                </p>
              )}
            </div>
          </div>
          <p className="footer">
            created by Vinicius de Abreu - devChallenges.io
          </p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

const mapDispatchToProps = {
  setCelsiusOrFahrenheit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
