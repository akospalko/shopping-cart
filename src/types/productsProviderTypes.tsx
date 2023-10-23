import { ReactElement } from "react"
import { useProductContext } from "../context/ProductsProvider"

// TYPE
// Product item properties type based on different category
export type ProductProcessorPropertyType = {
  ['brand']: string,
  ['model']: string,
  ['architecture']: string,
  ['cores']: string | number,
  ['threads']: string,
  ['clock speed']: string,
  ['cache']: string,
  ['socket']: string,
  ['integrated graphics']: string,
  ['hyper-threading']: string,
  ['dimensions']: string,
  ['compatibility']: string,
  ['tdp (thermal design power)']: string
}

export type ProductRamPropertyType = {
  ['type']: string,
  ['capacity']: string,
  ['speed']: string,
  ['cas latency']: string,
  ['voltage']: string,
  ['form factor']: string,
  ['ecc support']: string,
  ['heat spreader']: string,
  ['number of modules']: string,
  ['compatibility']: "test"
}

export type ProductVideoCardPropertyType = {
  ['brand']: string,
  ['model']: string,
  ['gpu architecture']: string,
  ['vram']: string,
  ['processing units']: string,
  ['clock speed']: string,
  ['memory bus']: string,
  ['memory speed']: string,
  ['memory bandwidth']: string,
  ['video output ports']: string,
  ['ray tracing support']: string,
  ['tdp (thermal design power)']: string
}

export type ProductMobilePropertyType = {
  ['brand']: string,
  ['model']: string,
  ['operating system']: string,
  ['processor']: string,
  ['ram']: string,
  ['storage']: string,
  ['display size']: string,
  ['display resolution']: string,
  ['camera']: string,
  ['battery capacity']: string
}

// Product type
export type ProductItemType = {
  sku: string,
  name: string,
  price: number,
  priceDiscount: 0,
  category: string
  stock: number,
  description: '',
  warranty: '',
  retailer: '',
  properties: ProductProcessorPropertyType | ProductRamPropertyType | 
  ProductVideoCardPropertyType | 
  ProductMobilePropertyType | ProductItemType | undefined
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
  searchTerm?: string,
  activePage?: number,
}

// ----------CREATE CONTEXT----------
export type UseProductContextType = ReturnType<typeof useProductContext>

// ----------CREATE PROVIDER----------
export type ChildrenType = {children?: ReactElement | ReactElement[]}