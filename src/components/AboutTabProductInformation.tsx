// Display about tab prodcut information
import { useNavigate } from "react-router-dom";
import { ProductItemType } from "../types/productsProviderTypes";
import useCart from "../hooks/useCart";
import { useIsItemInCart } from "../hooks/useIsItemInCart";
import useCartProductHandler from "../hooks/useCartProductHandler";
import ProductDisplayedPrice from "./UI/ProductDisplayedPrice";
import ProductStockElement from "./UI/ProductStockElement";
import textData from "../data/textData.json";
import "./AboutTabProductInformation.css";

// TYPES
type AboutTabPropsType = {
  activeProduct: ProductItemType;
};

type RetailerInfoType = {
  [key: string]: string;
};

// COMPONENT
const AboutTabProductInformation = ({ activeProduct }: AboutTabPropsType) => {
  // ROUTE
  const navigate = useNavigate();

  // CONTEXT
  const { cart } = useCart();

  // HOOK
  const isInCart = useIsItemInCart(cart, activeProduct);
  const { addToCartHandler, removeFromCartHandler } = useCartProductHandler();

  // HANDLER
  const cartToggleHandler = (): void => {
    if (isInCart) {
      removeFromCartHandler(activeProduct);
    } else {
      addToCartHandler(activeProduct);
    }
  };

  // ELEMENT FUNCTIONS
  const renderRetailerInformation = () => {
    const retailerInformationData: RetailerInfoType = {
      [textData["retailer"]]: activeProduct?.retailer,
      [textData["delivery"]]: textData["delivery-time"],
      [textData["warranty"]]: activeProduct?.warranty,
    };

    return (
      <table className="about-tab__retailer-information">
        <tbody>
          { Object.keys(retailerInformationData).map((key) => {
            const value = retailerInformationData[key];
            if (!value) return null;
            return (
              <tr key={ key }>
                <td className="about-tab__retailer-information-title">{ key }</td>
                <td className="about-tab__retailer-information-data">{ value }</td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    );
  };

  const renderButtonsContainer = () => (
    <div className="about-tab__buttons">
      <button
        className="button--about-tab-add-to-cart"
        onClick={ cartToggleHandler }
        disabled={ !activeProduct?.stock }
      >
        { isInCart ? textData["remove-from-cart"] : textData["add-to-cart"] }
      </button>
      <button
        className="button--about-tab-product-order"
        onClick={ () => navigate("/cart") }
        disabled={ !isInCart || !activeProduct?.stock }
      >
        { textData["order"] }
      </button>
    </div>
  );

  return (
    <div className="about-tab-product-information">
      {/* Product title: name, description */}
      <div className="about-tab__product-title">
        <div className="about-tab__product-title-name">
          <h2>{ activeProduct?.name }</h2>
        </div>
        <div className="about-tab__product-title-description">
          <h3>{ activeProduct?.description }</h3>
        </div>
      </div>
      {/* Retailer information: retailer, warranty, delivery */}
      { renderRetailerInformation() }
      {/* Product Price: price, stock */}
      <div className="about-tab__product-price">
        <ProductDisplayedPrice
          product={ activeProduct }
          customStyle={ { priceMainStyle: "about-tab__product-price-main", priceSecondaryStyle: "about-tab__product-price-secondary" } }
        />
        <ProductStockElement stock={ activeProduct?.stock || 0 }/>
      </div>
      {/* Buttons container: add/remove cart item, order */}
      { renderButtonsContainer() }
    </div>
  );
};

export default AboutTabProductInformation;