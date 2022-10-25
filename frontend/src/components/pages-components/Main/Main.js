import React from "react";

import "./Main.css";
import { Header } from "../../nested-components/Header/Header";
import { Promo } from "../../nested-components/Promo/Promo";
import { AboutProject } from "../../nested-components/AboutProject/AboutProject";
import { Techs } from "../../nested-components/Techs/Techs";
import Portfolio from "../../nested-components/Portfolio/Portfolio";
import { AboutMe } from "../../nested-components/AboutMe/AboutMe";
import Footer from "../../nested-components/Footer/Footer";

export const Main = () => {
  return (
    <>
      <Header />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};
