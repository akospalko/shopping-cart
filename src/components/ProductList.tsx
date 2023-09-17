import {ReactElement} from 'react'
import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import Product from './Product'

const ProductList = () => {
  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  const {products} = useProducts()
  let pageContent:ReactElement | ReactElement[] = <p> Loading... </p>

  if(products?.length) {
    pageContent = products.map(product => {
      
      const inCart: boolean = cart.some(item => item.sku === product.sku)

      const inCartQty: number | undefined = (() => {
        const foundItem = cart.find(item => item.sku === product.sku);
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
          REDUCER_ACTIONS={REDUCER_ACTIONS}
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