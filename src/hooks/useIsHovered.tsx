// Element (e.g. icon) hovered handler and state 
import {useState} from "react";

// CUSTOM HOOK
const useIsHovered = () => {
  
  // STATE
  const [isElementHovered, setIsIconHovered] = useState<boolean>(false);

  // HANDLERS
  // element hovered state on / off
  const elementMouseEnter = () => {
    setIsIconHovered(true);
  };

  const elementMouseLeave = () => {
    setIsIconHovered(false);
  };
  
  return {isElementHovered, elementMouseEnter, elementMouseLeave}
}

export default useIsHovered