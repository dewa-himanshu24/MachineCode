import React from 'react';

const Dropdown = ({ subMenuItems, open, dropdownRef }) => {
  return (
    <div
      ref={dropdownRef}
      className={`nav-dropdown-wrapper ${open ? 'show' : ''}`}
    >
      <div
        className={`nav-dropdown-container ${
          subMenuItems.length > 1 ? 'two-column' : 'single-column'
        }`}
      >
        {subMenuItems.map((subMenu, idx) => (
          <div key={idx} className="nav-dropdown-submenu">
            <div className="nav-submenu-title">{subMenu.title}</div>
            <ul>
              {subMenu.items?.map((item, i) => (
                <li key={i}>
                  <a href={item.path || '#'}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
