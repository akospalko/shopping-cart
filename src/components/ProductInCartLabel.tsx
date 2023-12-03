// Reusable label to indicate products placed inside the cart 
import { forwardRef } from "react";
import { CheckmarkIcon } from "./SVGComponents";
import textData from "../data/textData.json";
import "./ProductInCartLabel.css";

type ProductInCartLabelType = {
  style: string
}

// COMPONENT
const ProductInCartLabel = forwardRef<HTMLDivElement, ProductInCartLabelType>(({ style }, ref) => {

  // STYLE
  const IconColor = "var(--color-5)";
  const IconSize = "20px";

  return (
    <div 
      className={ `product-in-cart-label ${ style }` }
      ref={ ref || null }
    > 
      <span>{ textData["in-cart"] }</span>
      <CheckmarkIcon 
        fill={ IconColor }
        stroke="transparent" 
        width={ IconSize } height={ IconSize } 
        wrapperCustomStyle={ { "width": "auto" } }
      /> 
    </div> 
  )
})

export default ProductInCartLabel;