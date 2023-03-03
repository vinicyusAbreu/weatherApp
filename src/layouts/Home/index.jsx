import React, { useEffect } from "react";
import Weather from "../Weather";
import Search from "../Search";
import Info from "../Info";
import "./index.scss";
import { weatherLocation } from "../../actions/weatherActions";
import { connect } from "react-redux";

const index = ({ menu: { menuToggle }, weatherLocation }) => {
  useEffect(() => {
    weatherLocation();
  }, [weatherLocation]);

  return (
    <div className="container">
      {menuToggle ? <Search /> : <Weather />}
      <Info />
    </div>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

const mapDispatchToProps = {
  weatherLocation,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
