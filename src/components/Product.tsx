import React, { ReactElement, memo } from 'react'
import { ProductType } from '../context/ProductsProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'
import { MinusIcon, PlusIcon, CheckmarkIcon } from './SVGComponents'

type PropsType = {
  product: ProductType,    
  inCartQty: number | undefined,
  dispatch: React.Dispatch<ReducerAction>  
  REDUCER_ACTIONS: ReducerActionType
  inCart: boolean
}

const Product = ({ product, inCartQty = 0, dispatch, REDUCER_ACTIONS, inCart }:PropsType): ReactElement => {
  const img:string =  new URL(`../images/${product.sku}.jpg`, import.meta.url).href
  
  const itemInCart = inCart ? 
  <div className='product__info'> 
    <span> {inCartQty} {'in cart'}  </span>
    <CheckmarkIcon width='25px' height='25px' wrapperCustomStyle={{"width": "auto"}}/>
  </div> 
  : null

  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})

  const onRemoveSingleFromCart = () => {
    if (inCartQty > 1) {
      dispatch({type: REDUCER_ACTIONS.QUANTITY, payload: {...product, qty: inCartQty - 1 }});
    } else if (inCartQty === 1) {
      dispatch({type: REDUCER_ACTIONS.REMOVE, payload: {...product, qty: 0}})
    }
  }

  const content = 
  <article className="product">
    <h3 className="product__header"> {product.name} </h3>
    <img src={img} alt={product.name} className="product__img"/>

    <div className='product__price'> 
      <span>
        {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)} 
      </span>
      <span> {itemInCart} </span>
    </div>
    <button 
      className='button--add-remove-single-product'
      onClick={onAddToCart}
    > {<PlusIcon width='25px' height='25px' strokeWidth='0' fill='var(--color--light)'/>}
    </button>
    <button 
      className='button--add-remove-single-product'
      disabled={inCartQty < 1}
      onClick={onRemoveSingleFromCart}
    > <MinusIcon width='25px' height='25px' fill='var(--color--light)' strokeWidth='0'/>
    </button>
  </article>
 
 return content
}

function areProductsEqual({product: prevProduct, inCart: prevInCart, inCartQty: prevInCartQty}: PropsType, {product: nextProduct, inCart: nextInCart, inCartQty: nextInCartQty}: PropsType) {
 
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) 
    && prevInCart === nextInCart
    && prevInCartQty === nextInCartQty
  )
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct