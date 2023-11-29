// Handle resetting filtered products to default empty value ([]): 1. btw menu categories navigation, 2. clearing product filters
import useProducts from './useProducts';
import { debounce } from 'lodash';

const useClearFilteredProducts = () => {
  const { categoryProductsFiltered, REDUCER_ACTIONS_PRODUCT, dispatch } = useProducts();

  // Clear filtered products to default state: []
  const debouncedClearFilteredProductsHandler = debounce((): void => {
    if( categoryProductsFiltered === undefined || !categoryProductsFiltered.length ) return;
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED, payload: { categoryProductsFiltered: [] } });
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.IS_FILTERING_PRODUCT, payload: { isFilteringProduct: false } });
  }, 300)

  return debouncedClearFilteredProductsHandler;
};

export default useClearFilteredProducts;