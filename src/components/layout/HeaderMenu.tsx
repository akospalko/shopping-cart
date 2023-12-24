// Header for small screen layout
import useNavigationMenu from "../../hooks/useNavigationMenu";
import { HeaderLogo, MenuTogglerButton, ProductInCartCounter } from "./HeaderComponents";
import { MODAL_TOGGLE_KEY } from "../../utility/constants";
import useScrollHeader from "../../hooks/useScrollHeader";
import "./HeaderMenu.css";

const HeaderMenu = () => {
  // CONTEXT
  const { modal } = useNavigationMenu();

  // HOOK
  const { showHeader } = useScrollHeader();

  // STYLE
  const onScrollSearchBarAnimation = !modal[MODAL_TOGGLE_KEY.MAIN_MENU] && !showHeader ? "header-menu--scrolled" : "";
  
  return(
    <header className={ `header-menu ${ onScrollSearchBarAnimation }`}>
      <MenuTogglerButton style="button--menu-modal-toggler"/>
      <HeaderLogo style="header-bar__logo"/>
      <ProductInCartCounter style="header-menu__cart"/>
    </header>
  )
}

export default HeaderMenu;