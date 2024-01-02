// Reusable buttons for initating/clearing product filters
import { CSSProperties, ReactElement } from "react";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import useGetActiveCategoryProducts from "../../hooks/useMemoizedActiveCategoryProducts";
import useProducts from "../../hooks/useProducts";
import { FilterIcon, FilterResetIcon } from "../SVGComponents";
import textData from "../../data/textData.json";
import "./ProductFilterButtons.css";

const ProductFilterButtons = () => {
  // CONTEXT
  const { categoryProductsFiltered } = useProducts();
  
  // HOOKS
  const { debouncedFilterProductsHandler, clearFilteredProductsHandler } = useProductsFilterHandler();
  const activeCategoryProducts = useGetActiveCategoryProducts();

  // STYLE
  const filterButtonWrapperStyle: CSSProperties = { height: "auto", width: "auto" };
  const isClearFilteredButtonDisabled: boolean = categoryProductsFiltered === undefined || !categoryProductsFiltered.length;
  const iconSize: string = "20px"; 
  const iconColor: string = "var(--color-5)";
  const iconColorDisabled: string = "var(--color-6)";

  // JSX
  const clearFilterButton: ReactElement = (
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
  )
  
  const submitProductButton: ReactElement = (
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
      <span>{ textData["filter"] }</span>
    </button>
  )

  return (
    <div className="product-filter__buttons">
      { clearFilterButton }
      { submitProductButton }
    </div>
  )
}

export default ProductFilterButtons;