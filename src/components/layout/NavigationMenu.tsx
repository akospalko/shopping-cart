// Navigation menu togglable modal for small screens: main navigation, product categories
import { ReactElement } from "react";
import { useGetNavigationItems } from "../../hooks/useGetNavigationItems";
import useNavigationMenu from "../../hooks/useNavigationMenu";
import { NAVIGATION_MENU_ITEMS_ACTION } from "../../utility/constants";
import textData from "../../data/textData.json";
import "./NavigationMenu.css";

const NavigationMenu = (): ReactElement => {
  // CONTEXT
  const { isNavMenuOpen } = useNavigationMenu();

  // HOOKS
  const navigationMainMenuItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU);
  const navigationProductCategoryItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.PRODUCT_CATEGORY);

  // JSX
  // Menu items
  const navigationMain: ReactElement = (
    <>
      <h2> { textData["pages"] } </h2>
      <div className="navigation-menu__main-container">
        { navigationMainMenuItems }
      </div>
    </>
  )

  // Product categories
  const navigationProductCategory: ReactElement  = (
    <>
      <h2> { textData["product-categories"] } </h2>
      <nav className="navigation-menu__product-category-container">
        { navigationProductCategoryItems }
      </nav>
    </>
  )

  return (
    <>
      { isNavMenuOpen 
      ? ( 
          <div className="navigation-menu__backdrop">
            <div className="navigation-menu__modal">
              { navigationMain }
              { navigationProductCategory }
            </div>
          </div> 
        )  
      : null
      } 
    </>
  )
}

export default NavigationMenu;