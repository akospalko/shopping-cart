// Product filter ui and logic; Filter by property and/or price
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import useProducts from "../../hooks/useProducts";
import { ProductItemType } from "../../types/productsProviderTypes";
import DividerLine from "../UI/DividerLine";
import textData from "../../data/textData.json";
import PropertyFilter from "./PropertyFilter";
import useFilter from "../../hooks/useFilter";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import { ProductMergedPropertiesType } from "../../types/productsProviderTypes";
import { 
  FilterGroupType,
  DefaultFilterOptionType, 
  RangeFilterOptionType, 
  FilterOptionsType,
  RangeFilterMinMaxType
} from "../../types/ProductFilterTypes";
import { GroupKeysType } from "../../types/productsProviderTypes";
import { FILTER_GROUP_PROPERTIES } from "../../data/filterGroupPropertyInitializer";
import "./ProductFilters.css";


const ProductFilters = () => {
  // ROUTE
  const { category } = useParams();

  // CONTEXTS
  const { categoryProducts, categoryProductsFiltered } = useProducts();
  const { dispatch, REDUCER_ACTIONS_FILTER } = useFilter();

  // VALUE
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  // HOOK
  const { debouncedFilterProductsHandler, debouncedClearFilteredProductsHandler } = useProductsFilterHandler();
  
  // UTILITY
  // Function to sort filters by range
  const sortFiltersByRange = (filterOptions: FilterOptionsType) => {
    // function to extract numeric values from the range string
    const extractNumericValues = (range: string) => {
      if (!range) return [0, 0];
      return range.split("-").map(parseFloat);
    };
  
    // iterate through filter options
    Object.entries(filterOptions).forEach(([key, filters]) => {
      if (Array.isArray(filters)) {
        // Type assertion for filters
        const rangeFilters = filters as RangeFilterOptionType[];
    
        filterOptions[key as GroupKeysType] = rangeFilters.sort(
          (a: RangeFilterOptionType, b: RangeFilterOptionType) => {
            // only sort if it is a range filter option (with minMaxRange values)
            if (!a.minMaxRange || !b.minMaxRange) return 0; 
    
            const rangeA = a.range;
            const rangeB = b.range;
            const [minValueA, maxValueA] = extractNumericValues(rangeA);
            const [minValueB, maxValueB] = extractNumericValues(rangeB);
    
            // sort by the numeric values
            return minValueA - minValueB || (maxValueA || 0) - (maxValueB || 0);
          }
        );
      }
    });
    
    return filterOptions; 
  };

  // create new filter option
  function handleNewFilter(
    groupFilters: DefaultFilterOptionType[], 
    propertyValue: string) {
    groupFilters.push({
      filter: String(propertyValue),
      count: 1,
      isChecked: false,
    });
  }
  
  // create new range filter option
  function handleNewRangeFilter(
    groupFilters: RangeFilterOptionType[],
    propertyValue: number,
    rangeIdentifier: string,
    displayedFilterName: string,
    minMaxRange: RangeFilterMinMaxType
  ) {
    const addedRanges = new Set();
    if (!addedRanges.has(rangeIdentifier)) {

      groupFilters.push({
        filter: propertyValue,
        displayedFilterName,
        count: 1,
        isChecked: false,
        range: rangeIdentifier,
        minMaxRange,
      });
      addedRanges.add(rangeIdentifier);
    }
  }

  // get active catgory's filter groups
  const getActiveFilterGroupProperties = useCallback((category: string | undefined) => {
    let activeGroupInitializer: FilterGroupType[] = [];
    if(!category) return activeGroupInitializer;

    switch(category) {
    case 'processor':
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.processor];
      break;
    case 'videocard':
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.videoCard];
      break;
    case 'ram':
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.ram];
      break;
    case 'mobile':
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.mobile];
      break;
    case 'all':
      activeGroupInitializer = [];
      break;
    default:
      throw new Error('Category is undefined or unknown!')
    }
    return activeGroupInitializer;
  }, [])

  // Function to generate filter options data structure
  const createFilterOptions = useCallback(
    (
      activeFilterGroupProperties: FilterGroupType[], 
      products: ProductItemType[]
    ) => { 
    const filterOptions: FilterOptionsType = {} as FilterOptionsType;
    
    // iterate through products // alternative: use a premade option filter data structure
    products.forEach((product) => {
      // iterate through each active filter group property
      activeFilterGroupProperties.forEach((property) => {
        const { group, range } = property;
         // get the property value from the current product
         const propertyValue = product.properties && group in product.properties
          ? product.properties[group as keyof ProductMergedPropertiesType]
          : undefined;
       
        // if the filter group doesn't exist, create an empty array for it
        if (!filterOptions[group]) {
          filterOptions[group] = [];
        }
  
        // check if there's an existing filter with the same value
        const existingFilter = filterOptions[group].find(
          (filter) => filter.filter === propertyValue
        );
  
         // if there's an existing filter, increment its count and skip to the next iteration
        if (existingFilter) {
          existingFilter.count++;
          return;
        }
  
        // check if the property has a range
        if (range && range.ranges && range.ranges.length > 0) {
          // loop through each range in the property
          range.ranges.forEach(([ minValue, maxValue ]) => {
            // create a unique identifier for the range
            const rangeIdentifier = `${ minValue }-${ maxValue || "" }${ range.unit }`;
            
            // check if there's an existing range filter with the same identifier
            if (
              propertyValue !== undefined &&
              propertyValue >= minValue &&
              (!maxValue || propertyValue <= maxValue)
            ) {
               // check if there's an existing range filter with the same identifier
               const existingRangeFilter = filterOptions[group]?.find((filter) => {
                if ('range' in filter) {
                  // TypeScript now knows that 'filter' has a 'range' property
                  return filter.range === rangeIdentifier;
                }
                return false;
              });
  
              // if there's an existing range filter, increment its count
              // otherwise, create a new range filter using the handleNewRangeFilter function
              if (existingRangeFilter) {
                existingRangeFilter.count++;
              } else {

                const rangeFiltersArray = filterOptions[group] as RangeFilterOptionType[];  
                handleNewRangeFilter(
                  rangeFiltersArray,
                  propertyValue,
                  rangeIdentifier,
                  !maxValue
                    ? `${ minValue } ${ range.unit } >`
                    : `${ minValue } - ${ maxValue } ${ range.unit }`,
                  [minValue, maxValue] as RangeFilterMinMaxType
                );
              }
            }
          });
        } else {
          const defaultFiltersArray = filterOptions[group] as DefaultFilterOptionType[];  
          // if there's no range, create a new filter using the handleNewFilter function
          if (propertyValue !== undefined) {
            handleNewFilter(defaultFiltersArray, String(propertyValue));
          }
        }
      });
    });

      // sort the filter options by range using the sortFiltersByRange function
      const sortedFilterOptions = sortFiltersByRange(filterOptions);
      
      // return the sorted filter options
      return sortedFilterOptions;

    }, []);

  // EFFECT
  useEffect(() => {
    const activeFilterGroupProperties: FilterGroupType[] = getActiveFilterGroupProperties(category);
    const filterOptions: FilterOptionsType = createFilterOptions(activeFilterGroupProperties, activeCategoryProducts);
    
    dispatch({ type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, payload: { filterOptions: filterOptions } })

  }, [REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, activeCategoryProducts, category, createFilterOptions, dispatch, getActiveFilterGroupProperties]);

  // JSX
  const productFilterButtons = (
    <div className="product-filter__buttons">
      <button 
        className="button--product-filter"
        onClick={ debouncedClearFilteredProductsHandler }
        disabled={ categoryProductsFiltered === undefined || !categoryProductsFiltered.length }  
      >  { textData["reset-filters"] }
      </button>
      <button 
        className="button--product-filter"
        onClick={ () => debouncedFilterProductsHandler(activeCategoryProducts) }
      >  { textData["filter"] }
      </button>
    </div>
  )

  return (
    <div className="product-filter">
      <h2 className="product-sidemenu-category__header--2">{ textData["filter"] }</h2>
      { productFilterButtons }
      <DividerLine/>
      <PriceFilter categoryProducts={ activeCategoryProducts } />
      <h3 className="product-sidemenu__subtitle"> { textData["property"] } </h3>
      <PropertyFilter />
      <DividerLine/>
    </div>
  )
}

export default ProductFilters; 