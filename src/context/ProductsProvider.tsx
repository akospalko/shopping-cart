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
import { ProductItemType, ProductStateType, ReducerAction, UseProductContextType, ChildrenType } from '../types/productsProviderTypes';
import { REDUCER_ACTION_TYPE_PRODUCT } from '../data/reducerActionTypeConstant';

// REDUCER
const reducer = (state: ProductStateType, action: ReducerAction): ProductStateType => {
  switch(action.type) {
    // UPDATE SEARCH VALUE
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_SEARCH_VALUE:
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_SEARCH_VALUE action')
      }
      return {...state, searchTerm: action.payload.searchTerm}
    // UPDATE PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_PRODUCTS: 
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_SEARCH_VALUE action')
      }
      return {...state, products: action.payload.products}
    // UPDATE FILTERED PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_FILTERED_PRODUCTS: 
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_FILTERED_PRODUCTS action')
      }
      return {...state, filteredProducts: action.payload.filteredProducts}
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_ACTIVE_PAGE:
      if(!action.payload) {
        throw new Error('action.payload missing in UPDATE_ACTIVE_PAGE action')
      }
      return {...state, activePage: action.payload.activePage}
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
  searchTerm: '',
  activePage: 1
}

export const useProductContext = (initProductState: ProductStateType) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initProductState)

  // MEMO
  const REDUCER_ACTIONS_PRODUCT = useMemo(()=> {
    return REDUCER_ACTION_TYPE_PRODUCT
  }, []) 

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductItemType[]> => {
      const data = await fetch('http://localhost:3500/products') // create a json-server (mockup data): npx json-server -w data/products.json -p 3500 
      .then(res => {
        return res.json()
      })
      .catch(err => {
        if(err instanceof Error) {
          console.log(err)
        }
      })
      return data
    }
    
    // fetch data, update state
    fetchProducts().then(products => {
      dispatch({
        type: REDUCER_ACTION_TYPE_PRODUCT.UPDATE_PRODUCTS, 
        payload: {products: products}
      })
    })
  }, [])

  return {
    dispatch, 
    REDUCER_ACTIONS_PRODUCT,  
    products: state.products, 
    filteredProducts: state.filteredProducts,
    searchTerm: state.searchTerm,
    activePage: state.activePage
  }
}

// Init state - static items
// const initState: ProductType[] = [
//   {
//     "sku": "item0001",
//     "name": "Widget",
//     "price": 9.99
//   },
//   {
//     "sku": "item0002",
//     "name": "Premium Widget",
//     "price": 19.99
//   },
//   {
//     "sku": "item0003",
//     "name": "Deluxe Widget",
//     "price": 29.99
//   }
// ]; 

// ----------CREATE CONTEXT----------
// State init
const initContextState: UseProductContextType = { 
  dispatch: () => {},
  REDUCER_ACTIONS_PRODUCT: REDUCER_ACTION_TYPE_PRODUCT,  
  products: [],
  filteredProducts: [],
  searchTerm: '',
  activePage: 1
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