import React from 'react';
import MenuItems from './MenuItems';

const Dropdown = ({ subMenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {subMenus.map((subMenu, index) => (
        <MenuItems key={index} items={subMenu} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}

export default Dropdown