// Displayed product card
import { ReactElement, memo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ProductItemType } from "../types/productsProviderTypes";
import { NavLink, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useIsItemInCart } from "../hooks/useIsItemInCart";
import useCartProductHandler from "../hooks/useCartProductHandler";
import { useConvertStringToURLFormat } from "../hooks/useConvertStringToURLFormat";
import ProductStockElement from "./UI/ProductStockElement";
import ProductDisplayedPrice from "./UI/ProductDisplayedPrice";
import ProductRating from "./UI/ProductRating";
import ProductInCartLabel from "./ProductInCartLabel";
import { PRODUCT_VIEW_TAB } from "../utility/constants";
import { getProductViewTabLinkAbout } from "../utility/productView";
import textData from "../data/textData.json";
import "./ProductCard.css";

// TYPES
type ProductCardPropsType = {
  product: ProductItemType,    
}

// COMPONETS
// Product Image
const ProductImage = ({ product }: ProductCardPropsType) => {
  // PROPS
  const { sku, name, category } = product;

  // ROUTE
  const navigate = useNavigate();
 
  // URL
  const productURL = useConvertStringToURLFormat(name + "-" + sku);
  const aboutTabLink: string = getProductViewTabLinkAbout(category, productURL, PRODUCT_VIEW_TAB.ABOUT);
 
  // ELEMENT
  const img: string = new URL(`../images/${ sku }.jpg`, import.meta.url).href;

  return (
    <img
      src={ img }
      title={ name }
      alt={ name }
      className="product__image"
      onClick={ () => navigate(aboutTabLink, { replace: true }) }
    /> 
  )
};

// Product Name
const ProductName = ({ product }: ProductCardPropsType) => {
    // PROPS
    const { name, sku, category } = product;
    
    // URL
    const productURL = useConvertStringToURLFormat(name + "-" + sku);
    const aboutTabLink: string = getProductViewTabLinkAbout(category, productURL, PRODUCT_VIEW_TAB.ABOUT);

  return (
    <NavLink to={ aboutTabLink }>
      <h3 title={ name } className="product-card__header--3">
        { name }
      </h3>
    </NavLink>
  )
}

// Toggle Product In Cart
const ToggleProductInCart = ({ product }: ProductCardPropsType) => {
  // CONTEXT
  const { cart } = useCart();

  // HOOK
  const isInCart = useIsItemInCart(cart, product);
  const { addToCartHandler, removeFromCartHandler } = useCartProductHandler();

  // ELEMENT
  const toggleProductInCartText = isInCart ? textData["remove-from-cart"] : textData["add-to-cart"];

  return (
    <div className="product-card__button">
      <button
        className="button--product-card-add-to-cart"
        onClick={ () => (isInCart ? removeFromCartHandler(product) : addToCartHandler(product)) }
        disabled={ !product?.stock }
      > { toggleProductInCartText }
      </button>
    </div>
  )
}

// Product Rating And Review
const ProductRatingAndReview = ({ product }: ProductCardPropsType) => {
  // PROPS
  const { sku, name, category, calculatedRatingAvg, review } = product;
  
  // URL
  const productURL = useConvertStringToURLFormat(name + "-" + sku);
  const reviewTabLink: string = getProductViewTabLinkAbout(category, productURL, PRODUCT_VIEW_TAB.REVIEW)

  // ELEMENT
  const productReviewText: ReactElement = <> { `(${ (review?.length || 0) } ${ review?.length > 1 ? textData["reviews"] : textData["review"] })` } </>;

  return (
    <div className="product-card__product-rating">
      <ProductRating productRating={ calculatedRatingAvg } readOnly />
      <NavLink to={ reviewTabLink }>{ productReviewText }</NavLink>
    </div>
  )
};

// Animated In Cart Label
const AnimatedInCartLabel = ({ product }: ProductCardPropsType) => {
  // REF
  const inCartLabelRef = useRef<HTMLDivElement | null>(null);
  
  // CONTEXT
  const { cart } = useCart();
  
  // HOOK
  const isInCart = useIsItemInCart(cart, product);

  return (
    <CSSTransition
      in={ isInCart }
      nodeRef={ inCartLabelRef }
      timeout={ 300 }
      classNames="slide-right-to-left"
      unmountOnExit
    >
      <ProductInCartLabel 
        ref={ inCartLabelRef } 
        style="product-in-cart-label--right" 
      />
    </CSSTransition>
  );
};

// Product Card Info Group
const PriceAndStock = ({ product }: ProductCardPropsType) => (
  <div className="product-card__info-group">
    <ProductDisplayedPrice
      product={ product }
      customStyle={{ priceMainStyle: "product-card__price-main", priceSecondaryStyle: "product-card__price-secondary" }}
    />
    <ProductStockElement stock={ product?.stock || 0 } />
  </div>
);

// Prodcut Card
const ProductCard = ({ product }: ProductCardPropsType): ReactElement => (
  <article className="product">
    <ProductImage product={ product } />
    <ProductName  product={ product } />
    <ProductRatingAndReview product={ product } />
    <PriceAndStock product={ product } />
    <ToggleProductInCart  product={ product } />
    <AnimatedInCartLabel product={ product } />
  </article>
)

// MEMO
function areProductsEqual(
  { product: prevProduct }: ProductCardPropsType, 
  { product: nextProduct }: ProductCardPropsType
) {
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductItemType] === nextProduct[key as keyof ProductItemType]
    }) 
  )
}

const MemoizedProductCard = memo<typeof ProductCard>(ProductCard, areProductsEqual);

export default MemoizedProductCard;