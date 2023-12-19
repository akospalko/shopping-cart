// Shared header components: menu toggler button, logo, cart & counter
import { MenuIcon, CartIcon } from "../SVGComponents";
import useNavigationMenu from "../../hooks/useNavigationMenu";
import useCart from "../../hooks/useCart";
import textData from "../../data/textData.json";
import "./HeaderComponents.css";

// TYPE
type HeaderComponentsPropsType = { style?: string  }

// Logo
export const HeaderLogo = ({ style }: HeaderComponentsPropsType) => {
  return (
    <div className={ `header__logo ${ style }` }>
      <span>{ textData["logo"] }</span>
    </div>
  )
}

// Menu toggler button
export const MenuTogglerButton = ({ style }: HeaderComponentsPropsType) => {

  // HOOK
  const { isNavMenuOpen, toggleNavMenuHandler } = useNavigationMenu();
  // TODO outsource icon style
  // TODO merge shared style

  // STYLE
  const iconSize = "20px";
  const iconStroke = "var(--color-4)";

  const activeNavMenuButtonAnimation = isNavMenuOpen ? "button--menu-toggler-shared-open" : "";

  return (
    <button 
      onClick={ () => toggleNavMenuHandler() }
      className={ `button--menu-toggler-shared ${ style } ${ activeNavMenuButtonAnimation }` }
    >
      <MenuIcon 
        width={ iconSize } 
        height={ iconSize } 
        stroke={ iconStroke }
      />
    </button>
  )
}

// Cart & in cartcounter
export const ProductInCartCounter = ({ style }: HeaderComponentsPropsType) => {
  // CONTEXT
  const { totalItems } = useCart();

  // STYLE
  const cartItemStyle = {
    "height": "auto", 
    "width": "auto",
    "alignItems": "center"
  };
  const iconSize = "25px";
  const iconFill = "var(--color-4)";

  // DATA
  const productInCartCounter: string = totalItems > 100 ? "100+" : (totalItems).toString();

  return (
    <div className={ `header__cart ${ style }` }>
      <CartIcon
        width={ iconSize } 
        height={ iconSize } 
        fill={ iconFill }
        wrapperCustomStyle={ cartItemStyle }
      /> 
      { totalItems > 0 ? 
        <span className="header__cart-counter"> { productInCartCounter } </span> : null
      }
    </div>
  )
}