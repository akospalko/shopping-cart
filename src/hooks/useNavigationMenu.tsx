// Custom hook to consume NavigationMenuContext & export
import { useContext } from "react";
import NavigationMenuContext from "../context/NavigationMenuProvider";

const useNavigationMenu = () => {
  return useContext(NavigationMenuContext);
}

export default useNavigationMenu;