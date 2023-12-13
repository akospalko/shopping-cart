// Selected set of product properties filtering options initializer for each product category
import { FilterGroupType, FilterGroupPropertiesType } from "../types/ProductFilterTypes";

const processorFilterGroupProperties: FilterGroupType[] = [
  { group: "brand" },
  { group: "model" },
  { group: "cores" },
  { group: "threads" },
  {
    group: "tdp (thermal design power)",
    range: {
      unit: "W",
      ranges: [[35, 65], [65, 95], [95]],
    },
  },
  {
    group: "clock speed",
    range: {
      unit: "GHz",
      ranges: [[1, 2.5], [2.6, 3], [3.1, 3.5], [3.6]],
    },
  },
  { group: "hyper-threading" },
  { group: "architecture" },
];

const videoCardFilterGroupProperties: FilterGroupType[] = [
  { group: "brand" },
  { group: "model" },
  { group: "vram" },
  { group: "clock speed" },
  { group: "memory bus" },
  { group: "memory speed" },
  { group: "memory bandwidth" },
  { group: "ray tracing support" },
  { group: "tdp (thermal design power)" },
];

const ramFilterGroupProperties: FilterGroupType[] = [
  { group: "type" },
  { group: "capacity" },
  { group: "speed" },
  { group: "voltage" },
  { group: "number of modules" },
];

const mobileFilterGroupProperties: FilterGroupType[] = [
  { group: "brand" },
  { group: "model" },
  { group: "operating system" },
  { group: "processor" },
  { group: "ram" },
  { group: "storage" },
  { group: "display size" },
  { group: "display resolution" },
  { group: "camera" },
  { group: "battery capacity" },
];

export const FILTER_GROUP_PROPERTIES: FilterGroupPropertiesType = {
  processor: processorFilterGroupProperties,
  videoCard: videoCardFilterGroupProperties,
  ram: ramFilterGroupProperties,
  mobile: mobileFilterGroupProperties,
};