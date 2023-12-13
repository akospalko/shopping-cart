// Sort product based on various parameters - reusable function
import { ProductItemType } from "../types/productsProviderTypes";
import { SORT_OPTION_VALUE, SORT_ORDER } from "./constants";
import textData from "../data/textData.json";

// Sorts an array of products based on price
function sortByPrice(products: ProductItemType[], sortOrder: SORT_ORDER = SORT_ORDER.DESCENDING) {
  return products.sort((a: ProductItemType, b: ProductItemType) => {
    const priceA = a.priceDiscount !== undefined ? a.priceDiscount : a.price;
    const priceB = b.priceDiscount !== undefined ? b.priceDiscount : b.price;

    if (sortOrder ===  SORT_ORDER.ASCENDING) {
      return priceA - priceB;
    } else if (sortOrder === SORT_ORDER.DESCENDING) {
      return priceB - priceA;
    } else {
      throw new Error(textData["sort-order-error"]);
    }
  });
}

// Sorts an array of products based on the specified active sort option
export function sortBy(products: ProductItemType[], activeSortOption: SORT_OPTION_VALUE): ProductItemType[] {
  switch (activeSortOption) {
    case SORT_OPTION_VALUE.PRICE_EXPENSIVE_TO_CHEAP:
      return sortByPrice(products, SORT_ORDER.DESCENDING);
    case SORT_OPTION_VALUE.PRICE_CHEAP_TO_EXPENSIVE:
      return sortByPrice(products, SORT_ORDER.ASCENDING);
    case SORT_OPTION_VALUE.RATING:
      return products.sort((a: ProductItemType, b: ProductItemType) => b.calculatedRatingAvg - a.calculatedRatingAvg);
    default:
      throw new Error(textData["sort-option-invalid"]);
  }
}