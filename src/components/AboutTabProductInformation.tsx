// Display about tab prodcut information
import {useNavigate} from 'react-router-dom'
import {ProductItemType} from '../types/productsProviderTypes'
import useCart from '../hooks/useCart'
import {useIsItemInCart} from '../hooks/useIsItemInCart'
import useCartProductHandler from '../hooks/useCartProductHandler'
import useProductPriceElement from '../hooks/useProductPriceElement'
import useProductStockElement from '../hooks/useProductStockElement'
import './AboutTabProductInformation.css'

// CONSTANT
const CONSTANT = {
  ADD_TO_CART: 'add to cart',
  REMOVE_FROM_CART: 'remove from cart',
  ORDER: 'order',
  RETAILER: 'retailer',
  DELIVERY: 'delivery',
  DELIVERY_TIME: '1-2 days',
  WARRANTY: 'warranty',
}

// TYPE
type AboutTabPropsType = {
  activeProduct: ProductItemType,
}

type RetailerInfoType = {
  [key: string]: string
}

// COMPONENT
const AboutTabProductInformation = ({activeProduct}: AboutTabPropsType) => {
  // ROUTE
  const navigate = useNavigate();

  // CONTEXT
  const {cart} = useCart();

  // HOOK
  const isInCart = useIsItemInCart(cart, activeProduct);
  const productPriceElement = useProductPriceElement();
  const productStockElement = useProductStockElement();
  const {addToCartHandler, removeFromCartHandler} = useCartProductHandler();

  // HANDLER
  const cartToggleHandler = (): void => {
    if (isInCart) {
      removeFromCartHandler(activeProduct);
    } else {
      addToCartHandler(activeProduct);
    }
  }

  // ELEMENTS
  // Product name
  const productName = (
    <div className='about-tab__product-title'>
      <div className='about-tab__product-title-name'>
        <h2>{activeProduct?.name}</h2>
      </div>
      <div className='about-tab__product-title-description'>
        <h3>{activeProduct?.description}</h3>
      </div>
    </div>
  )

  // Retailer information: retailer, warranty, delivery
  // information data
  const retailerInformationData: RetailerInfoType = {
    [CONSTANT.RETAILER]: activeProduct?.retailer,
    [CONSTANT.DELIVERY]: CONSTANT.DELIVERY,
    [CONSTANT.WARRANTY]: activeProduct?.warranty
  }

  // rendered information 
  const retailerInformation = (
    <table className='about-tab__retailer-information'>
      <tbody>
        {Object.keys(retailerInformationData).map(key => {
          if(!retailerInformationData[key]) return;
          return (
            <tr key={key}>
              <td className='about-tab__retailer-information-title'>{key}</td>
              <td className='about-tab__retailer-information-data'>{retailerInformationData[key]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  // Product Price: price, stock
  const productPrice = (
    <div className="about-tab__product-price">
      {productPriceElement(activeProduct, {priceMainStyle: 'about-tab__product-price-main', priceSecondaryStyle: 'about-tab__product-price-secondary'})}
      {productStockElement(activeProduct?.stock, 'about-tab__product-stock')}
    </div>
  )

  // buttons container: add/remove cart item, order
  const buttonsContainer = (
    <div className='about-tab__buttons'> 
      <button 
        className='button--about-tab-add-to-cart'
        onClick={cartToggleHandler}
        disabled={!activeProduct?.stock}
      > {isInCart ? CONSTANT.REMOVE_FROM_CART : CONSTANT.ADD_TO_CART}</button>
      <button 
        className='button--about-tab-product-order'
        onClick={() => navigate('/cart')}
        disabled={!isInCart || !activeProduct?.stock}
      > {CONSTANT.ORDER}
      </button>
    </div>
  )

  return (
    <div className='about-tab-product-information'>
      {/* product title: name, description */}
      {productName}
      {/* retailer information: retailer, warranty, delivery */}
      {retailerInformation}
      {/* Product Price: price, stock */}
      {productPrice}
      {/* Buttons container: add/remove cart item, order */}
      {buttonsContainer}
    </div>
  )
}

export default AboutTabProductInformation