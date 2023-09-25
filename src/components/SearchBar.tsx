// Products search bar and related logic
import { ChangeEvent, CSSProperties } from 'react'
import './SearchBar.css'
import useProducts from '../hooks/useProducts';
import { ProductItemType } from '../types/productsProviderTypes';
import { RemoveIcon, SearchIcon } from './SVGComponents';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  // ROUTE
  const navigate = useNavigate()

  // CONTEXTS
  const {dispatch, REDUCER_ACTIONS_PRODUCT, products, filteredProducts, searcheTerm } = useProducts();

  // HANDLERS
  const searchBarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_SEARCH_VALUE, 
      payload: {
        searcheTerm: value
      }
    })
  }

  // HANDLER
  const SearchProductHandler = () => {
    // check if search term was provided
    const searchTerm = searcheTerm?.trim() || '';
    if (!searchTerm?.length) {
      navigate('/products/search/empty');
      return;
    }  
    
    // find products where product name is matching the search term  
    let foundProducts: ProductItemType[] = [];
    foundProducts = products?.filter((product: ProductItemType) => {
      return product.name.toLowerCase().includes(searchTerm?.toLowerCase())}) ?? []

    // checks: found / not found products
    if(foundProducts.length) {
      console.log('ITEM FOUND', foundProducts)
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: {filteredProducts: foundProducts}
      })
      navigate('/products/search/result');
    } else if(!foundProducts.length) {
      console.log('NO SUCH PRODUCT')
      dispatch({
        type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS,
        payload: {filteredProducts: []}
      })
      navigate('/products/search/no-result');
    }
  }

  // Remove search results empty search bar input field
  const RemoveSearchResultsHandler = () => {
    // empty input field
    dispatch({type: 'UPDATE_SEARCH_VALUE', payload: {searcheTerm: ''} })
    if(filteredProducts?.length) {
      dispatch({type: REDUCER_ACTIONS_PRODUCT.UPDATE_FILTERED_PRODUCTS, payload: {filteredProducts: []}})
    }
    navigate('/products'); // navigate back to either products or cart (which one was the previous)
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
        value={searcheTerm}
      />
      <button 
        className='button--search-bar__submit'
        onClick={SearchProductHandler}
      > Search
      </button>
    </div>
  )
}

export default SearchBar