// Product page menu that holds product categories and additional menu elements
import './ProductSidemenu.css'
import { ProductCategories } from './ProductCategories'
import { ProductsSidemenuPropsType } from '../../types/productSidemenuTypes'

// COMPONENT
const ProductSidemenu = ({onResetActivePage, activeCategory}: ProductsSidemenuPropsType) => {
  
  return (
    <div className='product-sidemenu'>
      <ProductCategories 
        onResetActivePage={onResetActivePage} 
        activeCategory={activeCategory} 
      />
    </div>
  )
}

export default ProductSidemenu