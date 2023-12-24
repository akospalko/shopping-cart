// Product filter ui and logic; Filter by property and/or price
import { useEffect, useMemo, CSSProperties, ReactElement } from "react";
import PriceFilter from "./PriceFilter";
import useMediaQuery from "../../hooks/useMediaQuery";
import useProducts from "../../hooks/useProducts";
import useFilter from "../../hooks/useFilter";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import useProductFilterOptions from "../../hooks/useCreateProductFilterOptions";
import { ProductItemType } from "../../types/productsProviderTypes";
import DividerLine from "../UI/DividerLine";
import PropertyFilter from "./PropertyFilter";
import { FilterOptionsType } from "../../types/ProductFilterTypes";
import { FilterResetIcon, FilterIcon } from "../SVGComponents";
import textData from "../../data/textData.json";
import "./ProductFilters.css";
import "./ProductSidemenu.css";

const ProductFilters = () => {
  // CONTEXTS
  const { categoryProducts, categoryProductsFiltered } = useProducts();
  const { filterOptions, dispatch, REDUCER_ACTIONS_FILTER } = useFilter();
  // VALUE
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  // HOOKS
  const { debouncedFilterProductsHandler, debouncedClearFilteredProductsHandler } = useProductsFilterHandler();
  const createProductFilterOptions = useProductFilterOptions();
  const isBelow360Px = useMediaQuery("(max-width: 359px)");

  // EFFECT
  useEffect(() => {
    // get and store filterOptionsfrom session storage
    const getFilterOptions = sessionStorage.getItem("filterOptions");
    const storedFilterOptions = getFilterOptions ? JSON.parse(getFilterOptions) : null;
    // check available storage filter options, update reducer state
    if (storedFilterOptions && Object.keys(storedFilterOptions).length) {
      dispatch({
        type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
        payload: { filterOptions: storedFilterOptions },
      });
    } else {
      // if not available, calculate filter options: store in session storage and update reducer state 
      const calculatedFilterOptions = createProductFilterOptions(activeCategoryProducts);
      dispatch({
        type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
        payload: { filterOptions: calculatedFilterOptions },
      });
      // store filterOptions in session storage
      sessionStorage.setItem("filterOptions", JSON.stringify(calculatedFilterOptions));
    }
  }, [REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS, activeCategoryProducts, createProductFilterOptions, dispatch]);

  // STYLE
  const filterButtonWrapperStyle: CSSProperties = { height: "auto", width: "auto" };
  const isClearFilteredButtonDisabled: boolean = categoryProductsFiltered === undefined || !categoryProductsFiltered.length
  const iconSize: string = "20px"; 
  const iconColor: string = "var(--color-5)";
  const iconColorDisabled: string = "var(--color-6)";
  
  // JSX
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

    let activeLayout;
    if(isBelow360Px) {
      activeLayout = filterLayoutVerySmallScreen;
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