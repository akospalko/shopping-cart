// Navigation menu/modal toggler context: states, handlers 
import { createContext, useState } from "react";
import { ChildrenType } from "../types/filterProviderTypes";
import { modalScrollLock } from "../utility/modalScrollLock";
import { MODAL_TOGGLE_STATE_INITIALIZER } from "../utility/constants";
import { UseNavigationMenuContextType } from "../types/navigationMenuTypes";
import { ModalTypes } from "../types/navigationMenuTypes";

// ---------CONTEXT LOGIC----------
export const useNavigationMenuContext = () => {
  // STATE
  const [modal, setModal] = useState<ModalTypes>(MODAL_TOGGLE_STATE_INITIALIZER);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // HANDLER
  // Toggle menu and lock scroll for fixed position modals
  const toggleModal = (
      modalKey: keyof ModalTypes, 
      switchOffAll?: boolean | undefined
    ) => {
      if (isClosing) return; // prevents rerun toggle functionality while modal is not closed completely
      setIsClosing(true);
      setModal((prevModal) => {
      modalScrollLock(prevModal[modalKey]); // toggle scrolling
      setTimeout(() => {  setIsClosing(false) }, 200); // finish closing after animation ends
      if(switchOffAll) {
        return { ...MODAL_TOGGLE_STATE_INITIALIZER, [modalKey]: !prevModal[modalKey] }
      }
      return { ...prevModal, [modalKey]: !prevModal[modalKey] };
    })
  };

  // Toggle menu with default behavior 
  const toggleMenu = (modalKey: keyof ModalTypes) => {
    setModal((prevModal) => {
      return { ...prevModal, [modalKey]: !prevModal[modalKey] };
    })
  };
  return { modal, isClosing, toggleModal, toggleMenu }
}

// ----------CREATE CONTEXT----------
const initContextState: UseNavigationMenuContextType = {
  modal: MODAL_TOGGLE_STATE_INITIALIZER,
  isClosing: false,
  toggleModal: () => {},
  toggleMenu: () => {}
}

const NavigationMenuContext = createContext<UseNavigationMenuContextType>(initContextState);

// ----------CREATE PROVIDER----------
export const NavigationMenuProvider = ({ children }: ChildrenType) => {

 return(
    <NavigationMenuContext.Provider value={ useNavigationMenuContext() }>
      { children }
    </NavigationMenuContext.Provider>
  )
}

export default NavigationMenuContext;