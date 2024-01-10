// Displayed list of products added to cart
import React, { ReactElement, ChangeEvent, memo } from "react";
import { ReducerAction, ReducerActionType, CartItemType } from "../types/cartProviderTypes";
import { RemoveIcon } from "./SVGComponents";
import { useConvertStringToURLFormat } from "../hooks/useConvertStringToURLFormat";
import { useNavigate } from "react-router-dom";
import useIsHovered from "../hooks/useIsHovered";
import "./CartProduct.css";

// TYPE
type PropsType = {
  product: CartItemType,
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS_CART: ReducerActionType
}

// COMPONENT
const CartLineItem = ({ product, dispatch, REDUCER_ACTIONS_CART }: PropsType) => {
  // ROUTE
  const navigate = useNavigate();

  // HOOKS
  const productURL = useConvertStringToURLFormat(product.name + "-" + product.sku); 
  const { isElementHovered, elementMouseEnter, elementMouseLeave } = useIsHovered(); 

  // MISC
  // Product image 
  const img:string =  new URL(`../images/${ product.category }.jpg`, import.meta.url).href
  
  // HANDLERS
  // Change product quantity
  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS_CART.UPDATE_QUANTITY,
      payload: {...product, qty: Number(e.target.value)}
    })
  }

  // Remove all products of the same type from cart
  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS_CART.REMOVE,
    payload: product
  })

  // Navigate to the clicked product
  const navigateToProductHandler = () => {
    navigate(`/${ product.category }/product/${ productURL }/about`, { replace: true }) 
  }

  // JSX
  // Product image and name 
  const productImageAndName = (
    <div className="cart-product--image-and-name"> 
      <div className="cart__image">
        <img 
          onClick={ navigateToProductHandler }
          src={ img } 
          alt={ product.name } 
        />
      </div>
      <div className="cart-product--name">
        <button 
          className="button--cart-product-name"
          onClick={ navigateToProductHandler }
          tabIndex={ 0 }
          >
          <span>{ product.name }</span>
        </button>
        </div>
    </div>
  )

  // Product single unit price
  const productSingleUnitPrice = (
    <div className="cart-product--price">
      <span> 
        { new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price) }
      </span>
    </div>
  )

  // Order quantity
  // calculate amount of options displayed 
  const lineTotal: number = (product.qty * product.price)
  const highestQty: number = product.stock > product.qty ? product.stock : product.qty // max allowed quantity for a product
  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)
  const options: ReactElement[] = optionValues.map(value => {
    return (
      <option 
        key={ `opt${value }` } 
        value={ value }
      > { value } 
      </option>
    )
  }) 

  // order quantity dropdown
  const selectOrderQuantity = (
    <div className="cart-product--select-quantity">
      <select 
        name="itemQty" 
        id="itemQty"
        className="button--select-quantity"
        value={ product.qty }
        onChange={ onChangeQty }
      > { options } </select>
    </div>
  )

  // Price of all the product items of the same type
  const subtotalPrice = (
    <div className="cart-product-subtotal">
      <span> { new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lineTotal) } </span>
    </div>
  )

  // Remove all instances of the product item from cart
  // Icon style
  const iconSize = "25px";
  const iconStroke = "none";
  const iconColor = "var(--color-2)";
  const iconColorHovered = "var(--color-3)";
  const removeProductFromCart = (
    <div className="cart-product-remove">
      <button 
        className="button--remove-from-cart"
        title="Remove Item From Cart"
        onClick={ onRemoveFromCart }
        onMouseEnter={elementMouseEnter }
        onMouseLeave={ elementMouseLeave }
      > 
        <RemoveIcon 
          height={ iconSize } 
          width={ iconSize } 
          stroke={ iconStroke }
          fill={ isElementHovered ? iconColorHovered : iconColor }
        />
      </button>
    </div>
  )

  return (
    <li className="cart-product">
      { productImageAndName }
      { productSingleUnitPrice }
      { selectOrderQuantity }
      { subtotalPrice }
      { removeProductFromCart }
    </li>
  )
}

// comparing props to make sure they are the same: prevItem === nextItem ? no rerender : rerender
function areItemsEqual({ product: prevProduct }: PropsType, { product: nextProduct }: PropsType ) {
  return Object.keys(prevProduct).every(key => {
    return prevProduct[key as keyof CartItemType] === nextProduct[key as keyof CartItemType]
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)
export default MemoizedCartLineItem