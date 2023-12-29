// Menu modal for product filtering
import { useMemo, ReactElement, CSSProperties } from 'react';
import useNavigationMenu from "../../hooks/useNavigationMenu";
import { MODAL_TOGGLE_KEY } from "../../utility/constants";
import useMediaQuery from "../../hooks/useMediaQuery";
import useFilter from "../../hooks/useFilter";
import useStoreAndRetrieveProductFilters from "../../hooks/useStoreAndRetrieveProductFilters";
import PriceFilter from "../ProductSidemenu/PriceFilter";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import DividerLine from "../UI/DividerLine";
import PropertyFilter from "../ProductSidemenu/PropertyFilter";
import { FilterOptionsType } from "../../types/ProductFilterTypes";
import { FilterResetIcon, FilterIcon, RemoveIcon } from "../SVGComponents";
import useProducts from '../../hooks/useProducts';
import { ProductItemType } from '../../types/productsProviderTypes';
import textData from "../../data/textData.json";

// TODO: HANDLE STYLE LOCATION
import "./FilterMenu.css";
import "../ProductSidemenu/ProductFilters.css"
import "../ProductSidemenu/ProductSidemenu.css"
// import "./ProductFilters.css";
// import "./ProductSidemenu.css";

const FilterMenu = () => {
  // CONTEXT
  const { toggleModal } = useNavigationMenu();
  const { filterOptions } = useFilter();
  const { categoryProducts, categoryProductsFiltered } = useProducts();

  // MEMO
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  // HOOKS
  const { debouncedFilterProductsHandler, debouncedClearFilteredProductsHandler } = useProductsFilterHandler();
  const isBelow360px = useMediaQuery("(max-width: 359px)");
  const isBelow1024px = useMediaQuery("(min-width: 360px) and (max-width: 1023px)");
  useStoreAndRetrieveProductFilters(activeCategoryProducts);

  // STYLE
  const filterButtonWrapperStyle: CSSProperties = { height: "auto", width: "auto" };
  const isClearFilteredButtonDisabled: boolean = categoryProductsFiltered === undefined || !categoryProductsFiltered.length
  const iconSize: string = "20px"; 
  const iconColor: string = "var(--color-5)";
  const iconColorDisabled: string = "var(--color-6)";

  // JSX
  // Buttons
  const productFilterButtons: ReactElement = (
    <div className="product-filter__buttons">
      <button 
        className={ isClearFilteredButtonDisabled ? "button--product-filter button--product-filter-disabled" : "button--product-filter" }
        onClick={ debouncedClearFilteredProductsHandler }
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
    
  const closeFilterMenuButton = (
    <div className="filter-menu__close-button-wrapper">
      <button 
        className="button--close-filter-menu"
        onClick={ () => toggleModal(MODAL_TOGGLE_KEY.FILTER_MENU, true) }
      > 
        <RemoveIcon 
          width={ iconSize }
          height={ iconSize }
          fill={ iconColor }
          stroke={ iconColor }
        />
      </button>
    </div>
  )
    
  // Displayed content
  const isPropertyFilterAvailable: boolean = !!Object.keys(filterOptions as FilterOptionsType).length;

  // for very small screen
  const filterLayoutVerySmallScreen: ReactElement = (
    <div className="filter-menu__backdrop">
      <div className="filter-menu__modal">
        <div className="product-filter">
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
        </div>
      </div>
      { closeFilterMenuButton }
    </div>
  ) 

  // for small to medium screens
  const filterLayoutSmallScreen: ReactElement = (
    <div className="filter-menu__backdrop">
      <div className="filter-menu__modal">
        <div className="product-filter">
          <PriceFilter categoryProducts={ activeCategoryProducts }/>
          { isPropertyFilterAvailable && (
            <>
              <DividerLine style="divider-line--horizontal"/>
              <h3 className="product-sidemenu__subtitle"> { textData["property"] } </h3>
              <PropertyFilter/>
            </>
            ) 
          }
        </div>
        { productFilterButtons }
      </div>
      { closeFilterMenuButton }
    </div> 
  )

  // LAYOUT
  // Get active layout
  let activeLayout;
  if(isBelow360px) {
    activeLayout = filterLayoutVerySmallScreen;
  } else if (isBelow1024px) { 
    activeLayout = filterLayoutSmallScreen;
  }

  return (
    <>
      { activeLayout }
    </>
  )
}

export default FilterMenu;