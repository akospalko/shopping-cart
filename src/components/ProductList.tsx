// Displayed products container
import './ProductList.css'
import useCart from '../hooks/useCart'
import Product from './Product'
import { CartItemType } from '../types/cartProviderTypes'
import { ProductItemType } from '../types/productsProviderTypes'

// TYPE
type PropsType = {
  productsData: ProductItemType[]
}

// COMPONENT
const ProductList = ({productsData}: PropsType) => {

  // CONTEXTS
  const {dispatch, REDUCER_ACTIONS_CART, cart} = useCart()

  // GETTERS
  // check value if an item is added to cart
  const isItemInCart = (cartItems: CartItemType[], product: ProductItemType): boolean => {
    return cartItems.some((item: CartItemType) => item.sku === product.sku)
  }

  // store number of items in cart for the specific product
  const getInCartQty = (cartItems: CartItemType[], product: ProductItemType): number | undefined => {
    const foundItem = cartItems.find((item: CartItemType) => item.sku === product.sku);
    if (foundItem) {
      return foundItem.qty as number;
    } else {
      return undefined;
    }
  }

  // ELEMENTS
  const displayedProductList = productsData?.map((product: ProductItemType) => (
    <Product
      key={product.sku} 
      product={product}
      inCart={isItemInCart(cart, product)}
      inCartQty={getInCartQty(cart, product)} 
      dispatch={dispatch} 
      REDUCER_ACTIONS_CART={REDUCER_ACTIONS_CART}
    />
  ))

  return ( 
    <div className="product-list">
      {displayedProductList}
    </div>
  )
}

export default ProductList