// Products search bar and related logic
import React, { useState, ChangeEvent, CSSProperties, FocusEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import useProducts from "../hooks/useProducts";
import { ProductItemType } from "../types/productsProviderTypes";
import { RemoveIcon, SearchIcon } from "./SVGComponents";
import { trimInput } from "../utility/trimInput";
import { SEARCH } from "../utility/constants";
import textData from '../data/textData.json';
import "./SearchBar.css";

// COMPONENT
const SearchBar: React.FC = () => {
  // ROUTE
  const navigate = useNavigate();

  // STATE
  const [isRemoveIconFocused, setIsRemoveIconFocused] = useState<boolean>(false);

  // CONTEXTS
  const {
    dispatch,
    searchStatus,
    REDUCER_ACTIONS_PRODUCT,
    products,
    filteredProducts,
    searchTerm,
  } = useProducts();

  // HANDLERS
  // Update search bar input field content
  const searchBarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_SEARCH_TERM,
      payload: { searchTerm: e.target.value },
    });
  };

  // Search product (debounced)
  const debouncedSearchProductHandler = debounce((term: string = "") => {
    // check if search term was provided
    const searchTermFormatted: string = trimInput(term);
    
    navigate(`/search/1`, { replace: true });

    if (searchTermFormatted?.length < 2) {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
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
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
        payload: { searchStatus: SEARCH.RESULT },
      });
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: foundProducts },
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
        payload: { searchStatus: SEARCH.NO_RESULT },
      });
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: [] },
      });
    }
  }, 500);  

  // Remove search results empty search bar input field
  const removeSearchResultsHandler = debounce(() => {
    if(searchStatus === "" && !searchTerm?.length) return;
    // empty input field
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_SEARCH_TERM, payload: { searchTerm: "" } });
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS, payload: { searchStatus: "" } });

    if (filteredProducts?.length) {
      dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS, payload: { filteredProducts: [] } });
    }
    navigate("/", { replace: true }); 
  }, 500);

  // Reusable handlers for focusing and blurring various elements: value -> true - focus / value -> false - blur
  const createFocusBlurHandler = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, value: boolean): (() => void) => () => (
    setStateFunction(value)
  );

  const onRemoveIconFocusHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, true);
  const onRemoveIconBlurHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, false);

  // STYLE
  const searchIconStyle: CSSProperties = {
    width: "40px", 
    height: "100%",
    position: "absolute",
    left: "0",
    zIndex: "3",
  };
  const iconSize: string = "20px";
  const iconColor: string = "var(--color-1)";

  // ELEMENTS
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
        fill={ isRemoveIconFocused ? "var(--color-7)" : iconColor } 
        strokeWidth="0" 
      />
    </button>
  );

  return (
    <div className="search-bar">
      <SearchIcon 
        width={ iconSize} 
        height={ iconSize } 
        stroke={ iconColor } 
        wrapperCustomStyle={ searchIconStyle } 
      />
      <input
        className="input--search-bar"
        placeholder={ textData["search-bar-placeholder"] }
        name="search-bar"
        onChange={ searchBarHandler }
        value={ searchTerm }
        autoComplete="off"
      />
      { RemoveSearchTermButton }
      <button
        className="button--search-bar-submit"
        onClick={ () => debouncedSearchProductHandler(searchTerm) }
      >
        { textData["search-button-label"] }
      </button>
    </div>
  );
};

export default SearchBar;