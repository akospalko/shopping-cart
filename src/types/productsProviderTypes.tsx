import { ReactElement } from "react"
import { useProductContext } from "../context/ProductsProvider"

export type ProductItemType = {
  sku: string,
  name: string,
  price: number
}

// ----------REDUCER----------
export type ReducerAction = {
  type: string,
  payload?: ProductStateType
}

// ----------PRODUCT CONTEXT LOGIC----------
export type ProductStateType = {
  products?: ProductItemType[],
  filteredProducts?: ProductItemType[],
  searchedProduct?: string,
  isSearching?: boolean // // tracks state btwn search btn pressed / remove srch results btn 
}

// ----------CREATE CONTEXT----------
export type UseProductContextType = ReturnType<typeof useProductContext>


// ----------CREATE PROVIDER----------
export type ChildrenType = {children?: ReactElement | ReactElement[]}