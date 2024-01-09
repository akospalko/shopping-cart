// Create, store and retrieve (using session storage) active filter options;
// Update filter options state
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductItemType } from "../types/productsProviderTypes";
import { 
  FilterOptionsType, 
  FilterOptionsSessionStorageType, 
  ActiveFilterOptionsStoredType 
} from "../types/ProductFilterTypes";
import useProductFilterOptions from "./useCreateProductFilterOptions";
import useFilter from "./useFilter";

const useStoreAndRetrieveProductFilters = (activeCategoryProducts: ProductItemType[] = []) => {
  // ROUTE
  const { category } = useParams();

  // CONTEXT
  const { dispatch, REDUCER_ACTIONS_FILTER } = useFilter();

  // HOOK
  const { createProductFilterOptions, restoreFilterOptions } = useProductFilterOptions();

  // HANDLER
  // Update filter options
  const updateFilterOptions = useCallback((updatedValue: FilterOptionsType): void => {
    dispatch({
      type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
      payload: { filterOptions: updatedValue }
    });
  }, [REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, dispatch])

  // EFFECT
  useEffect(() => {
    if(!activeCategoryProducts.length) return;
    const calculatedFilterOptions: FilterOptionsType = createProductFilterOptions(activeCategoryProducts);
    const getSessionStorageFilterOptions: string | null = sessionStorage.getItem("filterOptions");
    const sessionStorageFilterOptions: FilterOptionsSessionStorageType | null = getSessionStorageFilterOptions
      ? JSON.parse(getSessionStorageFilterOptions)
      : null;
    
    if(sessionStorageFilterOptions) {
      if(category !== sessionStorageFilterOptions[0]) {
        sessionStorage.removeItem("filterOptions")
      }
      const retrievedFilterOptions: ActiveFilterOptionsStoredType = sessionStorageFilterOptions[1];       
      const checkedInFilterOptions = restoreFilterOptions(calculatedFilterOptions, retrievedFilterOptions);
      updateFilterOptions(checkedInFilterOptions);
    } else {
      updateFilterOptions(calculatedFilterOptions);
    }
  }, [activeCategoryProducts, category, createProductFilterOptions, restoreFilterOptions, updateFilterOptions]);
}

export default useStoreAndRetrieveProductFilters; 