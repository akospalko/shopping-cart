// Products search bar and handlers
import React, { useState, ChangeEvent, FocusEventHandler, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import useProducts from "../../hooks/useProducts";
import useFilter from "../../hooks/useFilter";
import { ProductItemType } from "../../types/productsProviderTypes";
import { RemoveIcon, SearchIcon } from "../SVGComponents";
import { trimInput } from "../../utility/trimInput";
import { SEARCH } from "../../utility/constants";
import textData from "../../data/textData.json";
import "./SearchBar.css";

// TYPES
type SearchBarPropsType = {
  containerStyle?: string
}

// COMPONENT
const SearchBar = ({ containerStyle }: SearchBarPropsType) => {
  // ROUTE
  const navigate = useNavigate();

  // STATE
  const [isRemoveIconFocused, setIsRemoveIconFocused] = useState<boolean>(false);

  // CONTEXTS
  const {
    dispatch: dispatchProducts,
    REDUCER_ACTIONS_PRODUCT,
    products,
    filteredProducts,
  } = useProducts();

  const { 
    dispatch: dispatchFilter, 
    searchStatus, 
    searchTerm, 
    REDUCER_ACTIONS_FILTER, 
  } = useFilter();

  // HANDLERS
  // Update search bar input field content
  const searchBarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilter({
      type: REDUCER_ACTIONS_FILTER.UPDATE_SEARCH_TERM,
      payload: { searchTerm: e.target.value },
    });
  };

  // Search product (debounced)
  const debouncedSearchProductHandler = debounce((term: string = "") => {
    // check if search term was provided
    const searchTermFormatted: string = trimInput(term);
    
    navigate(`/search/1`, { replace: true });

    if (searchTermFormatted?.length < 2) {
      dispatchFilter({
        type: REDUCER_ACTIONS_FILTER.SEARCH_STATUS,
        payload: { searchStatus: textData["search-bar-placeholder"] },
      });
      return;
    }

    // find products where product name is matching the search term
    const foundProducts: ProductItemType[] = products?.filter((product: ProductItemType) =>
      product.name.toLowerCase().includes(searchTermFormatted?.toLowerCase())
    ) ?? [];

    // checks: found / not found products
    if (foundProducts.length) {
      dispatchFilter({
        type: REDUCER_ACTIONS_FILTER.SEARCH_STATUS,
        payload: { searchStatus: SEARCH.RESULT },
      });
      dispatchProducts({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: foundProducts },
      });
    } else {
      dispatchFilter({
        type: REDUCER_ACTIONS_FILTER.SEARCH_STATUS,
        payload: { searchStatus: SEARCH.NO_RESULT },
      });
      dispatchProducts({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: [] },
      });
    }
  }, 300);  

  // Remove search results empty search bar input field
  const removeSearchResultsHandler = debounce(() => {
    if(searchStatus === "" && !searchTerm?.length) return;
    // empty input field
    dispatchFilter({ type: REDUCER_ACTIONS_FILTER.UPDATE_SEARCH_TERM, payload: { searchTerm: "" } });
    dispatchFilter({ type: REDUCER_ACTIONS_FILTER.SEARCH_STATUS, payload: { searchStatus: "" } });

    if (filteredProducts?.length) {
      dispatchProducts({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS, payload: { filteredProducts: [] } });
    }
    navigate("/all/1", { replace: true }); 
  }, 500);

  // Focus and blur element handler (reusable): value -> true - focus / value -> false - blur
  const createFocusBlurHandler = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, value: boolean): (() => void) => () => (
    setStateFunction(value)
  );

  const onRemoveIconFocusHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, true);
  const onRemoveIconBlurHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, false);

  // STYLE
  const iconSize: string = "20px";
  const iconColor: string = "var(--color-1)";

  // JSX
  // Remove search term button
  const RemoveSearchTermButton = (
    <button
      className="button--search-bar-remove-term"
      onClick={ removeSearchResultsHandler }
      onFocus={ onRemoveIconFocusHandler }
      onBlur={ onRemoveIconBlurHandler }
    >
      <RemoveIcon 
        wrapperCustomStyle={{ zIndex: "3" }} 
        width={ iconSize } 
        height={ iconSize } 
        fill={ isRemoveIconFocused ? "var(--color-1)" : iconColor } 
        strokeWidth="0" 
      />
    </button>
  );

  // Input field
  const searchInputField: ReactElement = ( 
    <input
      className="input--search-bar"
      placeholder={ textData["search-bar-placeholder"] }
      name="search-bar"
      onChange={ searchBarHandler }
      value={ searchTerm }
      autoComplete="off"
    />
  )

  // Submit button
  const submitSearchButton: ReactElement = (
    <button
      className="button--search-bar-submit"
      onClick={ () => debouncedSearchProductHandler(searchTerm) }
    >
      <SearchIcon 
        width={ iconSize} 
        height={ iconSize } 
        stroke={ iconColor } 
      />
    </button>
  )

  return (
    <div className={ `search-bar ${ containerStyle }` }>
      { searchInputField }
      { RemoveSearchTermButton }
      { submitSearchButton }
    </div>
  );
};

export default SearchBar;