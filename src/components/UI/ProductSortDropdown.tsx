// Sort product dropdown with multiple options
import { useEffect, ReactElement, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SORT_OPTION_VALUE } from "../../utility/constants";
import textData from "../../data/textData.json";
import "./ProductSortDropdown.css";
import useFilter from "../../hooks/useFilter";

// TYPE
type ProductSortDropdownOptionType = {
  value: string,
  label: string
}

const ProductSortDropdown = () => {
  // ROUTE
  const navigate = useNavigate();  
  const { category } = useParams();

  // CONTEXT
  const { activeSortOption, dispatch: dispatchFilter, REDUCER_ACTIONS_FILTER } = useFilter();
  
  // EFFECT 
  useEffect(() => {
    if(!category) {
      navigate(`/search/1`);
    } else {
      navigate(`/${ category }/1`);
    }
  }, [category, navigate, activeSortOption])
  
  // HANDLER
  // Switch to another option for sorting products
  const onChangeSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilter({
      type: REDUCER_ACTIONS_FILTER.UPDATE_SORT_VALUE,
      payload: { activeSortOption: e.target.value as SORT_OPTION_VALUE }
    })
  }

  // STYLE
  const isActiveSortOption = (value: string) => activeSortOption === value ? "product-sort-dropdown__option--active" : "";

  // ELEMENTS
  // Sort Options
  const sortOptions: ProductSortDropdownOptionType[] = [
    { value: SORT_OPTION_VALUE.RATING, label: textData["sort-option-rating"] }, 
    { value: SORT_OPTION_VALUE.PRICE_EXPENSIVE_TO_CHEAP, label: textData["sort-option-expensive-to-cheap"] },
    { value: SORT_OPTION_VALUE.PRICE_CHEAP_TO_EXPENSIVE, label: textData["sort-option-cheap-to-expensive"] },
  ];

  // Mapped option
  const options: ReactElement[] = sortOptions.map(({ value, label }) => (
    <option 
      key={`${ category }-opt-${ value }`} 
      className={ `product-sort-dropdown__option ${ isActiveSortOption(value) }` }
      value={ value }
    >
      { label }
    </option>
  ));

  return (
    <div className="product-sort-dropdown">
      <select 
        className="select--product-sort-dropdown"
        name="sort-by" 
        id="sort-by"
        onChange={ onChangeSortOption }
        defaultValue={ SORT_OPTION_VALUE.RATING }
      > { options } </select>
    </div>
  )
}

export default ProductSortDropdown;