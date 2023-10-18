// TODO: implement image viewer and carousel logic 
// Display about tab image 
import {useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {ProductItemType} from '../types/productsProviderTypes'
import './ProductView.css'
import './AboutTabProductImage.css'
import {useIsItemInCart} from '../hooks/useIsItemInCart'
import useCart from '../hooks/useCart'
import ProductInCartLabel from './ProductInCartLabel'

// TYPE
type AboutTabPropsType = {
  activeProduct: ProductItemType,
}

// COMPONENT
const AboutTabProductImage = ({activeProduct}: AboutTabPropsType) => {
  // REF
  const inCartLabelRef = useRef<HTMLDivElement | null>(null);

  // CONTEXT
  const {cart} = useCart();

  // HOOKS
  const isInCart = useIsItemInCart(cart, activeProduct);

  // ELEMENTS
  // Product image
  const img:string =  new URL(`../images/${activeProduct?.sku}.jpg`, import.meta.url).href
  
  return (
    <div className='about-tab-product-image'>
      <img 
        className='about-tab-product-image__image' 
        src={img}
      />
        <CSSTransition
          in={isInCart}
          nodeRef={inCartLabelRef}
          timeout={300}
          classNames="slide-left-to-right"
          unmountOnExit
      > 
        <ProductInCartLabel ref={inCartLabelRef} style='product-in-cart-label--left'/>
      </CSSTransition>
    </div>
  )
}

export default AboutTabProductImage