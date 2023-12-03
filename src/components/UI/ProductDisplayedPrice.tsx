// Display product price
import { ReactElement, ReactNode } from "react";
import { ProductItemType } from "../../types/productsProviderTypes";
import textData from "../../data/textData.json";

// TYPE
type CustomStyleType = {
  priceMainStyle: string;
  priceSecondaryStyle: string;
};

const ProductDisplayedPrice = ({ product, customStyle }: { product: ProductItemType; customStyle: CustomStyleType }): ReactElement | null => {
  if (!product) {
    return null; 
  }

  const displayFormattedPrice = (price: number | undefined): string | ReactNode => {
    if (!price) return "";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
  };

  const convertedPriceOriginal = displayFormattedPrice(product?.price);
  const convertedPriceDiscount = displayFormattedPrice(product?.priceDiscount);

  if (!product.stock) {
    return <span className={ customStyle.priceMainStyle }>{ textData["product-out-of-stock"] }</span>;
  }

  if (product.price && product?.priceDiscount) {
    return (
      <>
        <span className={ customStyle.priceSecondaryStyle }>{ convertedPriceOriginal }</span>
        <span className={ customStyle.priceMainStyle }>{ convertedPriceDiscount }</span>
      </>
    );
  }

  if (product.price) {
    return (
      <span className={ customStyle?.priceMainStyle } title={ convertedPriceOriginal ? convertedPriceOriginal.toString() : undefined }>
        { convertedPriceOriginal }{" "}
      </span>
    );
  }

  if (product?.priceDiscount) {
    return (
      <span className={ customStyle.priceMainStyle } title={ convertedPriceDiscount ? convertedPriceDiscount.toString() : undefined }>
        { convertedPriceDiscount }
      </span>
    );
  }

  return null;
};

export default ProductDisplayedPrice;