// Filter products based on a price range using: min - max input field or price slider 
import { useEffect } from "react";
import { ProductItemType } from "../../types/productsProviderTypes";
import { PriceFilterPropsType } from "../../types/ProductFilterTypes";
import Slider from "./Slider";
import { priceFilterStateInitializer } from "../../utility/constants";
import useFilter from "../../hooks/useFilter";
import textData from "../../data/textData.json";
import "./PriceFilter.css";

// COMPONENT
const PriceFilter = ({ categoryProducts }: PriceFilterPropsType) => {
  // CONTEXT
  const {
    priceFilterSlider, setPriceFilterSlider, 
    priceFilterRange, setPriceFilterRange
  } = useFilter();

  // HOOK
   useEffect(() => {
    if (!categoryProducts.length) return;

    const calculatePriceRanges = (): void => {
      const productPrices: number[] = categoryProducts.map((product: ProductItemType) => {
        const activePrice = product.priceDiscount !== undefined ? product.priceDiscount : product.price;
        return activePrice;
      });
  
      const minPriceRange = productPrices.length ? Math.floor(Math.min(...productPrices)) : priceFilterStateInitializer.min;
      const maxPriceRange = productPrices.length ? Math.ceil(Math.max(...productPrices)) + 10 : priceFilterStateInitializer.max;
      
      if (
        minPriceRange !== priceFilterRange[0] ||
        maxPriceRange !== priceFilterRange[1]
      ) {
        setPriceFilterRange([minPriceRange, maxPriceRange]); 
        setPriceFilterSlider([minPriceRange, maxPriceRange]);
      }
    };
    try {
      calculatePriceRanges();
    } catch(error) {
      console.log(error);
    }
  }, [categoryProducts, priceFilterRange, setPriceFilterRange, setPriceFilterSlider]);

  return (
    <div className={ `price-filter ${ !categoryProducts.length ? "price-filter--disabled" : "" }` }>
      <h3 className="product-sidemenu__subtitle"> { textData["price"] } </h3>
        <div className="price-filter__values-container"> 
          <span className="price-filter__value">{ priceFilterSlider[0] }</span>
          <span className="price-filter__divider">{ ("-").trim() }</span>
          <span className="price-filter__value">{ priceFilterSlider[1] }</span>  
        </div>
      <Slider disabled={ !categoryProducts.length } />
    </div>
  );
};

export default PriceFilter;