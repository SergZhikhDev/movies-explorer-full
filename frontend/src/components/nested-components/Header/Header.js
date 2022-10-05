import React from "react";
import "./Header.css";
import Menu from "../Menu/Menu";

import Logo from "../Logo/Logo";
import MenuResponce from "../MenuResponce/MenuResponce";

function Header() {
  return (
    <header className=' header sp hp'>
      <Logo />
      <Menu />
      <MenuResponce />
    </header>
  );
}

export default Header;
