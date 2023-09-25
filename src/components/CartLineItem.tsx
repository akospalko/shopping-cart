import React, {ReactElement, ChangeEvent, memo} from 'react'
import { ReducerAction, ReducerActionType, CartItemType } from '../types/cartProviderTypes'
import { RemoveIcon } from './SVGComponents'

type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS_CART: ReducerActionType
}
const CartLineItem = ({item, dispatch, REDUCER_ACTIONS_CART}: PropsType) => {
  
  const img:string =  new URL(`../images/${item.sku}.jpg`, import.meta.url).href
  const lineTotal: number = (item.qty * item.price)
  
  const highestQty: number = 20 > item.qty ? 20 : item.qty // max allowed quantity for an item
  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

  const options: ReactElement[] = optionValues.map(value => {
    return <option 
      key={`opt${value}`} 
      value={value}
    > {value} 
    </option>
  }) 

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(item, e.target.value)
    dispatch({
      type: REDUCER_ACTIONS_CART.UPDATE_QUANTITY,
      payload: {...item, qty: Number(e.target.value)}
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS_CART.REMOVE,
    payload: item
  })

  const content = (
    <li className="cart__item">
      <div className="cart__item--image-and-name" aria-label="Item Name"> 
        <img src={img} alt={item.name} className="cart__img"/>
        <span > {item.name} </span>
      </div>
      <div className="cart__item--price" aria-label="Price Per Item">
        <span> 
          {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
        </span>
        </div>
      <div className='cart__item--select-quantity'>
        <select 
          name="itemQty" 
          id="itemQty"
          className='button--select-quantity'
          value={item.qty}
          aria-label='Item Quantity'
          onChange={onChangeQty}
        > {options} </select>
      </div>
      <div className="cart__item-subtotal" aria-label="line Item Subtotal">
        <span> {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)} </span>
      </div>
      <div className="cart__item-remove" aria-label="line Item Subtotal">
        <button 
          className="button--remove-from-cart"
          aria-label="Remove Item From Cart"
          title="Remove Item From Cart"
          onClick={onRemoveFromCart}
          > 
            <RemoveIcon height='30px' width='30px'/>
          </button>
      </div>
    </li>
  )

  return content
}

// comparing props to make sure they are the same: prevItem === nextItem ? no rerender : rerender
function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}:PropsType )  {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  } )
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)
export default MemoizedCartLineItem