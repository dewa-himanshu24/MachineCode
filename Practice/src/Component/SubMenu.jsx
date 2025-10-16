import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';

const SubMenu = ({ menuItems }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleRef = useRef();

  return (
    <div className={`nav-submenu`} ref={toggleRef} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>

      {menuItems.subMenu ? (
        <>
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            {menuItems?.title}
          </button>
          <Dropdown subMenuItems={menuItems.subMenu} dropdownOpen={dropdownOpen} />
        </>
      ) : (
        <a href='/#'>{menuItems?.title}</a>
      )}
    </div>
  )
}

export default SubMenu