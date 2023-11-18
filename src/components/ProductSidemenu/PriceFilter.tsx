// Filter products based on a price range using: min - max input field or price slider 
import { useState, useEffect } from 'react';
import PriceTextInput from './PriceTextInput';
import PriceSlider from './PriceSlider';
import useProducts from '../../hooks/useProducts';
import { ProductItemType } from '../../types/productsProviderTypes';
import { PriceFilterPropsType, PriceValueType } from '../../types/ProductFilterTypes';
import { floatRegEx } from '../../utility/regexPatterns';
import './PriceFilter.css';

// CONSTANTS
const CONSTANTS = {
  'OK': 'OK',
  'PRICE': 'Price'
}

// COMPONENT
const PriceFilter = ({ categoryProducts }: PriceFilterPropsType) => {
  // CONTEXTS
  const { dispatch, REDUCER_ACTIONS_PRODUCT } = useProducts();

  // INITIALIZERS
  const PriceFilterInitializer = { minValue: '', maxValue: '' } 

  // STATES
  const [sliderValue, setSliderValue] = useState<PriceValueType>(PriceFilterInitializer);
  const [inputValue, setInputValue] = useState<PriceValueType>(PriceFilterInitializer);
  const [priceRange, setPriceRange] = useState<PriceValueType>(PriceFilterInitializer);

  // EFFECTS
  // Update slider values when price range changes (when product changes) 
  useEffect(() => {
    setSliderValue({ minValue: priceRange.minValue,  maxValue: priceRange.maxValue });
    setInputValue({ minValue: priceRange.minValue, maxValue: priceRange.maxValue });
  }, [priceRange]);

  // Calculate the price ranges
  useEffect(() => {
    // map product prices
    const productPrices: number[] = categoryProducts.map((product: ProductItemType) => {
      const activePrice = 'discountPrice' in product && product.priceDiscount !== undefined ? product.priceDiscount : product.price;
      return activePrice;
    });
    
    // determine the min and max prices
    const minValue = productPrices.length ? Math.min(...productPrices).toString() : '0';
    const maxValue = productPrices.length ? Math.max(...productPrices).toString() : '0';
    
    // set the price range state
    setPriceRange({ minValue, maxValue });
  }, [categoryProducts]);

  // VALIDATION
  // Check if string input is a valid number
  const isInputFieldValid = (minValue: string, maxValue: string): boolean => {
    if(!minValue.length || !maxValue.length) return false;
    return floatRegEx.test(minValue) && floatRegEx.test(maxValue) && (parseFloat(minValue) < parseFloat(maxValue));
  }
  
  // HANDLER
  // Search product between the min - max price range 
  const filterProductsByPriceHandler = (): void => {
    const inputFieldValidity = isInputFieldValid(inputValue.minValue, inputValue.maxValue);
    const areValuesSynchronized = sliderValue.minValue === inputValue.minValue && sliderValue.maxValue === inputValue.maxValue;

    if (inputFieldValidity && !areValuesSynchronized) {
      const conditionalMinValue = Math.min(
        Math.max(parseFloat(inputValue.minValue), parseFloat(priceRange.minValue)),
        parseFloat(priceRange.maxValue)
      ).toString();

      const conditionalMaxValue = Math.min(parseFloat(inputValue.maxValue), parseFloat(priceRange.maxValue)).toString();

      setSliderValue((value) => ({ ...value, minValue: conditionalMinValue, maxValue: conditionalMaxValue }));
      setInputValue((value) => ({ ...value, minValue: conditionalMinValue, maxValue: conditionalMaxValue }));
    }

    const filteredCategoryProducts = categoryProducts?.filter((item: ProductItemType) => {
      const activePrice = item.priceDiscount || item.price; // use discount price if available
      return activePrice >= parseFloat(inputValue.minValue) && activePrice <= parseFloat(inputValue.maxValue);
    });

    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, payload: { categoryProducts: filteredCategoryProducts } });
  };

  return (
    <div className='price-filter'>
      <span className='price-filter__title'> { CONSTANTS.PRICE } </span>
      <div className='price-filter__group-1'>
        <PriceTextInput
          inputValue={ inputValue }
          setInputValue={ setInputValue }
          />
        <div className='price-filter__button-container'>
          <button
            className='button--price-filter'
            disabled={ !isInputFieldValid(inputValue.minValue, inputValue.maxValue) }
            onClick={ filterProductsByPriceHandler }
            > { CONSTANTS.OK }
          </button>
        </div>
      </div>
      <PriceSlider
        sliderValue={ sliderValue }
        setSliderValue={ setSliderValue }
        setInputValue={ setInputValue }
        priceRange={ priceRange }
        withDisplayedValues
      /> 
    </div>
  );
};

export default PriceFilter;