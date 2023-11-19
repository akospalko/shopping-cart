// Various product filters for the active product category, and btw component dividers 
import PriceFilter from './PriceFilter';
import useProducts from '../../hooks/useProducts';
import './ProductFilters.css';

// CONSTANT
const CONSTANTS = { FILTER: 'Filter' }

// COMPONENTS
// Filter dividers
const FilterDivider = () => <div className='product-sidemenu-divider'></div>

// Sidemenu dividers
const ProductFilters = () => {
  // CONTEXTS
  const { products } = useProducts();

  return (
    <div className='product-filter'>
      <h2 className='product-sidemenu-category__header--2'>{ CONSTANTS.FILTER }</h2>
      <PriceFilter categoryProducts={ products || [] } />
      <FilterDivider/>
    </div>
  )
}

export default ProductFilters;