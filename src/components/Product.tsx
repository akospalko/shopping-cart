import React, { ReactElement, memo } from 'react'
import { ProductItemType } from '../types/productsProviderTypes'
import { ReducerActionType, ReducerAction } from '../types/cartProviderTypes'
import { MinusIcon, PlusIcon, CheckmarkIcon } from './SVGComponents'
import './Product.css'

// TYPE
type PropsType = {
  product: ProductItemType,    
  inCartQty: number | undefined,
  dispatch: React.Dispatch<ReducerAction>  
  REDUCER_ACTIONS_CART: ReducerActionType
  inCart: boolean
}

// COMPONET
const Product = ({ product, inCartQty = 0, dispatch, REDUCER_ACTIONS_CART, inCart }:PropsType): ReactElement => {
  
  // VALUES
  const img:string =  new URL(`../images/${product.sku}.jpg`, import.meta.url).href
  
  // HANDLERS
  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS_CART.ADD, payload: {...product, qty: 1}})
  const onRemoveSingleFromCart = () => {
    if (inCartQty > 1) {
      dispatch({type: REDUCER_ACTIONS_CART.UPDATE_QUANTITY, payload: {...product, qty: inCartQty - 1 }});
    } else if (inCartQty === 1) {
      dispatch({type: REDUCER_ACTIONS_CART.REMOVE, payload: {...product, qty: 0}})
    }
  }

  // ELEMENTS
  const itemInCart = inCart ? 
    <div className='product__info-in-cart'> 
      <span> {inCartQty} {'in cart'}  </span>
      <CheckmarkIcon width='20px' height='20px' wrapperCustomStyle={{'width': 'auto'}}/>
    </div> 
    : null

  const productInfo = (
    <div className='product__info'> 
      <span className='product__info-price'>
        {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)} 
      </span>
      {itemInCart}
    </div>
  )

  const addOrRemoveProductButtons = (
    <>
      <button 
        className='button--add-remove-single-product'
        onClick={onAddToCart}
      > {<PlusIcon width='20px' height='20px' strokeWidth='0' fill='var(--color--light)'/>}
      </button>
      <button 
        className='button--add-remove-single-product'
        disabled={inCartQty < 1}
        onClick={onRemoveSingleFromCart}
        > <MinusIcon width='20px' height='20px' fill='var(--color--light)' strokeWidth='0'/>
      </button>
    </>
  )

  return (
    <article className='product'>
      <img src={img} alt={product.name} className='product__img'/>
      <h3 className='product__header--3'> {product.name} </h3>
      {productInfo}
      {addOrRemoveProductButtons}
    </article>
  )
}

// MEMO
function areProductsEqual({product: prevProduct, inCart: prevInCart, inCartQty: prevInCartQty}: PropsType, {product: nextProduct, inCart: nextInCart, inCartQty: nextInCartQty}: PropsType) {
 
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductItemType] === nextProduct[key as keyof ProductItemType]
    }) 
    && prevInCart === nextInCart
    && prevInCartQty === nextInCartQty
  )
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct