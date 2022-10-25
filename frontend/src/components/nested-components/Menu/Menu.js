import React, { useContext } from "react";

import "./Menu.css";
import MenuNavigation from "../MenuNavigation/MenuNavigation";
import MenuAuth from "../MenuAuth/MenuAuth";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Menu() {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <div className='menu'>
      {isLoggedIn && <MenuNavigation />}
      {!isLoggedIn && <MenuAuth />}
    </div>
  );
}

export default Menu;
