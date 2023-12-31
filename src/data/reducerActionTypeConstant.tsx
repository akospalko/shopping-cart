// Reducer action type constants
// CART 
export const REDUCER_ACTION_TYPE_CART = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  SUBMIT_ORDER: "SUBMIT_ORDER",
}

// PRODUCT
export const REDUCER_ACTION_TYPE_PRODUCT = {
  UPDATE_PRODUCTS: "UPDATE_PRODUCTS",
  UPDATE_FILTERED_PRODUCTS: "UPDATE_FILTERED_PRODUCTS",
  UPDATE_CATEGORY_PRODUCTS: "UPDATE_CATEGORY_PRODUCTS",
  UPDATE_CATEGORY_PRODUCTS_FILTERED: "UPDATE_CATEGORY_PRODUCTS_FILTERED",
  SUBMIT_SEARCH_VALUE: "SUBMIT_SEARCH_VALUE",
  UPDATE_PROPERTY_FILTER_GROUPS: "UPDATE_PROPERTY_FILTER_GROUPS"
}

// FILTER
export const REDUCER_ACTION_TYPE_FILTER = {
  UPDATE_SEARCH_TERM: "UPDATE_SEARCH_TERM",
  SEARCH_STATUS: "SEARCH_STATUS",
  IS_FILTERING_PRODUCT: "IS_FILTERING_PRODUCT",
  UPDATE_SORT_VALUE: "UPDATE_SORT_VALUE",
  UPDATE_FILTER_OPTIONS: "UPDATE_FILTER_OPTIONS",
}