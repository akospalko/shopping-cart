// Handle product filtering and clearing/resetting filtered products ([])
import useFilter from "./useFilter";
import useProducts from "./useProducts";
import { debounce } from "lodash";
import { ProductItemType } from "../types/productsProviderTypes";
import { useNavigate, useParams } from "react-router-dom";
import { FilterOptionsType } from "../types/ProductFilterTypes";
import { GroupKeysType } from "../types/productsProviderTypes";
import { MODAL_TOGGLE_KEY } from "../utility/constants";
import { ProductMergedPropertiesType } from "../types/productsProviderTypes";
import useNavigationMenu from "./useNavigationMenu";
import textData from "../data/textData.json";

const useProductsFilterHandler = () => {
  // ROUTE
  const navigate = useNavigate();
  const { category } = useParams();

  // CONTEXT
  const { 
    REDUCER_ACTIONS_PRODUCT, 
    dispatch: dispatchProduct 
  } = useProducts();

  const { toggleModal } = useNavigationMenu();

  const { 
    priceFilterSlider, 
    priceFilterRange, 
    filterOptions, 
    setPriceFilterSlider,
    REDUCER_ACTIONS_FILTER, 
    dispatch: dispatchFilter 
  } = useFilter();

  // UTILITY
  // Filter by price 
  const isSliderWithinRange = (minPrice: number, maxPrice: number): boolean => {
    if(!minPrice || !maxPrice || !priceFilterRange[0] || !priceFilterRange[1]) return false;
    return minPrice >= priceFilterRange[0] && maxPrice <= priceFilterRange[1]; 
  }

  // Filter by properties
    // extract active filter options 
    const getActiveFilterOptions = (filterOptions: FilterOptionsType) => {
      return Object.keys(filterOptions).flatMap((group) => (
        filterOptions[group as GroupKeysType]
        .filter((filter) => filter.isChecked)
        .map((filter) => ({ ...filter, group }))
      ));
    }

  // FILTER PRODUCTS
  // By price
  const filterProductsByPrice = (
    products: ProductItemType[] | undefined,
    min: number,
    max: number
  ): ProductItemType[] => {
    // Check price range validity
    if(!isSliderWithinRange(min, max)) {
      throw new Error(textData["slider-values-are-out-of-range"]);
    }
    // Check products availability
    if (!products || !products.length) {
      return [];
    }
    return products.filter((product: ProductItemType) => {
      const activePrice = product.priceDiscount ?? product.price; // use discount price if available
      return activePrice >= min && activePrice <= max;
    });
  };

  // By properties
  // Function to filter products based on active filter options
  const filterByProperty = (products: ProductItemType[]): ProductItemType[] | [] => {
    const activeFilterOptions = getActiveFilterOptions(filterOptions ?? {} as FilterOptionsType);
    // no active property filters
    if(!activeFilterOptions.length) {
      return products;
    }
   
    return products.filter((product: ProductItemType) => {
      const properties: ProductMergedPropertiesType = product.properties;

      // Check if any filter value is found among the product properties for each group
      return activeFilterOptions.some((filter) => {
        const filterValue = filter.filter;

        if (typeof filter.group === "string" && filter.group in properties) {
          // Type guard to ensure that filter.group is a valid property of properties
          const filterGroup = properties[filter.group as keyof ProductMergedPropertiesType];
          if (filterGroup === filterValue) {
            return true; // If filterValue is found in the specified group, return true
          }
        } 
        if ("minMaxRange" in filter) {
          // If minMaxRange is available, check if the property value falls within the range
          const propertyValue = properties[filter.group as keyof ProductMergedPropertiesType];
        
          if (
            propertyValue !== undefined &&
            filter.minMaxRange[1] !== undefined && // Check if minMaxRange[1] is not undefined
            propertyValue >= filter.minMaxRange[0] &&
            propertyValue <= filter.minMaxRange[1]
          ) {
            return true;
          }
        }
        return false;
      });
    });
  }

  // reset filter options
  const resetFilterCheckedState = (filterOptions: FilterOptionsType) => {
    // create copy
    const updatedFilterOptions: FilterOptionsType = JSON.parse(JSON.stringify(filterOptions));
    // loop through filter options 
    for(const key in updatedFilterOptions ) {
      for(const option of updatedFilterOptions[key as GroupKeysType]) {
        // reset all isChecked values to false
        option.isChecked = false;
      }
    }
    return updatedFilterOptions;
  }

  // HANDLERS
  // Filter products 
  const debouncedFilterProductsHandler = debounce((activeCategoryProducts) => {
    dispatchFilter({ type: REDUCER_ACTIONS_FILTER.IS_FILTERING_PRODUCT, payload: { isFilteringProduct: true } });
    // filter by price
    const filteredByPrice = filterProductsByPrice(activeCategoryProducts, priceFilterSlider[0], priceFilterSlider[1])
    // filter by properties
    const filteredProducts = filterByProperty(filteredByPrice);
    // update state with filtered products
    dispatchProduct({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED, payload: { categoryProductsFiltered: filteredProducts } });
    // close filter modal 
    toggleModal(MODAL_TOGGLE_KEY.FILTER_MENU, true);
    // nav to route with
    navigate(`/${ category }/1`);
  }, 300); 

  // Clear products - to default state: []
  const debouncedClearFilteredProductsHandler = debounce((): void => {
    dispatchProduct({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED, payload: { categoryProductsFiltered: [] } });
    dispatchFilter({ type: REDUCER_ACTIONS_FILTER.IS_FILTERING_PRODUCT, payload: { isFilteringProduct: false } });
    if(filterOptions) {
      dispatchFilter({ type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, payload: { filterOptions: resetFilterCheckedState(filterOptions) } });
    }
    // Clear filter options from session storage
    sessionStorage.removeItem("filterOptions");
    setPriceFilterSlider([priceFilterRange[0], priceFilterRange[1]]);
  }, 300)

  return { debouncedFilterProductsHandler, debouncedClearFilteredProductsHandler };
};

export default useProductsFilterHandler;