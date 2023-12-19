// Header for large screen layout
import SearchBar from "../UI/SearchBar";
import { NAVIGATION_MENU_ITEMS_ACTION } from "../../utility/constants";
import { useGetNavigationItems } from "../../hooks/useGetNavigationItems";
import { HeaderLogo, MenuTogglerButton, ProductInCartCounter } from "./HeaderComponents";
import "./HeaderBar.css";

const HeaderBar = () => {
  // HOOKS
  const navigationBarItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.MAIN_BAR);

  // JSX
  // Navigation items
  const navigationItems = (
    <nav className="header-bar__navigation-items">
      { navigationBarItems }
    </nav>
  )

  // Search bar
  const searchBar = (
    <div className="header-bar__search-bar">
      <SearchBar/>
    </div>
  )

  return (
    <header className="header-bar">
      <div className="group-left">
        <MenuTogglerButton style="button--sidemenu-toggler"/>
        <HeaderLogo style="header-bar__logo"/>
      </div>
      <div className="group-center">
        { searchBar }
      </div>
      <div className="group-right">
        { navigationItems }
        <ProductInCartCounter style="header-bar__cart"/>
      </div>
    </header>
  )
}

export default HeaderBar;