// Products search bar and related logic
import React, { useState, ChangeEvent, CSSProperties, FocusEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import useProducts from '../hooks/useProducts';
import { ProductItemType } from '../types/productsProviderTypes';
import { RemoveIcon, SearchIcon } from './SVGComponents';
import { trimInput } from '../utility/trimInput';
import './SearchBar.css';

const CONSTANTS = {
  SEARCH_BUTTON_LABEL: 'Search',
  SEARCH_BAR_PLACEHOLDER: 'Search for a product (min. 3 char.)',
  SEARCH_NO_INPUT: 'SEARCH_NO_INPUT',
  SEARCH_RESULT: 'SEARCH_RESULT',
  SEARCH_NO_RESULT: 'SEARCH_NO_RESULT',
};

// COMPONENT
const SearchBar: React.FC = () => {
  // ROUTE
  const navigate = useNavigate();

  // STATE
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  const [isRemoveIconFocused, setIsRemoveIconFocused] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    setIsSearching(false);
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_SEARCH_VALUE,
      payload: { searchTerm: e.target.value },
    });
  };

  // Search product (debounced)
  const debouncedSearchProductHandler = debounce((term: string = '') => {
    setIsSearching(true);
    navigate(`/search/1`, { replace: true });
    // check if search term was provided
    const searchTermFormatted: string = trimInput(term);
    if (searchTermFormatted?.length < 2) {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
        payload: { searchStatus: CONSTANTS.SEARCH_BAR_PLACEHOLDER },
      });
      return;
    }
    // find products where product name is matching the search term
    let foundProducts: ProductItemType[] = [];
    foundProducts =
      products?.filter((product: ProductItemType) =>
        product.name.toLowerCase().includes(searchTermFormatted?.toLowerCase())
      ) ?? [];
    // checks: found / not found products
    if (foundProducts.length) {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
        payload: { searchStatus: 'SEARCH_RESULT' },
      });
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: foundProducts },
      });
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_ACTIVE_PAGE,
        payload: { activePage: 1 },
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS,
        payload: { searchStatus: 'SEARCH_NO_RESULT' },
      });
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: { filteredProducts: [] },
      });
    }
  }, 300);

  // Remove search results empty search bar input field
  const removeSearchResultsHandler = debounce(() => {
    if(searchStatus === '' && !searchTerm?.length) return;
    // empty input field
    dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: { searchTerm: '' } });
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.SEARCH_STATUS, payload: { searchStatus: '' } });

    if (filteredProducts?.length) {
      dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS, payload: { filteredProducts: [] } });
    }
    navigate('/all/1'); // navigate back to products
  }, 300);


  // Reusable handlers for focusing and blurring various elements: value -> true - focus / value -> false - blur
  const createFocusBlurHandler = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>, value: boolean): (() => void) => () => (
    setStateFunction(value)
  );
  const onSearchBarFocusHandler: FocusEventHandler<HTMLInputElement> = createFocusBlurHandler(setIsSearchBarFocused, true);
  const onSearchBarBlurHandler: FocusEventHandler<HTMLInputElement> = createFocusBlurHandler(setIsSearchBarFocused, false);
  const onRemoveIconFocusHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, true);
  const onRemoveIconBlurHandler: FocusEventHandler<HTMLButtonElement> = createFocusBlurHandler(setIsRemoveIconFocused, false);

  // STYLE
  const searchIconStyle: CSSProperties = {
    width: '40px',
    height: '100%',
    position: 'absolute',
    left: '0',
    zIndex: '3',
  };
  const iconSize: string = '20px';
  const iconColor: string = 'var(--color-5)';

  // ELEMENTS
  const RemoveSearchTermButton = (
    <button
      className='button--search-bar-remove-term'
      onClick={ removeSearchResultsHandler }
      onFocus={ onRemoveIconFocusHandler }
      onBlur={ onRemoveIconBlurHandler }
    >
      <RemoveIcon 
        wrapperCustomStyle={{ zIndex: '3' }} 
        width={ iconSize } 
        height={ iconSize } 
        fill={ isRemoveIconFocused ? 'var(--color-7)' : iconColor } 
        strokeWidth='0' 
      />
    </button>
  );

  return (
    <div className='search-bar'>
      <SearchIcon 
        width={ iconSize} 
        height={ iconSize } 
        stroke={ isSearchBarFocused ? 'var(--color-7)': iconColor } 
        wrapperCustomStyle={ searchIconStyle } 
      />
      <input
        className='input--search-bar'
        placeholder={ CONSTANTS.SEARCH_BAR_PLACEHOLDER }
        name='search-bar'
        onChange={ searchBarHandler }
        value={ searchTerm }
        onFocus={ onSearchBarFocusHandler }
        onBlur={ onSearchBarBlurHandler }
        autoComplete='off'
      />
      { RemoveSearchTermButton }
      <button
        className='button--search-bar-submit'
        onClick={ () => debouncedSearchProductHandler(searchTerm) }
        disabled={ trimInput(searchTerm).length < 3 || isSearching }
      >
        { CONSTANTS.SEARCH_BUTTON_LABEL }
      </button>
    </div>
  );
};

export default SearchBar;