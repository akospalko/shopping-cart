// Sidebar menu product categories 
import {ReactElement} from 'react'
import './ProductSidemenu.css'
import productCategories from '../../data/productCategories.json'
import {NavLink} from 'react-router-dom'
import {ProductsSidemenuPropsType, ProductCategoryItemType, CategoryIconType} from '../../types/productSidemenuTypes'
import { CheckmarkIcon, RemoveIcon } from '../SVGComponents'

// COMPONENT
export const ProductCategories = ({onResetActivePage, activeCategory}: ProductsSidemenuPropsType) => {
  // CONSTANT
  const CONSTANTS = {
    CATEGORIES: 'Categories'
  }

  // ELEMENTS
  // Icon
  // custom icon style
  const categoryIconStyle = {'paddingRight': '0.5rem'}
  // icon list
  const CategoryIcons: CategoryIconType = {
    RemoveIcon: <RemoveIcon width='25px' height='25px' wrapperCustomStyle={categoryIconStyle}/>,  
    CheckmarkIcon: <CheckmarkIcon width='25px' height='25px' wrapperCustomStyle={categoryIconStyle}/>
  }

  // Category Item 
  // item content (icon + name)
  const categoryItemContent = (item: ProductCategoryItemType): ReactElement => (
    <>
      {CategoryIcons[item.icon]}
      <span className='product-sidemenu-category__item-title'>{item.name}</span>
    </>
  )

  // rendered category items[]
  const menuCategories = productCategories.map((item, i) => (
    item.category === activeCategory ?
    <div
      key={i}
      className='product-sidemenu-category__item product-sidemenu-category__item--active'
    > 
      {categoryItemContent(item)}
    </div>
    :
    <NavLink 
      key={i}
      to={`/${item.category}/1`}
      onClick={() => onResetActivePage(1)} // activate new category -> reset pagination to 1
      className='product-sidemenu-category__item product-sidemenu-category__item--inactive'
    >
      {categoryItemContent(item)}
    </NavLink>
  ))

  return (     
  <div className="product-sidemenu-category">
    <h2 className="product-sidemenu-category__header">{CONSTANTS.CATEGORIES}</h2>
    <div className="product-sidemenu-category__content">
      {menuCategories}
    </div>
  </div>
  )
}