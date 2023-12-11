import { ReactElement } from 'react';
import { useFilterContext } from "../context/FilterProvider";
import { FilterOptionsType } from '../data/filterGroupPropertyInitializer';

// ----------FILTER CONTEXT LOGIC----------
export type FilterStateType = {
  filterOptions?: FilterOptionsType,
}

// ----------REDUCER----------
export type ReducerAction = {
  type: string,
  payload?: FilterStateType
}

// ----------CREATE CONTEXT----------
export type UseFilterContextType = ReturnType<typeof useFilterContext>

// ----------CREATE PROVIDER----------
export type ChildrenType = { children?: ReactElement | ReactElement[] }