// Sidebar menu product categories 
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ProductsSidemenuPropsType, ProductCategoryItemType, CategoryIconType} from "../../types/productSidemenuTypes";
import { CheckmarkIcon, RemoveIcon } from "../SVGComponents";
import useProductsFilterHandler from "../../hooks/useFilterProductsHandler";
import textData from "../../data/textData.json";
import productCategories from "../../data/productCategories.json";
import "./ProductSidemenu.css";

// COMPONENT
export const ProductCategories = ({ activeCategory }: ProductsSidemenuPropsType) => {
  // HOOK
  const { debouncedClearFilteredProductsHandler } = useProductsFilterHandler();

  // JSX
  // Style
  const iconSize = "25px";
  const categoryIconStyle = { "paddingRight": "0.5rem" }
  // List
  const CategoryIcons: CategoryIconType = {
    RemoveIcon: <RemoveIcon width={ iconSize } height={ iconSize } wrapperCustomStyle={ categoryIconStyle }/>,  
    CheckmarkIcon: <CheckmarkIcon width={ iconSize } height={ iconSize } wrapperCustomStyle={ categoryIconStyle }/>
  }

  // Category Item 
  // item content (icon + name)
  const categoryItemContent = (item: ProductCategoryItemType): ReactElement => (
    <>
      { CategoryIcons[item.icon] }
      <span className="product-sidemenu-category__item-title">{ item.name }</span>
    </>
  )

  // rendered category items[]
  const menuCategories = productCategories.map((item, i) => (
    item.category === activeCategory ?
    <div
      key={ i }
      className="product-sidemenu-category__item product-sidemenu-category__item--active"
    > 
      { categoryItemContent(item) }
    </div>
    :
    <NavLink 
      key={ i }
      onClick={ debouncedClearFilteredProductsHandler }
      to={ `/${ item.category }/1` }
      className="product-sidemenu-category__item product-sidemenu-category__item--inactive"
    >
      { categoryItemContent(item) }
    </NavLink>
  ))

  return (     
  <div className="product-sidemenu-category">
    <h2 className="product-sidemenu-category__header--2">{ textData["categories"] }</h2>
    <div className="product-sidemenu-category__content">
      { menuCategories }
    </div>
  </div>
  )
}