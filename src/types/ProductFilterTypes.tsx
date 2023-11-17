// Gathered types used for product filtering 
import { ProductItemType } from './productsProviderTypes';

// FILTER BY PRICE
// Shared
export type PriceValueType = { minValue: string, maxValue: string }

// PriceFilter
export type PriceFilterPropsType = { categoryProducts: ProductItemType[] }

// PriceSlider
export type SliderValueType = 'minValue' | 'maxValue';
export type PriceSliderPropsType = {
  priceRange: PriceValueType
  sliderValue: PriceValueType,
  setSliderValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
  setInputValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
  withDisplayedValues?: boolean
}

// PriceTextInput
export type PriceTextInputPropsType = {
  inputValue: PriceValueType
  setInputValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
}