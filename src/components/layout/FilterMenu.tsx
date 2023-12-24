// Menu modal for product filtering
import ProductFilters from "../ProductSidemenu/ProductFilters";
import "./FilterMenu.css";

const FilterMenu = () => {
  
  return (
    <div className="filter-menu__backdrop">
      <div className="filter-menu__modal">
        <ProductFilters/>
      </div>
    </div> 
  )
}

export default FilterMenu;