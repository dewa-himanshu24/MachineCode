import React from 'react';
import SubMenu from './SubMenu';
import { menuItemsData } from '../demoSlide';

const NavigationBar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        {menuItemsData.map((menu, idx) => (
          <SubMenu key={idx} menuItems={menu} />
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
