// -----!NOT IN USE-----
// Filter by price min and max input fields with update logic
import React, { ReactElement } from "react";
import { PriceTextInputPropsType } from "../../types/ProductFilterTypes";
import textData from "../../data/textData.json";
import "./PriceTextInput.css";

// COMPONENT
const PriceTextInput = ({ inputValue, setInputValue, disabled }: PriceTextInputPropsType) => {
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
  const displayedInputField = (value: string, handler: (e: React.ChangeEvent<HTMLInputElement>) => void): ReactElement => (
    <input
      className="input--price-filter-input"
      type={ "text" }
      value={ value }
      onChange={ handler }
      disabled={ disabled }
    />
  )

  return (
    <div className="price-filter__text-input">
      { /* Input min */ }
      { displayedInputField(inputValue.minValue, changeMinValueHandler) }
      <span> { textData["dash"] } </span>
      { /* Input max */ }
      { displayedInputField(inputValue.maxValue, changeMaxValueHandler) }
    </div>
  )
}

export default PriceTextInput;