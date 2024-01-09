// Cart page
import { ReactElement, useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import useCart from "../hooks/useCart";
import { CartItemType } from "../types/cartProviderTypes";
import textData from "../data/textData.json";
import { CART_SUMMARY_HEADER_LABELS } from "../utility/constants";
import "./CartPage.css";

// COMPONENT
const CartPage = () => {
  // STATE
  const [ confirm, setConfirm ] = useState<boolean>(false);

  // CONTEXT
  const { dispatch, REDUCER_ACTIONS_CART, totalItems, totalPrice, cart } = useCart();  

  // EFFECT
  useEffect(() => {
    sessionStorage.setItem("lastVisitedPage", "cart");
  }, []);

  // HANDLER
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS_CART.SUBMIT_ORDER });
    setConfirm(true);
  }

  // JSX
  // Products list table 
  const cartProductListTable: ReactElement = (
    <>
      <div className="cart-page__header"> 
        { Object.keys(CART_SUMMARY_HEADER_LABELS).map((key: string, i: number) => <span key={ i }> { CART_SUMMARY_HEADER_LABELS[ key as keyof typeof CART_SUMMARY_HEADER_LABELS ] } </span>) }
      </div>
      <ul className="cart-page__products">
        { totalItems > 0 ? 
          <>
            { cart.map((product: CartItemType) => {
              return(
                <CartProduct
                  key={ product.sku }
                  product={ product }
                  dispatch={ dispatch }
                  REDUCER_ACTIONS_CART={ REDUCER_ACTIONS_CART }
                />
              ) }) }
            <li className="cart-page__products-total">
              <h3> { textData["total-products"] } { totalItems } </h3>
              <h3> { textData["total-price"] } { totalPrice } </h3>
            </li>
          </>
        :  
        <li className="cart-page__products-empty">
            <h2> { textData["empty-cart"] } </h2>
          </li>
        }
      </ul>
    </>
  )

  // Order button
  const orderButton: ReactElement = (
    <div className="cart-page__order">
      <button 
        className="button--order-products" 
        disabled={ !totalItems }
        onClick={ onSubmitOrder }
      > { totalItems > 0 ? textData["place-order"] : textData["fill-your-cart"] } </button>
    </div>
  )

  // LAYOUT
  const orderedProductLayout = <h1 className="cart-page__title">{ textData["thanks-for-the-order"] }</h1>
  const cartContentLayout = (
    <>
      <h1 className="cart-page__title"> { textData["your-cart"] } </h1>
      <div className="cart-page__wrapper">
        <div className="cart">
          { cartProductListTable }
        </div>
        { orderButton }
      </div>
    </>  
  )

  return (
    <main className="main main__cart-page">
      { confirm ? orderedProductLayout : cartContentLayout }
    </main>
  )
}

export default CartPage;