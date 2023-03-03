import React from "react";
import "./index.scss";
const index = ({ className = "", onClick = null, children }) => {
  return (
    <button className={`btn-circle ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default index;
