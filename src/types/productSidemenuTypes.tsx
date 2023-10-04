import {ReactElement} from 'react'

// ProductSidemenu & ProductCategory 
export type ProductsSidemenuPropsType = {activeCategory: string}

// ProductCategory
// category item type
export type ProductCategoryItemType = {
  name: string,
  icon: string,
  category: string,
}

// category icon type
export type CategoryIconType = {[key: string]: ReactElement}
