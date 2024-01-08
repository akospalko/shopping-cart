// App's global UI elements layout: header and variants, menu modals (!footer)
import { ReactNode, memo, } from "react";
import NavigationMenu from "./NavigationMenu";
import FilterMenu from "./FilterMenu";
import HeaderMenu from "./HeaderMenu";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../../hooks/useMediaQuery";
import HeaderSearchBar from "./HeaderSearchBar";

// TYPE
type LayoutProps = {
  children?: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  // HOOK
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // LAYOUT 
  const layoutSmall = (
    <>
      <HeaderMenu/>
      <HeaderSearchBar/> 
      <NavigationMenu/>
      <FilterMenu/>
    </>
  );
  
  const layoutLarge = <HeaderBar/>;

  return (
    <>
      { isLargeScreen ? layoutLarge : layoutSmall }
      { children }
    </>
  )
})

export default Layout;
