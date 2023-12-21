// Logic to create product filter options for rendering product filter 
import { useCallback } from "react";
import { ProductItemType, ProductMergedPropertiesType } from "../types/productsProviderTypes";
import { RangeFilterMinMaxType, DefaultFilterOptionType, RangeFilterOptionType, FilterOptionsType, FilterGroupType } from "../types/ProductFilterTypes";
import { GroupKeysType } from "../types/productsProviderTypes";
import { useParams } from "react-router-dom";
import { FILTER_GROUP_PROPERTIES } from "../data/filterGroupPropertyInitializer";
import { PRODUCT_CATEGORY } from "../utility/constants";

// Function to generate filter options data structure
const useProductFilterOptions = () => {
  // ROUTE
  const { category } = useParams();

  // UTILITIES
  // Get active catgory"s filter groups
  const getActiveFilterGroupProperties = useCallback((category: string | undefined) => {
    let activeGroupInitializer: FilterGroupType[] = [];
    if(!category) return activeGroupInitializer;

    switch(category) {
    case PRODUCT_CATEGORY.PROCESSOR:
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.processor];
      break;
    case PRODUCT_CATEGORY.VIDEO_CARD:
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.videoCard];
      break;
    case PRODUCT_CATEGORY.RAM:
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.ram];
      break;
    case PRODUCT_CATEGORY.MOBILE:
      activeGroupInitializer = [...FILTER_GROUP_PROPERTIES.mobile];
      break;
    case PRODUCT_CATEGORY.ALL:
      activeGroupInitializer = [];
      break;
    default:
      activeGroupInitializer = [];
    }
    return activeGroupInitializer;
  }, [])

  // Function to sort filters by range
  const sortFilterOptionsByRange = (filterOptions: FilterOptionsType) => {
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
const handleNewFilter = (
  groupFilters: DefaultFilterOptionType[], 
  propertyValue: string) => {
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
 
// Function to generate filter options data structure
const createProductFilterOptions = useCallback(( products: ProductItemType[]) => { 
  const filterOptions: FilterOptionsType = {} as FilterOptionsType;
  const activeFilterGroupProperties: FilterGroupType[] = getActiveFilterGroupProperties(category);
  
  // iterate through products // alternative: use a premade option filter data structure
  products.forEach((product) => {
    // iterate through each active filter group property
    activeFilterGroupProperties.forEach((property) => {
      const { group, range } = property;
        // get the property value from the current product
        const propertyValue = product.properties && group in product.properties
        ? product.properties[group as keyof ProductMergedPropertiesType]
        : undefined;
      
      // if the filter group doesn"t exist, create an empty array for it
      if (!filterOptions[group]) {
        filterOptions[group] = [];
      }

      // check if there"s an existing filter with the same value
      const existingFilter = filterOptions[group].find(
        (filter) => filter.filter === propertyValue
      );

        // if there"s an existing filter, increment its count and skip to the next iteration
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
          
          // check if there"s an existing range filter with the same identifier
          if (
            propertyValue !== undefined &&
            propertyValue >= minValue &&
            (!maxValue || propertyValue <= maxValue)
          ) {
              // check if there"s an existing range filter with the same identifier
              const existingRangeFilter = filterOptions[group]?.find((filter) => {
              if ("range" in filter) {
                // TypeScript now knows that "filter" has a "range" property
                return filter.range === rangeIdentifier;
              }
              return false;
            });

            // if there"s an existing range filter, increment its count
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
        // if there"s no range, create a new filter using the handleNewFilter function
        if (propertyValue !== undefined) {
          handleNewFilter(defaultFiltersArray, String(propertyValue));
        }
      }
    });
  });

  // sort the filter options by range using the sortFilterOptionsByRange function
  return sortFilterOptionsByRange(filterOptions);
  }, [category, getActiveFilterGroupProperties]);

  return createProductFilterOptions;
};

export default useProductFilterOptions;