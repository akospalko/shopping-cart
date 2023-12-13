// TODO: HANDLE TEXT MSG: ERROR 
// TODO: Transfer product provider filter/search logic to this provider
import { createContext, useReducer, useMemo, useState } from "react";
import { FilterStateType } from "../types/filterProviderTypes";
import { ReducerAction, UseFilterContextType, ChildrenType } from "../types/filterProviderTypes";
import { REDUCER_ACTION_TYPE_FILTER } from "../data/reducerActionTypeConstant";
import { priceFilterStateInitializer } from "../utility/constants";
import { PriceRangeAndValueType } from "../types/ProductFilterTypes";
import { FilterOptionsType } from "../types/ProductFilterTypes";
import { SORT_OPTION_VALUE } from '../utility/constants';
import textData from "../data/textData.json";

// REDUCER
const reducer = (state: FilterStateType, action: ReducerAction): FilterStateType => {
  switch(action.type) {
    // UPDATE PROPERTY FILTER VALUE
    case REDUCER_ACTION_TYPE_FILTER.UPDATE_FILTER_OPTIONS: 
    if(!action.payload) {
      throw new Error(textData["error-action-payload-missing-for-type-filter"])
    }
    return { ...state, filterOptions: action.payload.filterOptions }
    // IS FILTERING PRODUCT
    case REDUCER_ACTION_TYPE_FILTER.IS_FILTERING_PRODUCT: 
    if(!action.payload) {
      throw new Error(textData["error-action-payload-missing-for-type-filter"])
    }
    return { ...state, isFilteringProduct: action.payload.isFilteringProduct }
    // UPDATE ACTIVE SORT OPTION VALUE
    case REDUCER_ACTION_TYPE_FILTER.UPDATE_SORT_VALUE: 
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-filter"])
      }
      return { ...state, activeSortOption: action.payload.activeSortOption }
    // UPDATE SEARCH VALUE
    case REDUCER_ACTION_TYPE_FILTER.UPDATE_SEARCH_TERM:
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-filter"])
      }
      return { ...state, searchTerm: action.payload.searchTerm }
    // UPDATE SEARCH STATUS
    case REDUCER_ACTION_TYPE_FILTER.SEARCH_STATUS:
      if(!action.payload) {
        throw new Error(textData["error-action-payload-missing-for-type-filter"])
      }
      return { ...state, searchStatus: action.payload.searchStatus }
    // DEFAULT
    default: {
      throw new Error(textData["error-unidentified-reducer-action-type"]);
    }
  }
}

// ----------FILTER CONTEXT LOGIC----------
// Init state
const initFilterReducerState: FilterStateType = {
  filterOptions: {} as FilterOptionsType,
  isFilteringProduct: false,
  activeSortOption: SORT_OPTION_VALUE.RATING,
  searchTerm: '',
  searchStatus: '',
}

export const useFilterContext = (initFilterReducerState: FilterStateType) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initFilterReducerState);

  // STATES
  // useState is only used for react-slider package (it cannot be updated via reducer dispatch actions)   
  const [priceFilterSlider, setPriceFilterSlider] = useState<PriceRangeAndValueType>([priceFilterStateInitializer.min, priceFilterStateInitializer.max]);
  const [priceFilterRange, setPriceFilterRange] = useState<PriceRangeAndValueType>([priceFilterStateInitializer.min, priceFilterStateInitializer.max]);

  // MEMO
  const REDUCER_ACTIONS_FILTER = useMemo(()=> {
    return REDUCER_ACTION_TYPE_FILTER;
  }, []) 

  return {
    dispatch, 
    REDUCER_ACTIONS_FILTER,  
    filterOptions: state.filterOptions,
    isFilteringProduct: state.isFilteringProduct,
    searchTerm: state.searchTerm,
    searchStatus: state.searchStatus,
    priceFilterSlider, setPriceFilterSlider, 
    priceFilterRange, setPriceFilterRange,
    activeSortOption: state.activeSortOption
  }
}

// ----------CREATE CONTEXT----------
// State init
const initContextState: UseFilterContextType = { 
  dispatch: () => {},
  REDUCER_ACTIONS_FILTER: REDUCER_ACTION_TYPE_FILTER,  
  filterOptions: {} as FilterOptionsType,
  isFilteringProduct: false,
  searchTerm: '',
  searchStatus: '',
  activeSortOption: SORT_OPTION_VALUE.RATING,
  priceFilterSlider: [priceFilterStateInitializer.min, priceFilterStateInitializer.max], 
  setPriceFilterSlider: () => {}, 
  priceFilterRange: [priceFilterStateInitializer.min, priceFilterStateInitializer.max], 
  setPriceFilterRange: () => {},
}

// Create context
const FilterContext = createContext<UseFilterContextType>(initContextState);
// ----------CREATE PROVIDER----------
export const FilterProvider = ({ children }: ChildrenType) => {

 return(
    <FilterContext.Provider value={ useFilterContext(initFilterReducerState) }>
      { children }
    </FilterContext.Provider>
  )
}

export default FilterContext;