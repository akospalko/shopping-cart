import { ReactElement } from 'react';
import { useFilterContext } from "../context/FilterProvider";
import { FilterOptionsType } from './ProductFilterTypes';
import { SORT_OPTION_VALUE } from "../utility/constants";

// ----------FILTER CONTEXT LOGIC----------
export type FilterStateType = {
  filterOptions?: FilterOptionsType,
  isFilteringProduct?: boolean,
  activeSortOption?: SORT_OPTION_VALUE,
  searchTerm?: string,
  searchStatus?: string,
}

// ----------REDUCER----------
export type ReducerAction = {
  type: string,
  payload?: FilterStateType,
}

// ----------CREATE CONTEXT----------
export type UseFilterContextType = ReturnType<typeof useFilterContext>

// ----------CREATE PROVIDER----------
export type ChildrenType = { children?: ReactElement | ReactElement[] }