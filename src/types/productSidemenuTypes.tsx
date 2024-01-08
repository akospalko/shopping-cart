import { ReactElement } from 'react';

// ProductCategory
// category item type
export type ProductCategoryItemType = {
  name: string,
  icon: string,
  category: string,
}

// category icon type
export type CategoryIconType = { [key: string]: ReactElement }
