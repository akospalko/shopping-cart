// Sort product dropdown with multiple options
import { useEffect, ReactElement, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { SORT_OPTION_VALUE } from "../../utility/constants";
import "./ProductSortSelector.css";
import textData from "../../data/textData.json";

// TYPE
type SortOptionType = {
  value: string,
  label: string
}

const ProductSortSelector = () => {
  // ROUTE
  const navigate = useNavigate();  
  const { category } = useParams();

  // CONTEXT
  const { activeSortOption, dispatch, REDUCER_ACTIONS_PRODUCT } = useProducts();
  
  // EFFECT 
  useEffect(() => {
    if(!activeSortOption) return;
    navigate(`/${ category }/1`);
  }, [category, navigate, activeSortOption])
  
  // HANDLER
  // Switch to another option for sorting products
  const onChangeSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_SORT_VALUE,
      payload: { activeSortOption: e.target.value as SORT_OPTION_VALUE }
    })
  }

  // ELEMENTS
  // Sort Options
  const sortOptions: SortOptionType[] = [
    { value: SORT_OPTION_VALUE.RATING,
      label: textData["sort-option-rating"] }, 
    { value: SORT_OPTION_VALUE.PRICE_EXPENSIVE_TO_CHEAP,
      label: textData["sort-option-expensive-to-cheap"] },
    { value: SORT_OPTION_VALUE.PRICE_CHEAP_TO_EXPENSIVE,
      label: textData["sort-option-cheap-to-expensive"] },
  ];

  const options: ReactElement[] = sortOptions.map((option: SortOptionType) => {
    return (
      <option 
        key={ `opt${ option.value }` } 
        className={ `product-sort-by__option ${ activeSortOption === option.value && "product-sort-by__option--active" }` }
        value={ option.value }
      > { option.label }
      </option>
    )
  }) 

  return (
    <div className="product-sort-by">
      <select 
        className="select--product-sort-by"
        name="sort-by" 
        id="sort-by"
        onChange={ onChangeSortOption }
        defaultValue={ SORT_OPTION_VALUE.RATING }
      > { options } </select>
    </div>
  )
}

export default ProductSortSelector;