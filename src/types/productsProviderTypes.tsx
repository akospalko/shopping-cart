import { ReactElement } from "react";
import { useProductContext } from "../context/ProductsProvider";
import { SORT_OPTION_VALUE } from "../utility/constants";

// TYPES
// Product item properties type based on different category
export type ProductProcessorPropertyType = {
  ['brand']: string,
  ['model']: string,
  ['architecture']: string,
  ['cores']: string,
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

// product property review type
export type ProductReviewPropertyType = {
  ["userID"]: string, 
  ["username"]: string, 
  ["rating"]: number, 
  ["review"]: string
} 

// Product property type
export type ProductMergedPropertiesType = ProductProcessorPropertyType | ProductRamPropertyType | 
ProductVideoCardPropertyType | 
ProductMobilePropertyType;

// Product property type string literal keys
// define the mapped type to extract string keys
export type ExtractStringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
};

// use the mapped type to extract string keys from each property type
export type VideoCardKeys = ExtractStringKeys<ProductVideoCardPropertyType>;
export type MobileKeys = ExtractStringKeys<ProductMobilePropertyType>;
export type ProcessorKeys = ExtractStringKeys<ProductProcessorPropertyType>;
export type RamKeys = ExtractStringKeys<ProductRamPropertyType>;

// combine all extracted keys into a union
export type GroupKeysType =
  | VideoCardKeys[keyof VideoCardKeys]
  | MobileKeys[keyof MobileKeys]
  | ProcessorKeys[keyof ProcessorKeys]
  | RamKeys[keyof RamKeys];

// Product Item
export type ProductItemType = {
  sku: string,
  name: string,
  price: number,
  priceDiscount: number,
  category: string
  stock: number,
  description: string,
  warranty: string,
  retailer: string,
  review: ProductReviewPropertyType[],
  calculatedRatingAvg: number,
  properties: ProductMergedPropertiesType
}

// ----------PRODUCT CONTEXT LOGIC----------
export type ProductStateType = {
  products?: ProductItemType[],
  filteredProducts?: ProductItemType[],
  categoryProducts?: ProductItemType[],
  categoryProductsFiltered?: ProductItemType[],
  searchTerm?: string,
  isFilteringProduct?: boolean,
  searchStatus?: string,
  activeSortOption?: SORT_OPTION_VALUE,
}

// ----------REDUCER----------
export type ReducerAction = {
  type: string,
  payload?: ProductStateType
}

// ----------CREATE CONTEXT----------
export type UseProductContextType = ReturnType<typeof useProductContext>

// ----------CREATE PROVIDER----------
export type ChildrenType = {children?: ReactElement | ReactElement[]}