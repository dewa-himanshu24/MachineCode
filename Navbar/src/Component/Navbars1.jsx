import React from 'react';
import './Navbar.css';
import Dropdown from './Dropdown';

const Navbar = ({ data }) => {
  return (
    <div className="navbar-wrapper">
      {console.log('~ Object.entries(menuItems)', Object.entries(data))}
      <div className="navbar-container">
        {Object.entries(data)?.map(([menuName, menuItems]) => {
          return (
            <div className='navbar-menu'>
              {console.log('~ menuName menuItems', menuName, menuItems)}
              <button
                type='button'
                role='dropdown'
                aria-haspopup='menu'
                aria-expanded='true'
              >
                {menuName}
              </button>
              <Dropdown
                menuItems={menuItems}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar


// menuItem?.map((item) => {
//   console.log('~ item', item);
//   return (
//     <div>
//       {item}
//     </div>
//   )
// })