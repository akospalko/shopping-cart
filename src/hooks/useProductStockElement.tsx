// Display product stock with component adjusted styling
import { ReactElement } from 'react'
import '../index.css'

// TYPE
type DisplayedStockType = {
  style: string,
  content: string
}

// CONSTANT
const CONSTANT = {
  STOCK_AVAILABLE: function(stock: number): string { return `In stock: ${stock}`},
  STOCK_AVAILABLE_LOW: function(stock: number): string { return `Last products (${stock})`},
  STOCK_COMING_SOON: 'Fresh stock is coming soon'
}

// CUSTOM HOOK
const useProductStockElement = () => {
  const productStock = (stock: number, style?: string): ReactElement | undefined => {
    if(!stock) return;
    // ELEMENTS
    // Displayed stock
    let displayedStock: DisplayedStockType = {
      style: '',
      content: ''
    };
  
    if (!stock) {
      displayedStock = {
        style: 'product-stock-element__coming-soon',
        content: CONSTANT.STOCK_COMING_SOON
      }
    } else if(stock > 3) {
      displayedStock = {
        style: 'product-stock-element__stock--in-stock',
        content: CONSTANT.STOCK_AVAILABLE(stock)
      } 
    } else if(stock > 0) {
      displayedStock = {
        style: 'product-stock-element__stock--low-stock',
        content: CONSTANT.STOCK_AVAILABLE_LOW(stock)
      } 
    }
      
    return (
      <span 
        title={displayedStock.content}
        className={`product-stock-element__container ${style} ${displayedStock.style}`}>
        {displayedStock.content}
      </span>
    )
  }
    return productStock
}

export default useProductStockElement