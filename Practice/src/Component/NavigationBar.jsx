import React from 'react';
import { menuItemsData } from '../demoSlide';
import SubMenu from './SubMenu';

const NavigationBar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        {menuItemsData?.map((menu, idx) => (
          <SubMenu key={idx} menuItems={menu} />
        ))}
      </div>
    </div>
  )
}

export default NavigationBar