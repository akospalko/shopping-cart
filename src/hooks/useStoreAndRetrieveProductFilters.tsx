// TODO: HANDLE ACTIVE CATEGORY REUDNDANCY
// store and retrieve (session storage) active filter options -> update filter options
import { useEffect, useMemo } from "react";
import { ProductItemType } from "../types/productsProviderTypes";
import useProductFilterOptions from "./useCreateProductFilterOptions";
import useFilter from "./useFilter";
import useProducts from "./useProducts";

const useStoreAndRetrieveProductFilters = () => {
  // CONTEXTS
  const { categoryProducts } = useProducts();
  const { dispatch, REDUCER_ACTIONS_FILTER } = useFilter();

  // MEMO
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  // HOOKS
  const createProductFilterOptions = useProductFilterOptions();

  // EFFECT
  useEffect(() => {
    // get and store filterOptionsfrom session storage
    const getFilterOptions = sessionStorage.getItem("filterOptions");
    const storedFilterOptions = getFilterOptions ? JSON.parse(getFilterOptions) : null;
    // check available storage filter options, update reducer state
    if (storedFilterOptions && Object.keys(storedFilterOptions).length) {
      dispatch({
        type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
        payload: { filterOptions: storedFilterOptions },
      });
    } else {
      // if not available, calculate filter options: store in session storage and update reducer state 
      const calculatedFilterOptions = createProductFilterOptions(activeCategoryProducts);
      dispatch({
        type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
        payload: { filterOptions: calculatedFilterOptions },
      });
      // store filterOptions in session storage
      sessionStorage.setItem("filterOptions", JSON.stringify(calculatedFilterOptions));
    }
  }, [REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, activeCategoryProducts, createProductFilterOptions, dispatch]);
}

export default useStoreAndRetrieveProductFilters; 