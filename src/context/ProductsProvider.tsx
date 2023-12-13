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
import { updateProductsWithAverageRating } from '../utility/calculateAvgRating';
import textData from '../data/textData.json';

// REDUCER
const reducer = (state: ProductStateType, action: ReducerAction): ProductStateType => {
  switch(action.type) {
    // UPDATE PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_PRODUCTS: 
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-products"])
      }
      return { ...state, products: action.payload.products }
    // UPDATE FILTERED PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_FILTERED_PRODUCTS: 
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-products"])
      }
      return {...state, filteredProducts: action.payload.filteredProducts}
    // UPDATE CATEGORY PRODUCTS
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_CATEGORY_PRODUCTS: 
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-products"])
      }
      return {...state, categoryProducts: action.payload.categoryProducts}
    // UPDATE CATEGORY PRODUCTS FILTERED
    case REDUCER_ACTION_TYPE_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED: 
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-products"])
      }
      return {...state, categoryProductsFiltered: action.payload.categoryProductsFiltered}
    // DEFAULT
    default: {
      throw new Error(textData["error-unidentified-reducer-action-type"])
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
}

// Create context
const ProductsContext = createContext<UseProductContextType>(initContextState);
// ----------CREATE PROVIDER----------
export const ProductsProvider = ({ children }: ChildrenType) => {

 return(
    <ProductsContext.Provider value={ useProductContext(initProductState) }>
      { children }
    </ProductsContext.Provider>
  )
}

export default ProductsContext;