// Filter products based on a price range using: min - max input field or price slider 
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import useProducts from "../../hooks/useProducts";
import { ProductItemType } from "../../types/productsProviderTypes";
import { PriceFilterPropsType, PriceRangeAndValueType } from "../../types/ProductFilterTypes";
import Slider from "./Slider";
import textData from "../../data/textData.json";
import { validatePageParam } from "../../utility/validatePageParam";
import "./PriceFilter.css";

// import PriceTextInput from "./PriceTextInput";
// import { floatRegEx } from "../../utility/regexPatterns";

// COMPONENT
const PriceFilter = ({ categoryProducts }: PriceFilterPropsType) => {
  // ROUTE
  const navigate = useNavigate();
  const { category, page } = useParams();
  const pageNumber: number = validatePageParam(page);
  console.log('price filter active page: ', pageNumber)

  // CONTEXTS
  const { dispatch, REDUCER_ACTIONS_PRODUCT } = useProducts();

  // INITIALIZERS
  const MIN = 1;
  const MAX = 100;
  
  // STATES
  const [sliderValues, setSliderValues] = useState<PriceRangeAndValueType>([MIN, MAX]);
  const [priceRange, setPriceRange] = useState<PriceRangeAndValueType>([MIN, MAX]);

  // UTILITY
  // check if user input min and max prices are within the allowed price range
  const isPriceWithinRange = (min: number, max: number): boolean => {
    if(!min || !max || !priceRange[0] || !priceRange[1]) return false;
    return min >= priceRange[0] && max <= priceRange[1]; 
  }

  const filterProductsByPrice = (
    products: ProductItemType[] | undefined,
    min: number,
    max: number
  ): ProductItemType[] => {
    if (!products) {
      return [];
    }
  
    return products.filter((product: ProductItemType) => {
      const activePrice = product.priceDiscount ?? product.price; // use discount price if available
      return activePrice >= min && activePrice <= max;
    });
  };
  
  // HANDLER
  // test slider change handler
  // Search product between the min - max price range 
  const filterByPriceHandler = debounce((min: number, max: number): void => {
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.IS_FILTERING_PRODUCT, payload: { isFilteringProduct: true } });

    // validate slider values
    const areSliderValuesValid = isPriceWithinRange(min, max);
    if(areSliderValuesValid) {
      // filter all products within price ranges 
      const filteredCategoryProducts = filterProductsByPrice(categoryProducts, min, max);
      
      // update store with filtered products
      dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED, payload: { categoryProductsFiltered: filteredCategoryProducts } });

      // nav to route with slider min - max values    
      navigate(`/${ category }/1`);
    }
  }, 300);

  // EFFECTS
  useEffect(() => {
    if (!categoryProducts.length) {
      setPriceRange([0, 0]);
      setSliderValues([0, 100]);
      return;
    }

    const calculatePriceRanges = (): void => {
      const productPrices: number[] = categoryProducts.map((product: ProductItemType) => {
        const activePrice = product.priceDiscount !== undefined ? product.priceDiscount : product.price;
        return activePrice;
      });
  
      const minPriceRange = productPrices.length ? Math.floor(Math.min(...productPrices)) : MIN;
      const maxPriceRange = productPrices.length ? Math.ceil(Math.max(...productPrices)) + 10 : MAX;
      
      setPriceRange([minPriceRange, maxPriceRange]);
      setSliderValues([minPriceRange, maxPriceRange]);
    };

    try {
      calculatePriceRanges();
    } catch(error) {
      console.log(error);
    }
  }, [categoryProducts]);

  return (
    <div className={ `price-filter ${ !categoryProducts.length && "price-filter--disabled" }` }>
      <span className="price-filter__title"> { textData["price"] } </span>
      <div className="price-filter__group-1">
        <div className="price-filter__values-container"> 
          <span className="price-filter__value">{ sliderValues[0] }</span>
          <span className="price-filter__divider">{ ("-").trim() }</span>
          <span className="price-filter__value">{ sliderValues[1] }</span>  
        </div>
        <div className="price-filter__button-container">
          <button
            className="button--price-filter"
            onClick={ () => filterByPriceHandler(sliderValues[0], sliderValues[1]) }
            disabled={ !categoryProducts.length }
         > { textData["ok"] }
          </button>
        </div>
      </div>
      <Slider
        priceValues={ sliderValues }
        priceRange={ priceRange }
        onChange={ setSliderValues }
        disabled={ !categoryProducts.length }
      />
    </div>
  );
};

export default PriceFilter;