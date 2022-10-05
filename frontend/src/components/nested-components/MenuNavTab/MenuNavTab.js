import React from "react";

import "./MenuNavTab.css";

function MenuNavTab() {
  return (
    <div className=' navbar '>
      <nav
        className='
      navtab  
           navbar_type_el-navtab     
            btns-block__list 
            navtab__btns
            '
      >
        <a className='navtab-btn btns-block__link ' href='#about-project'>
          О проекте
        </a>
        <a className='navtab-btn btns-block__link ' href='#techs'>
          Технологии
        </a>
        <a className='navtab-btn btns-block__link ' href='#student'>
          Студент
        </a>
      </nav>
    </div>
  );
}

export default MenuNavTab;
