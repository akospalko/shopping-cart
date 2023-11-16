// Filter by price min and max input fields with update logic
import React, { ReactElement } from 'react';

// TYPES
type PriceValueType = { minValue: string, maxValue: string }
type PriceSliderPropsTypes = {
  inputValue: PriceValueType
  setInputValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
}

// COMPONENT
const PriceInput = ({
  inputValue,
  setInputValue
}: PriceSliderPropsTypes) => {

  // HANDLERS
  const changeMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(value => ({...value, minValue: inputValue}));
  }
  
  const changeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(value => ({...value, maxValue: inputValue}));
  }

  // ELEMENTS
  const displayedInputField = (value: string, handler: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string='text'): ReactElement=> (
    <input
      type={ type }
      value={ value }
      onChange={ handler }
    />
  )

  return (
    <div>
      {/* Input min */}
      {displayedInputField(inputValue.minValue, changeMinValueHandler, 'text') }
      {/* Input max */}
      {displayedInputField(inputValue.maxValue, changeMaxValueHandler, 'text') }
    </div>
  )
}

export default PriceInput;