// Gathered types used for product filtering 
import { ProductItemType } from './productsProviderTypes';
import { GroupKeysType } from './productsProviderTypes';

// FILTER BY PRICE
// Shared
export type PriceValueType = { minValue: string, maxValue: string }

// PriceFilter
export type PriceFilterPropsType = { categoryProducts: ProductItemType[] }
export type PriceRangeAndValueType = [number, number]; 

export type SliderPropsTypes = {
  disabled: boolean
}

// PriceSlider
export type SliderValueType = 'minValue' | 'maxValue';
export type PriceSliderPropsType = {
  priceRange: PriceValueType,
  sliderValue: PriceValueType,
  setSliderValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
  setInputValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
  withDisplayedValues?: boolean
}

// PriceTextInput
export type PriceTextInputPropsType = {
  inputValue: PriceValueType,
  setInputValue: React.Dispatch<React.SetStateAction<PriceValueType>>,
  disabled: boolean
}


// Filter group 
export type FilterGroupRangeType = {
  unit: string;
  ranges: ([number, number] | [number])[];
}

export type FilterGroupType = {
  group: GroupKeysType
  range?: FilterGroupRangeType
};

export type FilterGroupPropertiesType = {
  processor: FilterGroupType[];
  videoCard: FilterGroupType[];
  ram: FilterGroupType[];
  mobile: FilterGroupType[];
};

// Filter options
export type DefaultFilterOptionType = {
  filter: string,
  count: number,
  isChecked: boolean
};

export type RangeFilterMinMaxType = [number, number] | [number];
export type RangeFilterOptionType = {
  filter: number,
  displayedFilterName: string,
  count: number,
  isChecked: boolean,
  range: string,
  minMaxRange: RangeFilterMinMaxType
};

export type FilterOptionsType = {
  [ key in GroupKeysType ]: (DefaultFilterOptionType | RangeFilterOptionType)[]
}



