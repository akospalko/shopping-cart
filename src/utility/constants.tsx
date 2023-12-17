// Enums Constants and magic numbers, initializers


// 
export const PRODUCT_CATEGORY = {
  ALL: "all"
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

// ???
export const enum PRODUCT_VIEW_TAB {
  ABOUT = "about",
  CHARACTERSISTICS = "charactersistics",
  REVIEW = "review"
} 

// NavigationMenu.tsx
export const NAVIGATION_MENU_ITEMS_ACTION = {
  MAIN_MENU: "MAIN_MENU",
  PRODUCT_CATEGORY: "PRODUCT_CATEGORY",
} as const;

// Misc
export const CONSTANT = { 
  PRODUCT: "product" 
}