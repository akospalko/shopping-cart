import {ReactElement} from 'react'

// ProductSidemenu & ProductCategory 
export type ProductsSidemenuPropsType = {
  onResetActivePage: React.Dispatch<React.SetStateAction<number>>
  activeCategory: string
}
// ProductCategory
// category item type
export type ProductCategoryItemType = {
  name: string,
  icon: string,
  category: string,
}
// category icon type
export type CategoryIconType = {[key: string]: ReactElement}
