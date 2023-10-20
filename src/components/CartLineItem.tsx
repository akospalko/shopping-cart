// Displayed list of products added to cart
import React, {ReactElement, ChangeEvent, memo} from 'react'
import { ReducerAction, ReducerActionType, CartItemType } from '../types/cartProviderTypes'
import { RemoveIcon } from './SVGComponents'
import { useConvertStringToURLFormat } from '../hooks/useConvertStringToURLFormat'
import { useNavigate } from 'react-router-dom'
import './CartLineItem.css'

// TYPE
type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS_CART: ReducerActionType
}

// COMPONENT
const CartLineItem = ({item, dispatch, REDUCER_ACTIONS_CART}: PropsType) => {
  // ROUTE
  const navigate = useNavigate()
  // HOOK
  const productURL = useConvertStringToURLFormat(item.name + '-' + item.sku) 

  const img:string =  new URL(`../images/${item.sku}.jpg`, import.meta.url).href
  const lineTotal: number = (item.qty * item.price)
  const highestQty: number = item.stock > item.qty ? item.stock : item.qty // max allowed quantity for an item
  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)
  const options: ReactElement[] = optionValues.map(value => {
    return <option 
      key={`opt${value}`} 
      value={value}
    > {value} 
    </option>
  }) 

  // HANDLERS
  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS_CART.UPDATE_QUANTITY,
      payload: {...item, qty: Number(e.target.value)}
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS_CART.REMOVE,
    payload: item
  })

  // const navigate to cart
  const navigateToProductHandler = () => {
    navigate(`/${item.category}/product/${productURL}/about`, {replace: true}) 
  }

  const productImageAndName = (
    <div className='cart__item--image-and-name' aria-label={item.name}> 
      <div className='cart__img'>
        <img 
          onClick={navigateToProductHandler}
          src={img} 
          alt={item.name} 
        />
      </div>
      <span 
        className='cart-item__product-name'
        onClick={navigateToProductHandler}
      >{item.name}</span>
    </div>
  )

  const productSingleUnitPrice = (
    <div className='cart__item--price' aria-label='Price Per Item'>
      <span> 
        {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
      </span>
    </div>
  )

  const selectOrderQuantity = (
    <div className='cart__item--select-quantity'>
      <select 
        name='itemQty' 
        id='itemQty'
        className='button--select-quantity'
        value={item.qty}
        aria-label='Item Quantity'
        onChange={onChangeQty}
      > {options} </select>
    </div>
  )

  const subtotalPrice = (
    <div className='cart__item-subtotal' aria-label='line Item Subtotal'>
      <span> {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)} </span>
    </div>
  )

  const removeProductFromCart = (
    <div className='cart__item-remove' aria-label='line Item Subtotal'>
      <button 
        className='button--remove-from-cart'
        aria-label='Remove Item From Cart'
        title='Remove Item From Cart'
        onClick={onRemoveFromCart}
      > 
        <RemoveIcon height='30px' width='30px'/>
      </button>
    </div>
  )

  return (
    <li className='cart__item'>
      {productImageAndName}
      {productSingleUnitPrice}
      {selectOrderQuantity}
      {subtotalPrice}
      {removeProductFromCart}
    </li>
  )
}

// comparing props to make sure they are the same: prevItem === nextItem ? no rerender : rerender
function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}:PropsType )  {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  } )
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)
export default MemoizedCartLineItem