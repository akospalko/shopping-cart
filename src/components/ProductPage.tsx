// Component to hold the product items and related pagination
import { useEffect, useRef, memo, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ProductItemType } from "../types/productsProviderTypes";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import ProductSidemenu from "./ProductSidemenu/ProductSidemenu";
import useProducts from "../hooks/useProducts";
import DividerLine from "./UI/DividerLine";
import ProductSortDropdown from "./UI/ProductSortDropdown";
import paginateProducts from "../utility/paginateProducts";
import { validatePageParam } from "../utility/validatePageParam";
import { MODAL_TOGGLE_KEY, PRODUCT_CATEGORY, SORT_OPTION_VALUE, itemsPerPage} from "../utility/constants";
import { sortBy } from "../utility/sortProduct";
import useFilter from "../hooks/useFilter";
import { FilterResetIcon, OptionsIcon } from "./SVGComponents";
import useNavigationMenu from "../hooks/useNavigationMenu";
import useProductsFilterHandler from "../hooks/useFilterProductsHandler";
import useMediaQuery from "../hooks/useMediaQuery";
import textData from "../data/textData.json";
import productCategoriesData from "../data/productCategoriesData.json";
import "./ProductPage.css";
import "./styleSheets/cssTransition.css";


// COMPONENT
const ProductPage = () => {
  // ROUTE
  const navigate = useNavigate();
  const { category, page } = useParams();
  const activeCategory = category || PRODUCT_CATEGORY.ALL; 

  // REF
  const slideMenuRef = useRef<HTMLDivElement | null>(null);

  // CONTEXT
  const { 
    products,
    categoryProducts, 
    categoryProductsFiltered, 
    dispatch, 
    REDUCER_ACTIONS_PRODUCT } = useProducts();

  // HOOKS
  const { modal } = useNavigationMenu();
  const { isFilteringProduct, activeSortOption } = useFilter();
  const { clearFilteredProductsHandler } = useProductsFilterHandler();
  const { toggleModal, toggleMenu } = useNavigationMenu();
  const isLargeView = useMediaQuery("(min-width: 1024px)");

  // DATA
  // Filter out which products to display 
  let titleContent: string = "";
  let subtitleContent: string = "";
  let productListContent: ProductItemType[] = [];
  const isCategoryProductsAvailable: boolean = !!categoryProducts?.length;
  const isFilteredCategoryProductsAvailable: boolean = !!categoryProductsFiltered?.length;
  const productCategoriesArray: string[] = Object.values(productCategoriesData).map((category) => category.category);
  const pageNumber: number = validatePageParam(page);

  const conditonalDisplayCategoryProducts = (): void => {
    if(products === undefined || !products.length) {
      titleContent = textData["title-products-not-available"]; 
      subtitleContent = textData["subtitle-products-not-available"];
    }
    // category products
    else if(productCategoriesArray.includes(activeCategory)) {
      // filter result
      if(isFilteredCategoryProductsAvailable) {
        titleContent = textData["title-products-filtered"];
        productListContent = categoryProductsFiltered || [];
      // filter no result
      } else if(isCategoryProductsAvailable && isFilteringProduct) {
        titleContent = textData["title-products-filter-no-result"];
        subtitleContent = textData["subtitle-products-filter-no-result"];
        productListContent = categoryProducts || [];
      // default
      } else if(isCategoryProductsAvailable) {
        titleContent = textData["title-products-default"];
        productListContent = categoryProducts || [];
      } 
      // no product in category
      else if(!isCategoryProductsAvailable) {
        titleContent = textData["title-product-empty-category"];
        subtitleContent = textData["subtitle-product-empty-category"];
      }
    }
  }

  conditonalDisplayCategoryProducts();

  // Sort products based on active sort option
  const sortedProducts = sortBy(productListContent, activeSortOption || SORT_OPTION_VALUE.RATING);
  
  // Paginate filtered products
  const totalPages = Math.ceil((sortedProducts?.length ?? 1) / itemsPerPage);
  const paginatedProducts = paginateProducts(sortedProducts, itemsPerPage, pageNumber);

  // EFFECTS
  // Store last visited page
  useEffect(() => {
    sessionStorage.setItem("lastVisitedPage", "products");
  }, []);

  // Navigate to conditional route
  useEffect(() => {
    if(totalPages > 1 && pageNumber <= totalPages) {
      navigate(`/${ activeCategory }/${ pageNumber }`);
    }
  }, [activeCategory, navigate, pageNumber, totalPages]); 
 
  // Filter and store active category products
  useEffect(() => {
    // filter products
    const categoryProductData = products?.filter((product: ProductItemType) => {
      if(activeCategory === PRODUCT_CATEGORY.ALL) {
        return product;
      } else {
        return product.category === activeCategory;
      }
    }); 
    // update store with filtered products
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, payload: { categoryProducts: categoryProductData } });
  }, [REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, activeCategory, dispatch, products]);

  // STYLE
  const iconSize = "20px";
  const lightIconColor = "var(--color-4)";
  const darkIconColor = "var(--color-2)";

  const isClearFilteredButtonDisabled: boolean = categoryProductsFiltered === undefined || !categoryProductsFiltered.length
  const iconColorDisabled: string = "var(--color-6)";

  // JSX
  const filterMenuButton: ReactElement = (
    <button 
      onClick={ () => toggleModal(MODAL_TOGGLE_KEY.FILTER_MENU, true) }
      className={ modal.FILTER_MENU ? "button--toggle-filter-menu-active" : "button--toggle-filter-menu" }
    > 
      <OptionsIcon
        width={ iconSize } 
        height={ iconSize } 
        stroke={ modal.FILTER_MENU ? "var(--color-4)" : darkIconColor }
      />
    </button>
  ) 

  const sideMenuButton: ReactElement = (
    <button 
      onClick={ () => toggleMenu(MODAL_TOGGLE_KEY.SIDE_MENU) }
      className={ modal.SIDE_MENU ? "button--toggle-filter-menu-active" : "button--toggle-filter-menu" }
    > 
    <OptionsIcon
      width={ iconSize } 
      height={ iconSize } 
      stroke={ modal.SIDE_MENU ? "var(--color-4)" : darkIconColor }
    />
    </button>
  ) 

  const clearFilterButton: ReactElement = (
    <button 
      className={ isClearFilteredButtonDisabled ? "button--product-clear-filter button--product-clear-filter-disabled" : "button--product-clear-filter" }
      onClick={ () => clearFilteredProductsHandler() }
      disabled={ isClearFilteredButtonDisabled }  
    > 
      <FilterResetIcon
        width={ iconSize }
        height={ iconSize }
        stroke={ isClearFilteredButtonDisabled ? iconColorDisabled : lightIconColor}
      />
    </button>
  )

  const productPageToolbar: ReactElement = (
    <div className="product-page__toolbar">
      { isLargeView ? sideMenuButton : filterMenuButton }
      { clearFilterButton }
      { !!productListContent.length && <ProductSortDropdown/> }
    </div>
  )
  
  return (
    <main className="main main__product-page">
      <CSSTransition
        in={ isLargeView && modal.SIDE_MENU }
        nodeRef={ slideMenuRef }
        timeout={ 300 }
        classNames="slide-left-to-right"
        unmountOnExit
      >
        <ProductSidemenu ref={ slideMenuRef }/>
      </CSSTransition>
      <div className="product-page__content">
        <h1 className="product-page__header--1">{ titleContent }</h1>
        { !!subtitleContent.length && <h3 className="product-page__header--2">{ subtitleContent }</h3> }
        { !!productListContent.length && <DividerLine style="divider-line--horizontal"/> }
        { productPageToolbar }
        <ProductList productsData={ paginatedProducts ?? [] }/>
        { (totalPages > 1 && pageNumber <= totalPages) && 
        (
          <Pagination 
            totalPages={ totalPages } 
            pageURLParams={ { category: activeCategory, page: pageNumber } } 
          />
        ) }
      </div>
    </main>
  )
}

const MemoizedProductPage = memo(ProductPage);

export default MemoizedProductPage;