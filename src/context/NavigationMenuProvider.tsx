// Navigation menu/modal toggler context: states, handlers 
import { createContext, useState } from "react";
import { ChildrenType } from "../types/filterProviderTypes";
import { modalScrollLock } from "../utility/modalScrollLock";

// TYPES
type ToggleMenusHandlerType = (shouldClose?: boolean) => void;
type UseNavigationMenuContextType = {
  isNavMenuOpen: boolean;
  isFilterMenuOpen: boolean;
  toggleNavMenuHandler: ToggleMenusHandlerType;
  toggleFilterMenuHandler: ToggleMenusHandlerType;
}

// ---------CONTEXT LOGIC----------
export const useNavigationMenuContext = () => {
  // STATES
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);

  // HANDLERS
  // toggle header menu / force close
  const toggleNavMenuHandler: ToggleMenusHandlerType = (shouldClose?: boolean) => {
    setIsNavMenuOpen((prev) => {
      modalScrollLock(prev, shouldClose);
      return shouldClose ? false : !prev;
    });
  };
  
  // toggle filter menu / force close
  const toggleFilterMenuHandler: ToggleMenusHandlerType = (shouldClose?: boolean) => {
    setIsFilterMenuOpen((prev) => {
      modalScrollLock(prev, shouldClose);
      return shouldClose ? false : !prev;
    });
  };
  
  return {
    isNavMenuOpen,
    isFilterMenuOpen,
    toggleNavMenuHandler,
    toggleFilterMenuHandler,
  }
}

// ----------CREATE CONTEXT----------
const initContextState: UseNavigationMenuContextType = {
  isNavMenuOpen: false,
  isFilterMenuOpen: false,
  toggleNavMenuHandler: () => {},
  toggleFilterMenuHandler: () => {},
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