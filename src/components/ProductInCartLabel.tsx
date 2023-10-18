// Reusable label to indicate products placed inside the cart 
import {forwardRef} from 'react'
import { CheckmarkIcon } from './SVGComponents'
import './ProductInCartLabel.css'

// CONSTANT
const CONSTANT = {
  IN_CART: 'in cart',
}

type ProductInCartLabelType = {
  style: string
}

// COMPONENT
const ProductInCartLabel = forwardRef<HTMLDivElement, ProductInCartLabelType>(({style}, ref) => {

  return (
    <div 
      className={`product-in-cart-label ${style}`}
      ref={ref || null}
    > 
      <span>{CONSTANT.IN_CART}</span>
      <CheckmarkIcon 
        fill='var(--color-5)' 
        stroke='transparent' 
        width='20px' height='20px' 
        wrapperCustomStyle={{'width': 'auto'}}
      /> 
    </div> 
  )
})

export default ProductInCartLabel