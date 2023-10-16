import { ProductItemType } from '../types/productsProviderTypes'
import useCart from './useCart'

// CUSTOM HOOK
const useCartProductHandler = () => {
  // CONTEXT
  const {dispatch, REDUCER_ACTIONS_CART} = useCart();
  
  // HANDLERS
  // add single item to cart 
  const addToCartHandler = (product: ProductItemType) => {
    if(!product) return;
    dispatch({type: REDUCER_ACTIONS_CART.ADD, payload: {...product, stock: product.stock, qty: 1}})
  }

  // remove all items from cart 
  const removeFromCartHandler = (product: ProductItemType) => {
    if(!product) return;
    dispatch({type: REDUCER_ACTIONS_CART.REMOVE, payload: {...product, qty: 0}})
  }

  return {addToCartHandler, removeFromCartHandler}
}

export default useCartProductHandler
