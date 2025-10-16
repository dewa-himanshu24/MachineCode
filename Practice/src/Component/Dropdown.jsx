import React from 'react';

const Dropdown = ({subMenuItems, dropdownOpen}) => {
  return (
    <div className={`nav-dropdown-wrapper ${dropdownOpen ? 'show' : ''}`}>
      <div className="nav-dropdown-container">
        {subMenuItems?.map((subMenu, idx) => (
            <div className='nav-dropdown-submenu'>
              <div className={!!subMenu?.items ? `nav-submenu-title` : ''}>
                {subMenu?.title}
              </div>
              <ul>
                {subMenu.items?.map((item, idx) => 
                (<li key={idx}>
                  {item}
                </li>)
                )}
              </ul>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown