import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import "./index.scss";

const Loading = ({ text }) => (
  <div className="container-loading">
    <div className="loading-text">{text}</div>
    <AiOutlineLoading className="loading-icon" color="#a0a0b1" />
  </div>
);

export default Loading;
