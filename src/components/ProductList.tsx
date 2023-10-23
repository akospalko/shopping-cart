// Displayed products container
import './ProductList.css'
import ProductCard from './ProductCard'
import { ProductItemType } from '../types/productsProviderTypes'

// TYPE
type PropsType = {
  productsData: ProductItemType[]
}

// COMPONENT
const ProductList = ({productsData}: PropsType) => {

  return ( 
    <div className="product-list">
      {productsData?.map((product: ProductItemType) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  )
}

export default ProductList