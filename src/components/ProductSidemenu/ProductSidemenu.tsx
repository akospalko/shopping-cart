// Product page menu that holds product categories and additional menu elements
import './ProductSidemenu.css'
import {ProductCategories} from './ProductCategories'
import {ProductsSidemenuPropsType} from '../../types/productSidemenuTypes'

// COMPONENT
const ProductSidemenu = ({activeCategory}: ProductsSidemenuPropsType) => {
  
  return (
    <div className='product-sidemenu'>
      <ProductCategories activeCategory={activeCategory}/>
    </div>
  )
}

export default ProductSidemenu