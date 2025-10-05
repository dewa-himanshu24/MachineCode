import { menuItemsData } from "../../menuData";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const depthLevel = 0;

  return (
    <nav className="main-nav">
      <ul className="menus">
        {
          menuItemsData.map((menu, index) => (
            <MenuItems items={menu} key={index} depthLevel={depthLevel} />
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar