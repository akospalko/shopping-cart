// Header with serach bar and filter toggler menu for small screens
import useNavigationMenu from "../../hooks/useNavigationMenu";
import useScrollHeader from "../../hooks/useScrollHeader";
import { FilterIcon } from "../SVGComponents";
import SearchBar from "../UI/SearchBar";
import './HeaderSearchBar.css';

const HeaderSearchBar = () => {
  // CONTEXT
  const { isNavMenuOpen, toggleFilterMenuHandler } = useNavigationMenu();
  
  // HOOK
  const { showHeader } = useScrollHeader();

  // STYLE
  const iconSize = "25px";
  const iconColor = "var(--color-4)";
  const onScrollSearchBarAnimation = !showHeader ? "header-search-bar-small-screen--scrolled" : ""; 
  const hideSearchBarOnToMenuOpen = isNavMenuOpen ? "header-search-bar-small-screen--hidden" : "";

  return (
    <div className={ `header-search-bar-small-screen ${ onScrollSearchBarAnimation } ${ hideSearchBarOnToMenuOpen }` }>
      <button 
        onClick={ () => toggleFilterMenuHandler() }
        className="button--filter-menu"
      > 
        <FilterIcon 
          width={ iconSize } 
          height={ iconSize } 
          stroke={ iconColor }
        />
      </button>
      <SearchBar containerStyle="search-bar--h40px"/>
    </div>
  )
}

export default HeaderSearchBar;