import { ReactElement } from "react"

export type ProductItemType = {
  sku: string,
  name: string,
  price: number
}

export type ProductStateType = {
  products?: ProductItemType[],
  searchedProduct?: string
}

export type ReducerAction = {
  type: string,
  payload?: ProductStateType
}

// SET UP CONTEXT PROVIDER
// type for provider children 
export type ChildrenType = {children?: ReactElement | ReactElement[]}