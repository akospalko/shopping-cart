// Component to hold the product items and related pagination
import { useEffect, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductItemType } from "../types/productsProviderTypes";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import ProductSidemenu from "./ProductSidemenu/ProductSidemenu";
import useProducts from "../hooks/useProducts";
import DividerLine from "./UI/DividerLine";
import ProductSortDropdown from "./UI/ProductSortDropdown";
import paginateProducts from "../utility/paginateProducts";
import { validatePageParam } from "../utility/validatePageParam";
import { PRODUCT_CATEGORY, SORT_OPTION_VALUE, itemsPerPage} from "../utility/constants";
import { sortBy } from "../utility/sortProduct";
import useFilter from "../hooks/useFilter";
import textData from "../data/textData.json";
import productCategories from "../data/productCategories.json";
import "./ProductPage.css";

// COMPONENT
const ProductPage = () => {
  // ROUTE
  const navigate = useNavigate();
  const { category, page } = useParams();
  const activeCategory = category || PRODUCT_CATEGORY.ALL; 

  // CONTEXT
  const { 
    products,
    categoryProducts, 
    categoryProductsFiltered, 
    dispatch, 
    REDUCER_ACTIONS_PRODUCT } = useProducts();

  const { isFilteringProduct, activeSortOption } = useFilter();

  // DATA
  // Filter out which products to display 
  let titleContent: string = "";
  let subtitleContent: string = "";
  let productListContent: ProductItemType[] = [];
  const isCategoryProductsAvailable: boolean = !!categoryProducts?.length;
  const isFilteredCategoryProductsAvailable: boolean = !!categoryProductsFiltered?.length;
  const productCategoriesArray: string[] = Object.values(productCategories).map((category) => category.category);
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

  return (
    <main className="main main__product-page">
      <div className="product-page__wrapper">
        <ProductSidemenu activeCategory={ activeCategory }/>
        <div className="product-page__content">
          <h1 className="product-page__header--1">{ titleContent }</h1>
          { !!subtitleContent.length && <h3 className="product-page__header--2"> { subtitleContent } </h3> }
          { !!productListContent.length && <DividerLine/> }
          { !!productListContent.length && <ProductSortDropdown/> }
          <ProductList productsData={ paginatedProducts ?? [] }/>
          { (totalPages > 1 && pageNumber <= totalPages) && <Pagination totalPages={ totalPages } pageURLParams={ { category: activeCategory, page: pageNumber } } /> }
        </div>
      </div>
    </main>
  )
}

const MemoizedProductPage = memo(ProductPage);

export default MemoizedProductPage;