import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';

const SubMenu = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🧭 Collision Detection
  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdownRef.current.style.left = 'auto';
        dropdownRef.current.style.right = '0';
      } else {
        dropdownRef.current.style.left = '0';
        dropdownRef.current.style.right = 'auto';
      }
    }
  }, [open]);

  return (
    <div
      className="nav-submenu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {menuItems.subMenu ? (
        <>
          <button
            className="nav-trigger"
            aria-expanded={open}
            aria-haspopup="true"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          >
            {menuItems.title}
          </button>
          <Dropdown
            subMenuItems={menuItems.subMenu}
            open={open}
            dropdownRef={dropdownRef}
          />
        </>
      ) : (
        <a href={menuItems.path || '#'}>{menuItems.title}</a>
      )}
    </div>
  );
};

export default SubMenu;
