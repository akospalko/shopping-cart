// Enums Constants and magic numbers, initializers
import { ModalTypes } from "../types/navigationMenuTypes";
// 
export const PRODUCT_CATEGORY = {
  ALL: "all",
  PROCESSOR: "processor",
  MOBILE: "MOBILE",
  VIDEO_CARD: "VIDEO_CARD",
  RAM: "RAM"
}
// PriceFilter.tsx
export const priceFilterStateInitializer = {
  min: 1 ,
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

// ProductView.tsx, ...
export const enum PRODUCT_VIEW_TAB {
  ABOUT = "ABOUT",
  CHARACTERISTICS = "CHARACTERSISTICS",
  REVIEW = "REVIEW"
} 

// NavigationMenu.tsx
export const NAVIGATION_MENU_ITEMS_ACTION = {
  MAIN_MENU: "MAIN_MENU",
  PRODUCT_CATEGORY: "PRODUCT_CATEGORY",
  MAIN_BAR: "MAIN_BAR"
} as const;


// NavigationMenuProvider.tsx
export const MODAL_TOGGLE_STATE_INITIALIZER: ModalTypes = {
  MAIN_MENU: false,
  FILTER_MENU: false
}
// NavigationMenuProvider.tsx
export const enum MODAL_TOGGLE_KEY {
  MAIN_MENU = "MAIN_MENU",
  FILTER_MENU = "FILTER_MENU"
} 

// Misc
export const CONSTANT = { 
  PRODUCT: "product" 
}