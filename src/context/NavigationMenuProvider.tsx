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
  
  // HANDLER
  const toggleModal = (
      modalKey: keyof ModalTypes, 
      switchOffAll?: boolean | undefined
    ) => {
      setModal((prevModal) => {
      modalScrollLock(prevModal[modalKey]); // toggle scrolling
      if(switchOffAll) {
        return { ...MODAL_TOGGLE_STATE_INITIALIZER, [modalKey]: !prevModal[modalKey] }
      }
      return { ...prevModal, [modalKey]: !prevModal[modalKey] };
    })
  };

  return { modal, toggleModal }
}

// ----------CREATE CONTEXT----------
const initContextState: UseNavigationMenuContextType = {
  modal: MODAL_TOGGLE_STATE_INITIALIZER,
  toggleModal: () => {},
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