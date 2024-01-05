// Reusable menu modal; used for: filter and navigation menus 
import { ReactNode, ReactElement, ForwardedRef, forwardRef } from "react";
import { RemoveIcon } from "../SVGComponents";
import useNavigationMenu from "../../hooks/useNavigationMenu";
import { MODAL_TOGGLE_KEY } from "../../utility/constants";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./MenuModal.css";

// TYPES
type MenuModalPropsType = {
  children: ReactNode,
  toggleModalKey: keyof typeof MODAL_TOGGLE_KEY
}

type MenuModalButtonStyleType = {
  wrapper: string, 
  button: string
}

const MenuModal = forwardRef(({ children, toggleModalKey }: MenuModalPropsType, ref: ForwardedRef<HTMLDivElement>) => {
  // CONTEXT
  const { toggleModal } = useNavigationMenu();
  
  // HOOKS
  const isVerySmallScreen: boolean = useMediaQuery("(max-width: 359px)");
  const isSmallToLargeScreen: boolean = useMediaQuery("(min-width: 360px)");
  
  // STYLE
  const iconSize: string = "20px"; 
  const iconColor: string = "var(--color-5)";
  const buttonStyleVerySmall = {
    wrapper: "menu-modal__close-button-wrapper--very-small",
    button: "button--close-menu-modal-very-small"
  };
  const buttonStyleSmallToLarge = {
    wrapper: "menu-modal__close-button-wrapper--small-to-large",
    button: "button--close-menu-modal-small-to-large"
  };

  // JSX
  // Buttons
  const closeMenuModalButton = (customStyle: MenuModalButtonStyleType): ReactElement => (
    <div className={ customStyle.wrapper || "" }>
      <button 
        className={ `button--close-menu-modal ${ customStyle.button }` }
        onClick={ () => toggleModal(toggleModalKey, true) }
      > 
        <RemoveIcon 
          width={ iconSize }
          height={ iconSize }
          fill={ iconColor }
          stroke={ iconColor }
        />
      </button>
    </div>
  )

  // Layout
  // Very small
  const verySmallScreenLayout = (
    <div 
      className="menu-modal__very-small"
      ref={ ref }
    >
      <div className="menu-modal__modal-content--very-small">
      { closeMenuModalButton(buttonStyleVerySmall) }
        { children } 
      </div>
    </div>
  )

  // Small to large
  const smallToLargeScreenLayout: ReactElement = (
    <div className="menu-modal__backdrop">
      <div 
        className="menu-modal__modal"
        ref={ ref }
      >
        <div className="menu-modal__modal-content">
          { children }
        </div>
        { closeMenuModalButton(buttonStyleSmallToLarge) }
      </div>
    </div>
  )

  let activeLayout: ReactElement = <> </>;
  
  if(isVerySmallScreen) {
    activeLayout = verySmallScreenLayout;
  } else if(isSmallToLargeScreen) {
    activeLayout = smallToLargeScreenLayout;
  }

  return activeLayout;
})

export default MenuModal;