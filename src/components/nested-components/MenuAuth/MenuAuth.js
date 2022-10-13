import React from "react";
import "./MenuAuth.css";
import MenuAuthBtnsList from "../MenuAuthBtnsList/MenuAuthBtnsList";

function MenuAuth() {
  return (
    <div className='auth navbar '>
      <MenuAuthBtnsList />
    </div>
  );
}

export default MenuAuth;
