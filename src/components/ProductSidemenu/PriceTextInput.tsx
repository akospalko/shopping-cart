// Filter by price min and max input fields with update logic
import React, { ReactElement } from 'react';
import { PriceTextInputPropsType } from '../../types/ProductFilterTypes';
import './PriceTextInput.css';

// CONSTANTS
const CONSTANTS = { 
  DASH: '-'
 }

// COMPONENT
const PriceTextInput = ({
  inputValue,
  setInputValue
}: PriceTextInputPropsType) => {

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
    <div className='price-filter__text-input'>
      {/* Input min */}
      {displayedInputField(parseInt(inputValue.minValue).toString(), changeMinValueHandler, 'text') }
      <span> { CONSTANTS.DASH } </span>
      {/* Input max */}
      {displayedInputField(parseInt(inputValue.maxValue).toString(), changeMaxValueHandler, 'text') }
    </div>
  )
}

export default PriceTextInput;