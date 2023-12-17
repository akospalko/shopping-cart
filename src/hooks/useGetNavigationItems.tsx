// Get and return navigation menu items as mapped jsx
// TODO: Navigation bar
import { ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RemoveIcon } from "../components/SVGComponents";
import useNavigationMenu from "./useNavigationMenu";
import useProductsFilterHandler from "./useFilterProductsHandler";
import navigationMainData from "../data/navigationMainData.json";
import productCategoriesData from "../data/productCategoriesData.json";
import "./useGetNavigationItems.css";
import { CONSTANT, NAVIGATION_MENU_ITEMS_ACTION } from "../utility/constants";
import { 
  NavigationMenuActionType,
  NavigationMenuProductCategoriesDataType,
  NavigationMenuDataType,
  CategoryIconType,
  ItemStylesType
} from "../types/navigationMenuTypes";
import textData from "../data/textData.json";

export const useGetNavigationItems = (navigationMenuAction: NavigationMenuActionType): ReactElement[] => {
  // ROUTE
  const location = useLocation();
  const pathSegments: string[] = location.pathname.split("/").filter(Boolean);
  const categoriesArray: string[] = productCategoriesData.map((item: NavigationMenuProductCategoriesDataType) => item.category);

  // CONTEXT
  const { toggleNavMenuHandler } = useNavigationMenu();
  
  // HOOK
  const { debouncedClearFilteredProductsHandler } = useProductsFilterHandler();

  // UTIL
  // Extract product link from location path segments
  const getProductPageLink = (activePath: string[], categoriesArray: string[]): string => {
    const category = activePath[0];
    const page: string | null = activePath[1] || null; 
    if (categoriesArray.includes(category)) {
      return `${ category }/${ page }`;
    } else {
      return "/all/1";
    }
  }

  // INITIALIZERS
  // Map navigation menu initializer data (.json) with dynamic content to js obj
  const navigationMenuInitializerData: NavigationMenuDataType[] = navigationMainData.map(
    (item: NavigationMenuDataType) => {
      const initializer = { ...item };
      if (item.name === CONSTANT.PRODUCT) {
        return {
          ...initializer,
          to: getProductPageLink(pathSegments, categoriesArray),
        };
      } else {
        return initializer;
      }
    }
  );

  // Map product categories
  const productCategoriesInitializer: NavigationMenuDataType[] = productCategoriesData.map(
    (item: NavigationMenuProductCategoriesDataType) => {
      const { category, ...restItems } = item; // remove category entries from new array
        return {
          ...restItems,
          to: `${ category }/1`, // convert category to route
        };
      }
  );

  // Icons initializer
  const iconSize = "25px";
  const MENU_ICON: CategoryIconType = {
    // Main menu
    HomeIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,  
    CartIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,
    ProductIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,  
    // Product category
    AllIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,  
    ProcessorsIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,
    MobileIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,  
    VideoCardIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>,  
    RAMIcon: <RemoveIcon width={ iconSize } height={ iconSize }/>
  }
  const menuIconArray: string[] = Object.keys(MENU_ICON);

  // RENDER
  // Data
  let dataInitializerArray: NavigationMenuDataType[] = [
    {
      name: "",
      icon: "",
      to: "",
    }
  ]
  const itemStyles: ItemStylesType = {
    navLinkStyle: "",
    navLinkStyleActive: "",
    navLinkLabel: ""
  }
  let withIcons: boolean = false;

  // Switch
  switch(navigationMenuAction) {
    case NAVIGATION_MENU_ITEMS_ACTION.PRODUCT_CATEGORY: 
      dataInitializerArray = productCategoriesInitializer || []; 
      itemStyles.navLinkStyle = "navigation-item__product-category";
      itemStyles.navLinkStyleActive = "navigation-item__product-category--active";
      itemStyles.navLinkLabel = "navigation-item__product-category-label";
      withIcons = true;
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU: 
      dataInitializerArray = navigationMenuInitializerData || [];
      itemStyles.navLinkStyle = "navigation-item__main-menu";
      itemStyles.navLinkStyleActive = "navigation-item__main-menu--active";
      itemStyles.navLinkLabel = "navigation-item__main-menu-label";
      withIcons = true;
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.MAIN_BAR: 
      dataInitializerArray = navigationMenuInitializerData || [];
      itemStyles.navLinkStyle = "navigation-item__main-bar";
      itemStyles.navLinkStyleActive = "navigation-item__main-bar--active";
      itemStyles.navLinkLabel = "navigation-item__main-bar-label";
      break;
    default: 
      throw new Error(textData["error-missing-active-navigation"]);
  }

  // JSX
  const getNavigationItems = (navigationData: NavigationMenuDataType[])  => (
    navigationData.map((navItem, i: number): ReactElement => (
      <NavLink 
        key={ i } 
        className={ 
          ({ isActive }) => 
            `${ itemStyles.navLinkStyle } 
            ${ isActive 
            ? itemStyles.navLinkStyleActive 
            : "" }` 
        }
        to={ navItem.to }
        onClick={ () => {
          toggleNavMenuHandler(true);
          debouncedClearFilteredProductsHandler();
        } }
      > 
        { withIcons && menuIconArray.includes(navItem.icon) ? MENU_ICON[navItem.icon as keyof CategoryIconType] : null }
        <span className={ itemStyles.navLinkLabel }>{ navItem.name }</span>
      </NavLink>
    ))  
  )

  return getNavigationItems(dataInitializerArray);
}