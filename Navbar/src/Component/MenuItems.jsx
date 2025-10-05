import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && toggleRef.current && !toggleRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    }
  }, [dropdown]);

  const mouseEnter = () => {
    setDropdown(true);
  }
  const mouseLeave = () => {
    setDropdown(false);
  }

  return (
    <li className="menu-items" ref={toggleRef} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {items.subMenu ? (
        <>
          <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(prev => !prev)}
          >
            {items.title} {' '}
            {depthLevel > 0  ? <span>&raquo;</span> : <span className='arrow'></span>}
          </button>
          <Dropdown subMenus={items.subMenu} dropdown={dropdown} depthLevel={depthLevel} />
        </>
      ) : (
        <a href="/#">{items.title}</a>
      )}
  </li>
  )
}

export default MenuItems