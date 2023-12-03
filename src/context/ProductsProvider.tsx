/* NOTE:
The context fetches mockup data from fake server using json-server
- json-server set up:
  -- create folder with json data 
  -- run json-server: npx json-server -w data/products.json -p 3500
    -- -w - watch dir/file.ext - watch file for changes at specified path
    -- -p portNum - specify port for resource link      
  -- create fetch function, specify resource link (localhost at port xy)
*/

import { createContext, useEffect, useReducer, useMemo } from 'react';
import { ProductStateType, ReducerAction, UseProductContextType, ChildrenType } from '../types/productsProviderTypes';
import { REDUCER_ACTION_TYPE_PRODUCT } from '../data/reducerActionTypeConstant';
import { SORT_OPTION_VALUE } from '../utility/constants';
import { updateProductsWithAverageRating } from '../utility/calculateAvgRating';

// REDUCER
const reducer = (state: ProductStateType, action: ReducerAction): ProductStateType => {
  switch(action.type) {
    // UPDATE SEARCH VALUE
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_SEARCH_TERM:
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_SEARCH_TERM action')
      }
      return {...state, searchTerm: action.payload.searchTerm}
    // UPDATE PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_PRODUCTS: 
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_PRODUCTS action')
      }
      return {...state, products: action.payload.products}
    // UPDATE FILTERED PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_FILTERED_PRODUCTS: 
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_FILTERED_PRODUCTS action')
      }
      return {...state, filteredProducts: action.payload.filteredProducts}
    // UPDATE CATEGORY PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_CATEGORY_PRODUCTS: 
    if(!action.payload) {
      throw new Error('action.payload missing in UPDATE_CATEGORY_PRODUCTS action')
    }
    return {...state, categoryProducts: action.payload.categoryProducts}
    // UPDATE CATEGORY PRODUCTS FILTERED
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED: 
    if(!action.payload) {
      throw new Error('action.payload missing in UPDATE_CATEGORY_PRODUCTS_FILTERED action')
    }
    return {...state, categoryProductsFiltered: action.payload.categoryProductsFiltered}
    // UPDATE SEARCH STATUS
    case REDUCER_ACTION_TYPE_PRODUCT.SEARCH_STATUS:
      if(!action.payload) {
        throw new Error('action.payload missing in SEARCH_STATUS action')
      }
      return {...state, searchStatus: action.payload.searchStatus}
    // IS FILTERING PRODUCT
    case REDUCER_ACTION_TYPE_PRODUCT.IS_FILTERING_PRODUCT: 
    if(!action.payload) {
      throw new Error('action.payload missing in IS_FILTERING_PRODUCT action')
    }
    return {...state, isFilteringProduct: action.payload.isFilteringProduct}
    // UPDATE ACTIVE ORDER VALUE
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_SORT_VALUE: 
    if(!action.payload) {
      throw new Error('action.payload missing in UPDATE_SORT_VALUE action')
    }
    return {...state, activeSortOption: action.payload.activeSortOption}
    // DEFAULT
    default: {
      throw new Error('Unindentified reducer action type')
    }
  }
}

// ----------PRODUCT CONTEXT LOGIC----------
// Init state
const initProductState: ProductStateType = {
  products: [],
  filteredProducts: [],
  categoryProducts: [],
  categoryProductsFiltered: [],
  searchTerm: '',
  isFilteringProduct: false,
  searchStatus: '',
  activeSortOption: SORT_OPTION_VALUE.RATING,
}

export const useProductContext = (initProductState: ProductStateType) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initProductState);

  // MEMO
  const REDUCER_ACTIONS_PRODUCT = useMemo(()=> {
    return REDUCER_ACTION_TYPE_PRODUCT;
  }, []) 

  // EFFECTS
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const data = await fetch('http://localhost:3500/products')
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err);
          }
        });

      // Calculate average rating and update products
      const productsWithAverageRating = updateProductsWithAverageRating(data);
      console.log(productsWithAverageRating) 
      // Dispatch the updated products to the state
      dispatch({
        type: REDUCER_ACTION_TYPE_PRODUCT.UPDATE_PRODUCTS,
        payload: { products: productsWithAverageRating },
      });
    };

    // fetch data, update state
    fetchProducts();
  }, []);

  return {
    dispatch, 
    REDUCER_ACTIONS_PRODUCT,  
    products: state.products, 
    filteredProducts: state.filteredProducts,
    categoryProducts: state.categoryProducts,
    categoryProductsFiltered: state.categoryProductsFiltered,
    searchTerm: state.searchTerm,
    isFilteringProduct: state.isFilteringProduct,
    searchStatus: state.searchStatus,
    activeSortOption: state.activeSortOption
  }
}

// ----------CREATE CONTEXT----------
// State init
const initContextState: UseProductContextType = { 
  dispatch: () => {},
  REDUCER_ACTIONS_PRODUCT: REDUCER_ACTION_TYPE_PRODUCT,  
  products: [],
  filteredProducts: [],
  categoryProducts: [],
  categoryProductsFiltered: [],
  searchTerm: '',
  searchStatus: '',
  isFilteringProduct: false,
  activeSortOption: SORT_OPTION_VALUE.RATING
}

// Create context
const ProductsContext = createContext<UseProductContextType>(initContextState);
// ----------CREATE PROVIDER----------
export const ProductsProvider = ({children}: ChildrenType) => {

 return(
    <ProductsContext.Provider value={useProductContext(initProductState)}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext