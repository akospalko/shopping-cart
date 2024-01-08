// Product filtering menu modal for small to medium screens
import { ReactElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useMediaQuery from "../../hooks/useMediaQuery";
import useFilter from "../../hooks/useFilter";
import useMemoizedActiveCategoryProducts from '../../hooks/useMemoizedActiveCategoryProducts';
import { useGetNavigationItems } from '../../hooks/useGetNavigationItems';
import useStoreAndRetrieveProductFilters from "../../hooks/useStoreAndRetrieveProductFilters";
import PriceFilter from "../ProductSidemenu/PriceFilter";
import PropertyFilter from "../ProductSidemenu/PropertyFilter";
import { FilterOptionsType } from "../../types/ProductFilterTypes";
import DividerLine from "../UI/DividerLine";
import ProductFilterButtons from '../UI/ProductFilterButtons';
import FilterMenuSectionHeader from '../UI/FilterMenuSectionHeader';
import { MODAL_TOGGLE_KEY, NAVIGATION_MENU_ITEMS_ACTION } from '../../utility/constants';
import MenuModal from './MenuModal';
import useNavigationMenu from '../../hooks/useNavigationMenu';
import textData from "../../data/textData.json";
import "../styleSheets/cssTransition.css";

const FilterMenu = () => {
  // REF
  const slideMenuRef = useRef<HTMLDivElement | null>(null);

  // CONTEXT
  const { filterOptions } = useFilter();
  const { modal } = useNavigationMenu();

  // HOOKS
  const isBelow360px = useMediaQuery("(max-width: 359px)");
  const isBelow1024px = useMediaQuery("(min-width: 360px) and (max-width: 1023px)");
  const activeCategoryProducts = useMemoizedActiveCategoryProducts();
  useStoreAndRetrieveProductFilters(activeCategoryProducts);
  const navigationProductCategoryItems = useGetNavigationItems(NAVIGATION_MENU_ITEMS_ACTION.FILTER_MENU_PRODUCT_CATEGORIES);

  // UTIL
  const isPropertyFilterAvailable: boolean = !!Object.keys(filterOptions as FilterOptionsType).length;
  
  // JSX
  // Product categories
  const navigationProductCategory: ReactElement  = (
    <nav className="navigation-menu__product-category-container">
      { navigationProductCategoryItems }
    </nav>
  )

  // Modal - very small screen (w: <360)
  const filterLayoutVerySmallScreen: ReactElement = (
    <CSSTransition
      in={ modal[MODAL_TOGGLE_KEY.FILTER_MENU] }
      nodeRef={ slideMenuRef }
      timeout={ 200 }
      classNames="slide-left-to-right"
      unmountOnExit
    >
      <MenuModal 
        toggleModalKey={ MODAL_TOGGLE_KEY.FILTER_MENU }
        ref={ slideMenuRef }
      >
        <FilterMenuSectionHeader textContent={ textData["filter"] }/>
        <ProductFilterButtons/>
        <DividerLine style="divider-line--horizontal"/>
        <FilterMenuSectionHeader textContent={ textData["product-categories"] }/>
        { navigationProductCategory }
        <DividerLine style="divider-line--horizontal"/>
        <PriceFilter categoryProducts={ activeCategoryProducts }/>
        { isPropertyFilterAvailable && (
            <>
              <DividerLine style="divider-line--horizontal"/>
              <FilterMenuSectionHeader textContent={ textData["property"] }/>
              <PropertyFilter/>
            </>
          ) 
        }
      </MenuModal>
    </CSSTransition>
  ) 

  // Modal - small and medium screens (w: 360px - 1023px)
  const filterLayoutSmallScreen: ReactElement = (
    <CSSTransition
      in={ modal[MODAL_TOGGLE_KEY.FILTER_MENU] }
      nodeRef={ slideMenuRef }
      timeout={ 200 }
      classNames="slide-left-to-right"
      unmountOnExit
    >
      <MenuModal 
        toggleModalKey={ MODAL_TOGGLE_KEY.FILTER_MENU }
        ref={ slideMenuRef }
      >
        <FilterMenuSectionHeader textContent={ textData["product-categories"] }/>
        { navigationProductCategory }
        <DividerLine style="divider-line--horizontal"/>
        <PriceFilter categoryProducts={ activeCategoryProducts }/>
        { isPropertyFilterAvailable && (
            <>
              <DividerLine style="divider-line--horizontal"/>
              <FilterMenuSectionHeader textContent={ textData["property"] } />
              <PropertyFilter/>
            </>
          ) 
        }
        <ProductFilterButtons/>
      </MenuModal>
    </CSSTransition>
  )

  // LAYOUT
  // Get active layout
  let activeLayout;
  if(isBelow360px) {
    activeLayout = filterLayoutVerySmallScreen;
  } else if (isBelow1024px) { 
    activeLayout = filterLayoutSmallScreen;
  }

  return activeLayout;
}

export default FilterMenu;