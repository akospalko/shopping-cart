// Get and return navigation menu items as mapped jsx
import { ReactElement } from "react";
import { NavLink, useParams } from "react-router-dom";
import { RemoveIcon } from "../components/SVGComponents";
import useNavigationMenu from "./useNavigationMenu";
import useProductsFilterHandler from "./useFilterProductsHandler";
import navigationMainData from "../data/navigationMainData.json";
import { CONSTANT, MODAL_TOGGLE_KEY, NAVIGATION_MENU_ITEMS_ACTION } from "../utility/constants";
import { 
  NavigationMenuActionType,
  NavigationMenuProductCategoriesDataType,
  NavigationMenuDataType,
  CategoryIconType,
  ItemStylesType
} from "../types/navigationMenuTypes";
import useMediaQuery from "./useMediaQuery";
import productCategoriesData from "../data/productCategoriesData.json";
import textData from "../data/textData.json";
import "./useGetNavigationItems.css";

export const useGetNavigationItems = (navigationMenuAction: NavigationMenuActionType): ReactElement[] => {
  // ROUTE
  const { category, page }  = useParams();
  
  // CONTEXT
  const { toggleModal } = useNavigationMenu();
  
  // HOOK
  const { clearFilteredProductsHandler } = useProductsFilterHandler();
  const isSmallView = useMediaQuery("(max-width: 1024px)"); // small screens check for modals 

  // UTIL
  // Construct active product page route 
  const getProductPageLink = (category: string | undefined, page: string | undefined): string => {
    if (!category || !page ) {
      return "/all/1";
    }
    return `/${ category }/${ page }`;
  }

  // INITIALIZERS
  // Map navigation menu initializer data (.json) with dynamic content to js obj
  const navigationMenuInitializerData: NavigationMenuDataType[] = navigationMainData.map(
    (item: NavigationMenuDataType) => {
      const initializer = { ...item };
      if (item.name === CONSTANT.PRODUCT) {
        return {
          ...initializer,
          to: getProductPageLink(category, page)
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
        to: getProductPageLink(category, page)
      };
    }
  );

  // Icons initializer
  const iconSize: string = "25px";
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
    navLinkLabel: "",
  }
  let withIcons: boolean = false;
  const closeOnClick: boolean = true;
  let toggler: () => void = () => {};

  // Get active navigation item apply style
  switch(navigationMenuAction) {
    case NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU_PRODUCT_CATEGORIES:
      dataInitializerArray = productCategoriesInitializer || [];
      itemStyles.navLinkStyle = "navigation-item__product-category";
      itemStyles.navLinkStyleActive = "navigation-item__product-category--active";
      itemStyles.navLinkLabel = "navigation-item__product-category-label";
      withIcons = true;
      if (isSmallView) {
        toggler = () => toggleModal(MODAL_TOGGLE_KEY.MAIN_MENU, closeOnClick);
      }
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.FILTER_MENU_PRODUCT_CATEGORIES:
      dataInitializerArray = productCategoriesInitializer || []; 
      itemStyles.navLinkStyle = "navigation-item__product-category";
      itemStyles.navLinkStyleActive = "navigation-item__product-category--active";
      itemStyles.navLinkLabel = "navigation-item__product-category-label";
      withIcons = true;
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.SIDEMENU_PRODUCT_CATEGORIES:
      dataInitializerArray = productCategoriesInitializer || []; 
      itemStyles.navLinkStyle = "navigation-item__product-category";
      itemStyles.navLinkStyleActive = "navigation-item__product-category--active";
      itemStyles.navLinkLabel = "navigation-item__product-category-label";
      withIcons = true;
      toggler = () => toggleModal(MODAL_TOGGLE_KEY.MAIN_MENU, closeOnClick);
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.MAIN_MENU_NAVIGATION: 
      dataInitializerArray = navigationMenuInitializerData || [];
      itemStyles.navLinkStyle = "navigation-item__main-menu";
      itemStyles.navLinkStyleActive = "navigation-item__main-menu--active";
      itemStyles.navLinkLabel = "navigation-item__main-menu-label";
      withIcons = true;
      toggler = () => toggleModal(MODAL_TOGGLE_KEY.MAIN_MENU, closeOnClick);
      break;
    case NAVIGATION_MENU_ITEMS_ACTION.MAIN_BAR_NAVIGATION: 
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
          ({ isActive }) => `${ itemStyles.navLinkStyle } ${ isActive ? itemStyles.navLinkStyleActive : "" }` 
        }
        to={ navItem.to }
        onClick={ 
          () => {
            toggler && toggler();
            clearFilteredProductsHandler();
          } 
        }
      > 
        { withIcons && menuIconArray.includes(navItem.icon) ? MENU_ICON[navItem.icon as keyof CategoryIconType] : null }
        <span className={ itemStyles.navLinkLabel }>{ navItem.name }</span>
      </NavLink>
    ))  
  )
  return getNavigationItems(dataInitializerArray);
}