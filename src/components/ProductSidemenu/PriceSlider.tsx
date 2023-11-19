// Price slider UI element with min - max range slider and displayed values
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  ReactElement,
  ChangeEventHandler
} from 'react';
import { SliderValueType, PriceSliderPropsType } from '../../types/ProductFilterTypes';
import { floatRegEx } from '../../utility/regexPatterns';
import './PriceSlider.css';

// COMPONENT
const PriceSlider = ({
    priceRange,
    sliderValue,
    setSliderValue,
    setInputValue,
    withDisplayedValues
  }: PriceSliderPropsType) => {
  
  // REFs
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // CALLBACK
  // Convert price slider values to percentage
  const calculateSliderPercentage = useCallback((inputValue: string, priceMin: string, priceMax: string): number | undefined => {
    // parse to float
    const minPriceParsed = parseFloat(priceMin);
    const maxPriceParsed = parseFloat(priceMax);
    const inputValueParsed = parseFloat(inputValue);
    // calc percentage    
    return Math.round(((inputValueParsed - minPriceParsed) / (maxPriceParsed - minPriceParsed)) * 100) || 0;
  }, []);
  
  // EFFECTS
  // Update left side range width
  useEffect(() => {
    if (maxValRef.current && maxValRef.current.value !== undefined) {
      if (!floatRegEx.test(sliderValue.minValue)) return;
      const min = sliderValue.minValue;
      const max = maxValRef.current.value;
      const minPercentage = calculateSliderPercentage(min, priceRange.minValue, priceRange.maxValue) || 0; 
      const maxPercentage = calculateSliderPercentage(max, priceRange.minValue, priceRange.maxValue) || 100;
      const calculatedRangeWidth = maxPercentage - minPercentage;
      if (range.current) {
        range.current.style.left = `${ minPercentage }%`;
        range.current.style.width = `${ calculatedRangeWidth }%`;
      }
    }
  }, [calculateSliderPercentage, priceRange.maxValue, priceRange.minValue, sliderValue.minValue]);

  // Update right side range width
  useEffect(() => {
    if (minValRef.current && minValRef.current.value !== undefined) {
      if (!floatRegEx.test(sliderValue.minValue)) return;
      const min = minValRef.current.value;
      const max = sliderValue.maxValue;
      const minPercentage = calculateSliderPercentage(min, priceRange.minValue, priceRange.maxValue) || 0; 
      const maxPercentage = calculateSliderPercentage(max, priceRange.minValue, priceRange.maxValue) || 100;
      const calculatedRangeWidth = maxPercentage - minPercentage;
      if (range.current) {
        range.current.style.width = `${ calculatedRangeWidth }%`;
      }
    }
  }, [calculateSliderPercentage, priceRange.maxValue, priceRange.minValue, sliderValue.maxValue, sliderValue.minValue]);

  // HANDLERS
  const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>, valueToUpdate: SliderValueType): void => {
    const currentValue = parseFloat(event.target.value);
    const minValue = parseFloat(sliderValue.minValue);
    const maxValue = parseFloat(sliderValue.maxValue);

    // check which slider to update: min or max
    let updatedValue: string = '';
    if (valueToUpdate === 'minValue') {
      updatedValue = Math.min(currentValue, maxValue - 50).toString();
    } else if (valueToUpdate === 'maxValue') {
      updatedValue = Math.max(currentValue, minValue + 50).toString();
    }
    
    // update slider / text price input 
    setSliderValue(value => ({
      ...value, [valueToUpdate]: updatedValue
    }));
  
    setInputValue(value => ({
      ...value, [valueToUpdate]: updatedValue
    }));
    event.target.value = updatedValue;
  };

  // ELEMENTS
  const displayedSliderValue = (style: string, value: string): ReactElement => (
    <div className={ `price-filter__slider-value ${ style }` }> 
      <span> { value } </span>
    </div>
  )
  
  const displayedSliderRange = (
    minPriceRange: string,
    maxPriceRange: string,
    value: string,
    changeHandler: ChangeEventHandler<HTMLInputElement>,
    style: string,
    inputRef: React.RefObject<HTMLInputElement>
  ): ReactElement => {
    return (
      <input
        type='range'
        min={ minPriceRange || '0' }
        max={ maxPriceRange }
        value={ value || '0' }
        ref={ inputRef }
        onChange={ changeHandler }
        className={ `price-filter__thumb ${ style }` }
      />
    )
  }

  return (
    <div className='price-filter__slider-container'>
      { displayedSliderRange(
          priceRange.minValue, 
          priceRange.maxValue, 
          sliderValue.minValue,
          (event) => sliderChangeHandler(event, 'minValue'), 
          'price-filter__thumb--left',
          minValRef
        )
      }
      { displayedSliderRange(
          (parseFloat(priceRange.minValue) + 1).toString(), 
          priceRange.maxValue, 
          sliderValue.maxValue,
          (event) => sliderChangeHandler(event, 'maxValue'), 
          'price-filter__thumb--right',
          maxValRef
        ) 
      }
      <div className='price-filter__slider'>
        <div className='price-filter__slider-track'></div>
        <div ref={ range } className='price-filter__slider-range'></div>
        { withDisplayedValues && (
          <div className='price-filter__slider-value-container'>
            { displayedSliderValue('price-filter__slider-value--left', sliderValue.minValue) }
            { displayedSliderValue('price-filter__slider-value--right', sliderValue.maxValue) }
          </div> ) 
        }
      </div>
    </div>
  );
};

export default PriceSlider;