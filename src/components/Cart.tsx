import { useState, useEffect } from 'react'
import CartLineItem from './CartLineItem'
import useCart from '../hooks/useCart';
import { CartItemType } from '../types/cartProviderTypes';

const Cart = () => {
  // ENUM
  enum HEADER_NAME {
    ITEM = 'item',
    PRICE = 'price',
    COUNT = 'count',
    SUBTOTAL_PRICE = 'subtotal', // sum of the same products' price
    REMOVE_ALL = ''
  }

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
  const pageContent = confirm 
  ? <h1 className='main--cart__title'> Thank you for your order.</h1> : 
  <>
    <h1 className='main--cart__title'> {'Your cart 🛒'} </h1>
    <div className="cart__wrapper">
      <ul className="cart">
        <div className="cart__header"> 
          {Object.keys(HEADER_NAME).map((key, i) => <span key={i}> {HEADER_NAME[key as keyof typeof HEADER_NAME]} </span>)}
        </div>
        <div className="cart__items">
          {totalItems > 0 ? 
            <>
              {cart.map((item: CartItemType) => {
              return(
                <CartLineItem
                  key={item.sku}
                  item={item}
                  dispatch={dispatch}
                  REDUCER_ACTIONS_CART={REDUCER_ACTIONS_CART}
                />
              )})}
              <li className='cart__item-total'>
                <h3> Total Items: {totalItems} </h3>
                <h3> Total Price: {totalPrice} </h3>
              </li>
            </>
          :  
            <li className="cart__item-empty">
              <h2> Empty Cart </h2>
            </li>
          }
        </div>
      </ul>
    </div>
    <div className="cart__order">
      <button 
        className="button--order-products" 
        disabled={!totalItems}
        onClick={onSubmitOrder}
      > {totalItems > 0 ? 'Place Order' : 'Fill your cart'} </button>
    </div>
  </>  

  const content = (
    <main className="main main--cart">
      {pageContent}
    </main>
  )

  return content
}

export default Cart