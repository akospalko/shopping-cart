// Displayed product card
import {ReactElement, memo, useRef} from 'react'
import { CSSTransition } from 'react-transition-group'
import {ProductItemType} from '../types/productsProviderTypes'
import {useNavigate} from 'react-router-dom'
import useCart from '../hooks/useCart'
import {useIsItemInCart} from '../hooks/useIsItemInCart'
import {useConvertStringToURLFormat} from '../hooks/useConvertStringToURLFormat'
import useCartProductHandler from '../hooks/useCartProductHandler'
import './ProductCard.css'
import useProductPriceElement from '../hooks/useProductPriceElement'
import useProductStockElement from '../hooks/useProductStockElement'
import ProductInCartLabel from './ProductInCartLabel'

// TYPE
type ProductCardPropsType = {
  product: ProductItemType,    
}

// CONSTANT
const CONSTANT = {
  ADD_TO_CART: 'add to cart',
  REMOVE_FROM_CART: 'remove from cart',
  IN_CART: 'in cart',
}

// COMPONET
const ProductCard = ({product}:ProductCardPropsType): ReactElement => {
  // ROUTE
  const navigate = useNavigate();

  // REF
  const inCartLabelRef = useRef<HTMLDivElement | null>(null);

  // CONTEXT
  const {cart} = useCart();
  
  // CUSTOM HOOKS
  const isInCart = useIsItemInCart(cart, product);
  const productURL = useConvertStringToURLFormat(product.name + '-' + product.sku);
  const {addToCartHandler, removeFromCartHandler} = useCartProductHandler(); // toggle cart prouct handlers
  const productPriceElement = useProductPriceElement();
  const productStockeElement = useProductStockElement();

  // MISC
  // Image
  const img:string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  // HANDLER
  // navigate to product view route
  const viewProductHandler = () => {
    navigate(`/${product.category}/product/${productURL}/about`, {replace: true}) 
  }

  // ELEMENTS
  // Info group about product 
  const productInfoGroup = (
    <div className='product-card__info-group'> 
      {productPriceElement(product, {priceMainStyle: 'product-card__price-main', priceSecondaryStyle: 'product-card__price-secondary'})}
      {productStockeElement(product?.stock, 'about-product__stock')}
    </div>
  )

  // Add/remove product button container  
  const toggleProductInCart = (
    <div className='product-card__button'>
      <button 
        className='button--product-card-add-to-cart'
        onClick={isInCart ? () => removeFromCartHandler(product): () => addToCartHandler(product)}
        disabled={!product?.stock}
      > { isInCart ? CONSTANT.REMOVE_FROM_CART : CONSTANT.ADD_TO_CART}</button>
    </div>
  )

  // Product in cart label - animated  
  const InCartLabel = (
    <CSSTransition
    in={isInCart}
    nodeRef={inCartLabelRef}
    timeout={300}
    classNames="slide-right-to-left"
    unmountOnExit
  > 
    <ProductInCartLabel ref={inCartLabelRef} style='product-in-cart-label--right'/>
  </CSSTransition>
  )

  return (
    <article className='product'>
      <img 
        src={img} 
        title={product.name} 
        alt={product.name} 
        className='product__image'
        onClick={viewProductHandler}
      />
      <h3 
        title={product.name} 
        className='product-card__header--3'
        onClick={viewProductHandler}
      > {product.name} </h3>
      {productInfoGroup}
      {toggleProductInCart}
      {InCartLabel}
    </article>
  )
}

// MEMO
function areProductsEqual(
  {product: prevProduct}: ProductCardPropsType, 
  {product: nextProduct}: ProductCardPropsType
) {
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductItemType] === nextProduct[key as keyof ProductItemType]
    }) 
  )
}

const MemoizedProduct = memo<typeof ProductCard>(ProductCard, areProductsEqual);

export default MemoizedProduct