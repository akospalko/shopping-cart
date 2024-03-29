// Enums Constants and magic numbers, initializers
import { ModalTypes } from "../types/navigationMenuTypes";
// 
export const PRODUCT_CATEGORY = {
  ALL: "all",
  PROCESSOR: "processor",
  MOBILE: "mobile",
  VIDEO_CARD: "videocard",
  RAM: "ram"
}
// PriceFilter.tsx
export const priceFilterStateInitializer = {
  min: 1,
  max: 100
};

// ProductPage.tsx, ProductSearchPage.tsx
export const itemsPerPage: number = 5;

export const RATING = {
  TOTAL_STARS: 5,
};

// ENUMS
export enum SEARCH {
  RESULT = "SEARCH_RESULT",
  NO_RESULT = "SEARCH_NO_RESULT",
}

// ProductOrder.tsx
export enum SORT_OPTION_VALUE {
  PRICE_EXPENSIVE_TO_CHEAP = "PRICE_EXPENSIVE_TO_CHEAP",
  PRICE_CHEAP_TO_EXPENSIVE = "PRICE_CHEAP_TO_EXPENSIVE",
  RATING = "RATING",
}

// prodouctSort.tsx
export enum SORT_ORDER {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING"
}

// CartpAGE.tsx
export enum CART_SUMMARY_HEADER_LABELS {
  ITEM = 'item',
  PRICE = 'price',
  COUNT = 'count',
  SUBTOTAL_PRICE = 'subtotal', // sum of the same products' price
  REMOVE_ALL = ''
}

// ProductView.tsx, ...
export const enum PRODUCT_VIEW_TAB {
  ABOUT = "ABOUT",
  CHARACTERISTICS = "CHARACTERSISTICS",
  REVIEWS = "REVIEWS"
} 

// NavigationMenu.tsx
export const NAVIGATION_MENU_ITEMS_ACTION = {
  MAIN_MENU_NAVIGATION: "MAIN_MENU_NAVIGATION",
  MAIN_MENU_PRODUCT_CATEGORIES: "MAIN_MENU_PRODUCT_CATEGORIES",
  FILTER_MENU_PRODUCT_CATEGORIES: "FILTER_MENU_PRODUCT_CATEGORIES",
  SIDEMENU_PRODUCT_CATEGORIES: "SIDEMENU_PRODUCT_CATEGORIES",
  MAIN_BAR_NAVIGATION: "MAIN_BAR_NAVIGATION",
} as const;

// NavigationMenuProvider.tsx
export const MODAL_TOGGLE_STATE_INITIALIZER: ModalTypes = {
  MAIN_MENU: false,
  FILTER_MENU: false,
  SIDE_MENU: true
}
// NavigationMenuProvider.tsx
export const enum MODAL_TOGGLE_KEY {
  MAIN_MENU = "MAIN_MENU",
  FILTER_MENU = "FILTER_MENU",
  SIDE_MENU = "SIDE_MENU"
} 

// Misc
export const CONSTANT = { 
  PRODUCT: "product" 
}