// Products search bar and related logic
import { ChangeEvent, CSSProperties } from 'react'
import './SearchBar.css'
import useProducts from '../hooks/useProducts';
import { ProductItemType } from '../types/productsProviderTypes';
import { RemoveIcon, SearchIcon } from './SVGComponents';
import { useNavigate } from 'react-router-dom';

const CONSTANTS = {
  SEARCH: 'Search'
}

// COMPONENT
const SearchBar = () => {
  // ROUTE
  const navigate = useNavigate()
  
  // CONTEXTS
  const {dispatch, 
    REDUCER_ACTIONS_PRODUCT, 
    products, 
    filteredProducts, 
    searchTerm,
  } = useProducts();

  // HANDLERS
  const searchBarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_SEARCH_VALUE, 
      payload: {searchTerm: value}
    })
  }

  // HANDLER
  const SearchProductHandler = () => {
    // check if search term was provided
    const searchTermFormatted: string = searchTerm?.trim() || '';
    if (!searchTermFormatted?.length) {
      navigate('/search/empty');
      return;
    }  
    
    // find products where product name is matching the search term  
    let foundProducts: ProductItemType[] = [];
    foundProducts = products?.filter((product: ProductItemType) => {
      return product.name.toLowerCase().includes(searchTermFormatted?.toLowerCase())}) ?? []
      
    // checks: found / not found products
    if(foundProducts.length) {
      navigate(`/search/1`, {replace: true});
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: {filteredProducts: foundProducts}
      })
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_ACTIVE_PAGE,
        payload: {activePage: 1}
      })
    } else if(!foundProducts.length) {
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: {filteredProducts: []}
      })
      navigate('/search/no-result');
    }
  }

  // Remove search results empty search bar input field
  const RemoveSearchResultsHandler = () => {
    // empty input field
    dispatch({type: 'UPDATE_SEARCH_VALUE', payload: {searchTerm: ''} })
    if(filteredProducts?.length) {
      dispatch({type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS, payload: {filteredProducts: []}})
    }
    navigate('/all/1'); // navigate back to products
  }

  // STYLE
  const searchIconStyle: CSSProperties = {
    'width': 'auto', 
    'height': '100%',
    'position': 'absolute',
    'left': '0.5rem',
  }

  // ELEMENTS
  const RemoveSearchTermButton = (
    <button 
      className='button--search-bar-remove-term'
      onClick={RemoveSearchResultsHandler}
      disabled={!searchTerm?.length}
    >
       <RemoveIcon 
        width='20px' 
        height='20px' 
        fill='var(--color-1)'
        strokeWidth='0'
      />
    </button>
  )
    
  return (
    <div className="search-bar">
      <SearchIcon 
        width='20px' 
        height='20px' 
        stroke='var(--color-1)' 
        wrapperCustomStyle={searchIconStyle}
      />
      {RemoveSearchTermButton}
      <input 
        className="search-bar__input-field" 
        name='search-bar' 
        onChange={searchBarHandler}
        value={searchTerm}
      />
      <button 
        className='button--search-bar__submit'
        onClick={SearchProductHandler}
      > {CONSTANTS.SEARCH}
      </button>
    </div>
  )
}

export default SearchBar