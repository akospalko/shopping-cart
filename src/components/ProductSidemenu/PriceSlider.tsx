// Price slider with min - max range
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef
} from 'react';
import './PriceSlider.css';

// TYPE
type PriceSliderPropsTypes = {
  minValue: string,
  maxValue: string,
  minInitialValue: string,
  maxInitialValue: string,
  setMinValue: React.Dispatch<React.SetStateAction<string>>,
  setMaxValue: React.Dispatch<React.SetStateAction<string>>,
  setInputMinValue: React.Dispatch<React.SetStateAction<string>> 
  setInputMaxValue: React.Dispatch<React.SetStateAction<string>> 
}

// REGEX PATTERN
const integerRegEx = /^\d+$/;

// COMPONENT
const PriceSlider = ({
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    minInitialValue,
    maxInitialValue,
    setInputMinValue,
    setInputMaxValue
  }: PriceSliderPropsTypes) => {
  
  // REFs
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // MISC
  // Convert to percentage
  const getPercent = useCallback((value: number) => {
      // check data validity
      if(!integerRegEx.test(minInitialValue) && !integerRegEx.test(maxInitialValue)) return;
      // convert used props to numbers
      const minInitial = parseInt(minInitialValue)
      const maxInitial = parseInt(maxInitialValue)
      // check if min - max are valid integers
      return Math.round(((value - minInitial) / (maxInitial - minInitial)) * 100) || 0
    },
    [minInitialValue, maxInitialValue]
  );

  // EFFECTS
  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current && maxValRef.current.value !== undefined) {
      if (!integerRegEx.test(minValue)) return;
      const min = parseInt(minValue);
      const max = parseInt(maxValRef.current.value || '1');
      const minPercent = getPercent(min) || 0; // Provide a default value (0 in this case)
      const maxPercent = getPercent(max) || 1; // Provide a default value (100 in this case)
      const calculatedRangeWidth = maxPercent - minPercent;

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${calculatedRangeWidth}%`;
      }
    }
  }, [minValue, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current && minValRef.current.value !== undefined) {
      if (!integerRegEx.test(minValue)) return;
      const min = parseInt(minValRef.current.value || '0');
      const max = parseInt(maxValue)
      const minPercent = getPercent(min) || 0;
      const maxPercent = getPercent(max) || 1;
      const calculatedRangeWidth = maxPercent - minPercent;
      
      if (range.current) {
        range.current.style.width = `${calculatedRangeWidth}%`;
      }
    }
  }, [maxValue, getPercent, minValue]);

  return (
    <div className='container'>
      <input
        type='range'
        min={minInitialValue}
        max={maxInitialValue}
        value={minValue}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, parseInt(maxValue) - 1);
          setMinValue(value.toString());
          setInputMinValue(value.toString());

          event.target.value = value.toString();
        }}
        className={`thumb thumb--zindex-3 ${parseInt(minValue) > (parseInt(maxInitialValue) - 100) ? 'thumb--zindex-5' : ''}`}
      />
      <input
        type='range'
        min={minInitialValue + 1}
        max={maxInitialValue}
        value={maxValue}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, parseInt(minValue) + 1);
          setMaxValue(value.toString());
          setInputMaxValue(value.toString());
          event.target.value = value.toString();
        }}
        className='thumb thumb--zindex-4'
      />
      <div className='slider'>
        <div className='slider__track'></div>
        <div ref={range} className='slider__range'></div>
        <div className='slider__left-value'>{minValue}</div>
        <div className='slider__right-value'>{maxValue}</div>
      </div>
    </div>
  );
};

export default PriceSlider;