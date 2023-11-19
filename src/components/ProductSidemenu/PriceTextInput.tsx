// Filter by price min and max input fields with update logic
import React, { ReactElement } from 'react';
import { PriceTextInputPropsType } from '../../types/ProductFilterTypes';
import './PriceTextInput.css';

// CONSTANTS
const CONSTANTS = { 
  DASH: '-'
}

// COMPONENT
const PriceTextInput = ({ inputValue, setInputValue }: PriceTextInputPropsType) => {
  // HANDLERS
  const changeMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(value => ({...value, minValue: newInputValue}));
  }

  const changeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(value => ({...value, maxValue: newInputValue}));
  }

  // ELEMENTS
  const displayedInputField = (value: string, handler: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string='text'): ReactElement => (
    <input
      type={ type }
      value={ value }
      onChange={ handler }
    />
  )

  return (
    <div className='price-filter__text-input'>
      { /* Input min */ }
      { displayedInputField(inputValue.minValue, changeMinValueHandler, 'text') }
      <span> { CONSTANTS.DASH } </span>
      { /* Input max */ }
      { displayedInputField(inputValue.maxValue, changeMaxValueHandler, 'text') }
    </div>
  )
}

export default PriceTextInput;