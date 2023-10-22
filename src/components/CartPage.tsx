// Cart page
import {useState, useEffect} from 'react'
import CartProduct from './CartProduct'
import useCart from '../hooks/useCart'
import {CartItemType} from '../types/cartProviderTypes'
import './CartPage.css'

// CONSTANTS
const CONSTANTS = {
  TOTAL_PRODUCTS: 'Total Products:',
  TOTAL_PRICE: 'Total Price:',
  EMPTY_CART: 'Empty Cart',
  THANKS_FOR_THE_ORDER: 'Thank you for your order.',
  YOUR_CART: 'Your cart 🛒',
  PLACE_ORDER: 'Place Order',
  FILL_YOUR_CART: 'Fill your cart'
}

// ENUM
enum HEADER_LABELS {
  ITEM = 'item',
  PRICE = 'price',
  COUNT = 'count',
  SUBTOTAL_PRICE = 'subtotal', // sum of the same products' price
  REMOVE_ALL = ''
}

// COMPONENT
const CartPage = () => {
  // STATE
  const [confirm, setConfirm] = useState<boolean>(false);

  // CONTEXT
  const {dispatch, REDUCER_ACTIONS_CART, totalItems, totalPrice, cart} = useCart()  

  // EFFECTS
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'cart');
  },[])

  // HANDLER
  const onSubmitOrder = () => {
    dispatch({type: REDUCER_ACTIONS_CART.SUBMIT_ORDER })
    setConfirm(true);
  }

  // ELEMENTS
  // Products list table 
  const cartProductListTable = (
    <>
      <div className='cart-page__header'> 
        {Object.keys(HEADER_LABELS).map((key, i) => <span key={i}> {HEADER_LABELS[key as keyof typeof HEADER_LABELS]} </span>)}
      </div>
      <ul className='cart-page__products'>
        {totalItems > 0 ? 
          <>
            {cart.map((product: CartItemType) => {
              return(
                <CartProduct
                  key={product.sku}
                  product={product}
                  dispatch={dispatch}
                  REDUCER_ACTIONS_CART={REDUCER_ACTIONS_CART}
                />
              )})}
            <li className='cart-page__products-total'>
              <h3> {CONSTANTS.TOTAL_PRODUCTS} {totalItems} </h3>
              <h3> {CONSTANTS.TOTAL_PRICE} {totalPrice} </h3>
            </li>
          </>
        :  
        <li className='cart-page__products-empty'>
            <h2> {CONSTANTS.EMPTY_CART} </h2>
          </li>
        }
      </ul>
    </>
  )

  // Order button
  const orderButton = (
    <div className='cart-page__order'>
      <button 
        className='button--order-products' 
        disabled={!totalItems}
        onClick={onSubmitOrder}
      > {totalItems > 0 ? CONSTANTS.PLACE_ORDER : CONSTANTS.FILL_YOUR_CART} </button>
    </div>
  )

  // LAYOUT
  const orderedProductLayout = <h1 className='cart-page__title'>{CONSTANTS.THANKS_FOR_THE_ORDER}</h1>
  const cartContentLayout = (
    <>
      <h1 className='cart-page__title'> {CONSTANTS.YOUR_CART} </h1>
      <div className='cart-page__wrapper'>
        <div className='cart'>
          {cartProductListTable}
        </div>
      </div>
      {orderButton}
    </>  
  )

  return (
    <main className='main main--cart'>
      {confirm ? orderedProductLayout : cartContentLayout}
    </main>
  )
}

export default CartPage