import React from "react";
import "./Header.css";
import Menu from "../Menu/Menu";

import Logo from "../Logo/Logo";
import MenuResponce from "../MenuResponce/MenuResponce";

export const Header = () => {
  return (
    <header className=' header sp'>
      <Logo />
      <Menu />
      <MenuResponce />
    </header>
  );
};
