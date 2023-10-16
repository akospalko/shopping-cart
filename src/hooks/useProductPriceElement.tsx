// Display product price
import {ReactElement, ReactNode} from 'react'
import {ProductItemType} from "../types/productsProviderTypes"

// TYPE
type DisplayedPriceDestructuredParams = {
  stock: number, 
  price: number, 
  priceDiscount?: number
}
type CustomStyleType = {
  priceMainStyle: string,
  priceSecondaryStyle: string,
}

// CONSTANT
const CONSTANT = {
  STOCK_OUT_OF_STOCK: 'Out of stock'
}

// CUSTOM HOOK
const useProductDisplayedPrice = () => {
  // Util function to display formatted price
  const displayFormattedPrice = (price: number | undefined): string | ReactNode => {
    if(!price) return;
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price)
  }

  // Display prices: main (larger font) and secondary (smaller font, line-through)
  const displayedPrice = (product: ProductItemType, customStyle: CustomStyleType) : ReactElement | undefined => {
    if(!product) return;

    const {stock, price, priceDiscount}:DisplayedPriceDestructuredParams = product;
    let priceElement;
    const convertedPriceOriginal = displayFormattedPrice(price);
    const convertedPriceDiscount = displayFormattedPrice(priceDiscount);
    
    if(!stock) {
      priceElement = <span className={customStyle.priceMainStyle}>{CONSTANT.STOCK_OUT_OF_STOCK}</span>
    } else if(price && priceDiscount) {
      priceElement = (
        <>
          <span className={customStyle.priceSecondaryStyle}>{convertedPriceOriginal}</span>
          <span className={customStyle.priceMainStyle}>{convertedPriceDiscount}</span>
        </>
      )
    } else if(price) {
      priceElement = <span 
      className={customStyle.priceMainStyle}
      title={convertedPriceOriginal ? convertedPriceOriginal.toString() : undefined}
      >{convertedPriceOriginal} </span>
    } else if(priceDiscount) {
      priceElement = <span 
        className={customStyle.priceMainStyle}
        title={convertedPriceDiscount ? convertedPriceDiscount.toString() : undefined}
      >{convertedPriceDiscount}</span>
    }
    return priceElement
  }

  return displayedPrice
}

export default useProductDisplayedPrice