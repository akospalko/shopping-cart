// Product filter ui and logic; Filter by property and/or price
import { useMemo, CSSProperties, ReactElement } from "react";
import PriceFilter from "./PriceFilter";
import useMediaQuery from "../../hooks/useMediaQuery";
import useProducts from "../../hooks/useProducts";
import useFilter from "../../hooks/useFilter";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import { ProductItemType } from "../../types/productsProviderTypes";
import DividerLine from "../UI/DividerLine";
import PropertyFilter from "./PropertyFilter";
import { FilterOptionsType } from "../../types/ProductFilterTypes";
import { MODAL_TOGGLE_KEY } from "../../utility/constants";
import { FilterResetIcon, FilterIcon } from "../SVGComponents";
import useNavigationMenu from "../../hooks/useNavigationMenu";

import textData from "../../data/textData.json";
import "./ProductFilters.css";
import "./ProductSidemenu.css";

const ProductFilters = () => {
  // CONTEXTS
  const { categoryProducts, categoryProductsFiltered } = useProducts();
  const { filterOptions } = useFilter();
  const { modal } = useNavigationMenu();

  // VALUE
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  // HOOKS
  const { debouncedFilterProductsHandler, clearFilteredProductsHandler } = useProductsFilterHandler();
  const isBelow360Px: boolean = useMediaQuery("(max-width: 359px)");
  const isBelow1024Px: boolean = useMediaQuery("(min-width: 1024px)");

  // STYLE
  const filterButtonWrapperStyle: CSSProperties = { height: "auto", width: "auto" };
  const isClearFilteredButtonDisabled: boolean = categoryProductsFiltered === undefined || !categoryProductsFiltered.length;
  const iconSize: string = "20px"; 
  const iconColor: string = "var(--color-5)";
  const iconColorDisabled: string = "var(--color-6)";
  
  // JSX
  const productFilterButtons: ReactElement = (
    <div className="product-filter__buttons">
      <button 
        className={ isClearFilteredButtonDisabled ? "button--product-filter button--product-filter-disabled" : "button--product-filter" }
        onClick={ clearFilteredProductsHandler }
        disabled={ isClearFilteredButtonDisabled }  
      > 
        <FilterResetIcon
          wrapperCustomStyle={ filterButtonWrapperStyle }
          width={ iconSize }
          height={ iconSize }
          stroke={ isClearFilteredButtonDisabled ? iconColorDisabled : iconColor}
        />
        <span> { textData["reset-filters"] } </span>
      </button>
      <button 
        className="button--product-filter"
        onClick={ () => debouncedFilterProductsHandler(activeCategoryProducts) }
      >    
        <FilterIcon
          wrapperCustomStyle={ filterButtonWrapperStyle }
          width={ iconSize }
          height={ iconSize }
          stroke={ iconColor }
        />
        <span> { textData["filter"] } </span>
      </button>
    </div>
  )
  
  // LAYOUT
  const isPropertyFilterAvailable: boolean = !!Object.keys(filterOptions as FilterOptionsType).length;
  const filterLayoutVerySmallScreen: ReactElement = (
    <>
      <h3 className="product-sidemenu__subtitle"> { textData["filter"] } </h3>
      { productFilterButtons }
      <DividerLine style="divider-line--horizontal"/>
      <PriceFilter categoryProducts={ activeCategoryProducts }/>
      { isPropertyFilterAvailable && (
        <>
          <DividerLine style="divider-line--horizontal"/>
          <h3 className="product-sidemenu__subtitle"> { textData["property"] } </h3>
          <PropertyFilter/>
        </>
        ) 
      }
    </>
  ) 

  const filterLayoutSmallScreen: ReactElement = (
    <>
      <PriceFilter categoryProducts={ activeCategoryProducts }/>
      { isPropertyFilterAvailable && (
        <>
          <DividerLine style="divider-line--horizontal"/>
          <h3 className="product-sidemenu__subtitle"> { textData["property"] } </h3>
          <PropertyFilter/>
        </>
        ) 
      }
      { productFilterButtons }
    </>
  ) 

  const filterLayoutLargeScreen: ReactElement = (
    <>
      <PriceFilter categoryProducts={ activeCategoryProducts }/>
      { isPropertyFilterAvailable && (
        <>
          <DividerLine style="divider-line--horizontal"/>
          <h3 className="product-sidemenu__subtitle"> { textData["property"] } </h3>
          { modal[MODAL_TOGGLE_KEY.FILTER_MENU] ? <PropertyFilter/> : null }
        </>
        ) 
      }
      { productFilterButtons }
    </>
  ) 

  let activeLayout;
  if(isBelow360Px) {
    activeLayout = filterLayoutVerySmallScreen;
  } else if (isBelow1024Px) {
    activeLayout = filterLayoutLargeScreen;
  } else {
    activeLayout = filterLayoutSmallScreen;
  }

  return (
    <div className="product-filter">
      { activeLayout }
    </div>
  )
}

export default ProductFilters; 