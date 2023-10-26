// Product page menu that holds product categories and additional menu elements
import {ProductCategories} from './ProductCategories'
import {ProductsSidemenuPropsType} from '../../types/productSidemenuTypes'
import ProductFilters from './ProductFilters'
import './ProductSidemenu.css'

// COMPONENT
const ProductSidemenu = ({activeCategory}: ProductsSidemenuPropsType) => {
  
  return (
    <div className='product-sidemenu'>
      <ProductCategories activeCategory={activeCategory}/>
      <ProductFilters/>
    </div>
  )
}

export default ProductSidemenu