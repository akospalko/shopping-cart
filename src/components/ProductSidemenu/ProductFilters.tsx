// Filter and display product based on specified/slected properties

import PriceFilter from './PriceFilter'
import './ProductFilters.css'


// CONSTANT
const CONSTANTS = {FILTER: 'Filter'}

// COMPONENTS
// filter dividers
const FilterDivider = () => {
  return <div className='product-sidemenu-divider'></div>
}

// Sidemenu dividers
const ProductFilters = () => {

  return (
    <div className='product-filter'>
      <h2 className="product-sidemenu-category__header--2">{CONSTANTS.FILTER}</h2>
      <PriceFilter/>
      <FilterDivider/>
    </div>
  )
}

export default ProductFilters