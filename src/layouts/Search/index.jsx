import { useState } from "react";
import "./index.scss";
import "animate.css";
import { BsChevronRight } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { HiOutlineSearch } from "react-icons/hi";

import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menuActions";
import { getGeoLocation } from "../../actions/geoLocationActions";
import { weatherLocation } from "../../actions/weatherActions";

import Loading from "../../components/Loading";

import PropTypes from "prop-types";

const Search = ({
  geoLocation: { geoLocation, loading },
  toggleMenu,
  getGeoLocation,
  weatherLocation,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [display, setDisplay] = useState("none");

  const handleSearchLocation = (e) => {
    e.preventDefault();
    if (inputSearch.trim()) {
      getGeoLocation(inputSearch);
      setInputSearch("");
      setDisplay("block");
    }
  };

  const handleWeatherLocation = (locale) => {
    const { lat, lon } = locale;

    weatherLocation(lat, lon);
    toggleMenu();
    setDisplay("none");
  };

  return (
    <div className="search animate__animated animate__fadeInLeft">
      <button className="close" onClick={toggleMenu}>
        <CgClose size={25} color="#E7E7EB" />
      </button>

      <form>
        <div className="input-container">
          <HiOutlineSearch className="icon-search" size={20} color="#616475" />
          <input
            type="search"
            name="location"
            id="location"
            placeholder="search location"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        <button className="btn-search" onClick={handleSearchLocation}>
          Search
        </button>
      </form>

      {loading && <Loading text="Searching for cities..." />}

      {!loading && geoLocation.length === 0 && (
        <div className="no-results" style={{ display: display }}>
          <p>No results found</p>
        </div>
      )}

      {!loading && geoLocation.length > 0 && (
        <ul className="city-container">
          {geoLocation &&
            geoLocation.map((city, index) => (
              <li
                className="city-box"
                key={String(index)}
                onClick={() => handleWeatherLocation(city)}
              >
                <span className="city-name">
                  {city.name}, {city.state ? `${city.state},` : ""}{" "}
                  {city.country}
                </span>
                <BsChevronRight
                  className="hover-icon"
                  size={16}
                  color="#616475"
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

Search.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  getGeoLocation: PropTypes.func.isRequired,
  geoLocation: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  toggleMenu,
  getGeoLocation,
  weatherLocation,
};

const mapStateToProps = (state) => ({
  geoLocation: state.geoLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
