import {useEffect, ReactElement} from 'react'
import './ProductList.css'
import useCart from '../hooks/useCart'
import Product from './Product'
import { CartItemType } from '../types/cartProviderTypes'
import { ProductItemType } from '../types/productsProviderTypes'
import Pagination from './Pagination'

// TYPE
type PropsType = {
  productsData: ProductItemType[] | undefined
}

// COMPONENT
const ProductList = ({productsData}: PropsType) => {

  // CONTEXTS
  const {dispatch, REDUCER_ACTIONS_CART, cart} = useCart()

  // EFFECTS
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'products');
  }, [])

  // ELEMENTS
  let displayedProducts:ReactElement | ReactElement[] = <p> Loading... </p>
  
  if(productsData?.length) {
    displayedProducts = productsData.map((product: ProductItemType) => {
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

  const productsContent = (
    <>
      <h1 className="main--products__title"> Browse goodies </h1>
      <div className="product-list">
        {displayedProducts}
      </div>
    </>
  )

  return ( 
    <main className="main main--products">
      {productsContent}
      <Pagination/>
    </main>
  )
}

export default ProductList