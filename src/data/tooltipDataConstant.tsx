// TODO: Complete list of tooltip data && utsource to json 
//  Place for all the tooltip data 
import { GroupKeysType } from "./filterGroupPropertyInitializer";

// TYPE
type GroupTooltipDataType = {
  readonly [key in GroupKeysType]?: string;
};

export const PRODUCT_GROUP_TOOLTIP_DATA: GroupTooltipDataType = {
  "brand": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  "model": "model description",
  // Add others...
} as const; 