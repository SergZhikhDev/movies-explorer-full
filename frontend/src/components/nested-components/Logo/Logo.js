import React from "react";
import { useHistory } from "react-router-dom";

import "./logo.css";

import logo from "../../../images/logo.svg";

function Logo() {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }
  return (
    <img
      className=' logo'
      src={logo}
      alt='логотип проекта Movies-Explorer'
      onClick={handleClick}
    />
  );
}

export default Logo;
