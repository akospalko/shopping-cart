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
  // Convert to percentage
  const getPercent = useCallback((value: number) => {
      // check data validity
      if(!floatRegEx.test(priceRange.minValue) && !floatRegEx.test(priceRange.maxValue)) return;
      // convert used props to numbers
      const minInitial = parseFloat(priceRange.minValue);
      const maxInitial = parseFloat(priceRange.maxValue);
      // check if min - max are valid integers
      return Math.round(((value - minInitial) / (maxInitial - minInitial)) * 100) || 0;
    }, [priceRange.maxValue, priceRange.minValue]
  );

  // EFFECTS
  // Update left side range width
  useEffect(() => {
    if (maxValRef.current && maxValRef.current.value !== undefined) {
      if (!floatRegEx.test(sliderValue.minValue)) return;
      const min = parseFloat(sliderValue.minValue);
      const max = parseFloat(maxValRef.current.value);
      const minPercent = getPercent(min) || 0; 
      const maxPercent = getPercent(max) || 100;
      const calculatedRangeWidth = maxPercent - minPercent;
      if (range.current) {
        range.current.style.left = `${ minPercent }%`;
        range.current.style.width = `${ calculatedRangeWidth }%`;
      }
    }
  }, [sliderValue.minValue, getPercent]);

  // Update right side range width
  useEffect(() => {
    if (minValRef.current && minValRef.current.value !== undefined) {
      if (!floatRegEx.test(sliderValue.minValue)) return;
      const min = parseFloat(minValRef.current.value);
      const max = parseFloat(sliderValue.maxValue)
      const minPercent = getPercent(min) || 0;
      const maxPercent = getPercent(max) || 100;
      const calculatedRangeWidth = maxPercent - minPercent;
      if (range.current) {
        range.current.style.width = `${ calculatedRangeWidth }%`;
      }
    }
  }, [getPercent, sliderValue.maxValue, sliderValue.minValue]);

  // HANDLERS
  const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>, valueToUpdate: SliderValueType): void => {
    const currentValue = parseFloat(event.target.value);
    const minValue = parseFloat(sliderValue.minValue);
    const maxValue = parseFloat(sliderValue.maxValue);

    let getValue: string = '';
  
    if (valueToUpdate === 'minValue') {
      getValue = Math.min(currentValue, maxValue - 1).toString();
    } else if (valueToUpdate === 'maxValue') {
      getValue = Math.max(currentValue, minValue + 1).toString();
    }
  
    setSliderValue(value => ({
      ...value, [valueToUpdate]: getValue
    }));
  
    setInputValue(value => ({
      ...value, [valueToUpdate]: getValue
    }));
    event.target.value = getValue;
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