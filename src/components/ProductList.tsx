import {ReactElement} from 'react'
import './ProductList.css'
import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import Product from './Product'
import { CartItemType } from '../types/cartProviderTypes'
import { ProductItemType } from '../types/productsProviderTypes'

const ProductList = () => {
  const {dispatch, REDUCER_ACTIONS_CART, cart} = useCart()
  const {products, filteredProducts} = useProducts()
  let pageContent:ReactElement | ReactElement[] = <p> Loading... </p>
  console.log(filteredProducts)
  const displayedProducts: ProductItemType[] = filteredProducts?.length > 0 ? filteredProducts : products
  
  if(displayedProducts?.length) {
    pageContent = displayedProducts.map((product: ProductItemType) => {
      const inCart: boolean = cart.some((item: CartItemType) => item.sku === product.sku)

      const inCartQty: number | undefined = (() => {
        const foundItem = cart.find((item: CartItemType) => item.sku === product.sku);
        if (foundItem) {
          return foundItem.qty as number;
        } else {
          return undefined;
        }
      })();

      return (
        <Product
          key={product.sku} 
          product={product}
          inCartQty={inCartQty} 
          dispatch={dispatch} 
          REDUCER_ACTIONS_CART={REDUCER_ACTIONS_CART}
          inCart={inCart}
        />
      )
    })
  }

  const content = 
    <main className="main main--products">
      <h1 className="main--products__title"> Browse goodies </h1>
      <div className="product-list">
        {pageContent}
      </div>
    </main>

  return content
}

export default ProductList