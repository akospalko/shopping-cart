// TODO: Add loader while submitting search
// Navigation menu togglable modal for small screens: main navigation, product categories
import { ReactElement, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useGetNavigationItems } from "../../hooks/useGetNavigationItems";
import useNavigationMenu from "../../hooks/useNavigationMenu";
import { NAVIGATION_MENU_ITEMS_ACTION } from "../../utility/constants";
import { MODAL_TOGGLE_KEY } from "../../utility/constants";
import textData from "../../data/textData.json";
import MenuModal from "./MenuModal";
import FilterMenuSectionHeader from "../UI/FilterMenuSectionHeader";
import DividerLine from "../UI/DividerLine";
import "./NavigationMenu.css";
import "../styleSheets/cssTransition.css";

const NavigationMenu = () => {
  // REF
  const slideMenuRef = useRef<HTMLDivElement | null>(null);
  
  // CONTEXT
  const { modal } = useNavigationMenu();

  // HOOKS
  const navigationMainMenuItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU_NAVIGATION);
  const navigationProductCategoryItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU_PRODUCT_CATEGORIES);

  // JSX
  // Menu items
  const navigationMain: ReactElement = (
    <>
      <FilterMenuSectionHeader textContent={ textData["pages"] }/>
      <div className="navigation-menu__main-container">
        { navigationMainMenuItems }
      </div>
    </>
  )

  // Product categories
  const navigationProductCategory: ReactElement  = (
    <>
      <FilterMenuSectionHeader textContent={ textData["product-categories"] }/>
      <nav className="navigation-menu__product-category-container">
        { navigationProductCategoryItems }
      </nav>
    </>
  )

  return (
    <CSSTransition
      in={ modal[MODAL_TOGGLE_KEY.MAIN_MENU] }
      nodeRef={ slideMenuRef }
      timeout={ 200 }
      classNames="slide-left-to-right"
      unmountOnExit
    >
      <MenuModal 
        toggleModalKey={ MODAL_TOGGLE_KEY.MAIN_MENU }
        ref={ slideMenuRef }
      >
        { navigationMain }
        <DividerLine style="divider-line--horizontal"/>
        { navigationProductCategory }
      </MenuModal>
    </CSSTransition>
  )
}

export default NavigationMenu;