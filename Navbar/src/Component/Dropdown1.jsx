import React from 'react';

const Dropdown = ({ menuItems }) => {
  return (
    <div className='dropdown-wrapper'>
      <div>
        <div className='sub'>
          {menuItems?.label}
        </div>
        <div>
          <ul>
            {menuItems?.subMenu?.map((item) => (
              <li>{item?.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dropdown