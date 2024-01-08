// Header with serach bar and filter toggler menu for small screens
import useScrollHeader from "../../hooks/useScrollHeader";
import SearchBar from "../UI/SearchBar";
import './HeaderSearchBar.css';

const HeaderSearchBar = () => {
  // CONTEXT
  // HOOK
  const { showHeader } = useScrollHeader();

  // STYLE
  const onScrollSearchBarAnimation = !showHeader ? "header-search-bar-small-screen--scrolled" : ""; 

  return (
    <div className={ `header-search-bar-small-screen ${ onScrollSearchBarAnimation }` }>
      <SearchBar containerStyle="search-bar--h40px"/>
    </div>
  )
}

export default HeaderSearchBar;