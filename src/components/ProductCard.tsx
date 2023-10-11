import React, { ReactElement, memo } from 'react'
import { ProductItemType } from '../types/productsProviderTypes'
import { ReducerActionType, ReducerAction } from '../types/cartProviderTypes'
import { MinusIcon, PlusIcon, CheckmarkIcon } from './SVGComponents'
import useProducts from '../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import './ProductCard.css'

// TYPE
type ProductCardPropsType = {
  product: ProductItemType,    
  inCartQty: number | undefined,
  dispatch: React.Dispatch<ReducerAction>  
  REDUCER_ACTIONS_CART: ReducerActionType
  inCart: boolean
}

// COMPONET
const ProductCard = ({ product, inCartQty = 0, dispatch:cartDispatch, REDUCER_ACTIONS_CART, inCart }:ProductCardPropsType): ReactElement => {
  // ROUTE
  const navigate = useNavigate()
  
  // CONTEXT
  const {dispatch: productsDispatch, REDUCER_ACTIONS_PRODUCT} = useProducts();

  // VALUES
  const img:string =  new URL(`../images/${product.sku}.jpg`, import.meta.url).href
  
  // HANDLERS
  const onAddToCart = () => cartDispatch({type: REDUCER_ACTIONS_CART.ADD, payload: {...product, qty: 1}})
  const onRemoveSingleFromCart = () => {
    if (inCartQty > 1) {
      cartDispatch({type: REDUCER_ACTIONS_CART.UPDATE_QUANTITY, payload: {...product, qty: inCartQty - 1 }});
    } else if (inCartQty === 1) {
      cartDispatch({type: REDUCER_ACTIONS_CART.REMOVE, payload: {...product, qty: 0}})
    }
  }

  // convert product name string to url format
  const convertStringToURLFormat = (inputString: string): string =>{
    // replace spaces and special characters with hyphens
    let urlFriendlyString = inputString.replace(/[^a-zA-Z0-9]+/g, '-');
        
    // remove leading and trailing hyphens
    urlFriendlyString = urlFriendlyString.replace(/^-+|-+$/g, '');

    // replace consecutive hyphens with a single hyphen
    urlFriendlyString = urlFriendlyString.replace(/-{2,}/g, '-');

    return urlFriendlyString.toLowerCase();
  }

  // Handle
    const viewProductHandler = () => {
    // set context state with active page id
    productsDispatch({type: REDUCER_ACTIONS_PRODUCT.UPDATE_ACTIVE_PRODUCT_ID, payload: {activeProductID: product.sku}})
    // navigate to product view route
    navigate(`/${product.category}/product/${convertStringToURLFormat(product.name + '-' +product.sku)}/about`, {replace: true}) 
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
      <img 
        src={img} 
        title={product.name} 
        alt={product.name} 
        className='product__img'
        onClick={viewProductHandler}
      />
      <h3 
        className='product__header--3'
        onClick={viewProductHandler}
      > {product.name} </h3>
      {productInfo}
      {addOrRemoveProductButtons}
    </article>
  )
}

// MEMO
function areProductsEqual({product: prevProduct, inCart: prevInCart, inCartQty: prevInCartQty}: ProductCardPropsType, {product: nextProduct, inCart: nextInCart, inCartQty: nextInCartQty}: ProductCardPropsType) {
 
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductItemType] === nextProduct[key as keyof ProductItemType]
    }) 
    && prevInCart === nextInCart
    && prevInCartQty === nextInCartQty
  )
}

const MemoizedProduct = memo<typeof ProductCard>(ProductCard, areProductsEqual);

export default MemoizedProduct