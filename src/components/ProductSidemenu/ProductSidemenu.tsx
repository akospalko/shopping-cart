// Product sidemenu for navigating btw product categories and filtering logic; Used with large screen (+1024px)
import { ReactElement, forwardRef, ForwardedRef } from "react";
import PriceFilter from "../ProductSidemenu/PriceFilter";
import PropertyFilter from "../ProductSidemenu/PropertyFilter";
import { FilterOptionsType } from "../../types/ProductFilterTypes";
import useFilter from "../../hooks/useFilter";
import useStoreAndRetrieveProductFilters from "../../hooks/useStoreAndRetrieveProductFilters";
import useMemoizedActiveCategoryProducts from "../../hooks/useMemoizedActiveCategoryProducts";
import { useGetNavigationItems } from "../../hooks/useGetNavigationItems";
import { NAVIGATION_MENU_ITEMS_ACTION } from "../../utility/constants";
import DividerLine from "../UI/DividerLine";
import ProductFilterButtons from "../UI/ProductFilterButtons";
import FilterMenuSectionHeader from "../UI/FilterMenuSectionHeader";
import textData from "../../data/textData.json";
import "./ProductSidemenu.css";

const ProductSidemenu = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  // CONTEXT
  const { filterOptions } = useFilter();

  // HOOKS
  const navigationProductCategoryItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.SIDEMENU_PRODUCT_CATEGORIES);
  const activeCategoryProducts = useMemoizedActiveCategoryProducts();
  useStoreAndRetrieveProductFilters(activeCategoryProducts);
  
  // Displayed content
  const isPropertyFilterAvailable: boolean = !!Object.keys(filterOptions as FilterOptionsType).length;

  // JSX
  const productFilter: ReactElement = (
    <>
      <PriceFilter categoryProducts={ activeCategoryProducts }/>
      { isPropertyFilterAvailable && (
        <>
          <DividerLine style="divider-line--horizontal"/>
          <FilterMenuSectionHeader textContent={ textData["property"] } />
          <PropertyFilter/>
        </>
        ) 
      }
    </>
  )

  const productCategoryNavigation: ReactElement = (
    <>
      <FilterMenuSectionHeader textContent={ textData["product-categories"] }/>
      <nav className="product-sidemenu__category">
        { navigationProductCategoryItems }
      </nav>
    </>
  ) 

  return (
    <div 
      className="product-sidemenu"
      ref={ ref || null }
    >
      { productCategoryNavigation }
      <DividerLine style="divider-line--horizontal"/>
      { productFilter }
      <ProductFilterButtons/>
    </div>
  )
})

export default ProductSidemenu;