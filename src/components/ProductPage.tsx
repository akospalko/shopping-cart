// Component to hold the product items and related pagination
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductItemType } from "../types/productsProviderTypes";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import ProductSidemenu from "./ProductSidemenu/ProductSidemenu";
import useProducts from "../hooks/useProducts";
import DividerLine from "./UI/DividerLine";
import paginateProducts from "../utility/paginateProducts";
import { validatePageParam } from "../utility/validatePageParam";
import textData from "../data/textData.json";
import { ProductPagePropsType } from "../types/productPageTypes";
import productCategories from "../data/productCategories.json";
import "./ProductPage.css";

// COMPONENT
const ProductPage = ({ productData }: ProductPagePropsType) => {
  // ROUTE
  const navigate = useNavigate();
  const { category, page } = useParams();
  const activeCategory = category || "all"; 

  // CONTEXT
  const { 
    isFilteringProduct,
    categoryProducts, 
    categoryProductsFiltered, 
    dispatch, 
    REDUCER_ACTIONS_PRODUCT } = useProducts();

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
    if(productData === undefined || !productData.length) {
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

  // Paginate filtered products
  const itemsPerPage: number = 5;
  const totalPages = Math.ceil((productListContent?.length ?? 1) / itemsPerPage);
  const paginatedProducts = paginateProducts(productListContent, itemsPerPage, pageNumber);

  // EFFECTS
  // Store last visited page
  useEffect(() => {
    sessionStorage.setItem("lastVisitedPage", "products");
  }, [])

  // Navigate to conditional route
  useEffect(() => {
    if(totalPages > 1 && pageNumber <= totalPages) {
      navigate(`/${ activeCategory }/${ pageNumber }`);
    }
  }, [REDUCER_ACTIONS_PRODUCT.IS_FILTERING_PRODUCT, REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS_FILTERED, activeCategory, dispatch, navigate, pageNumber, totalPages]); 
 
  // Filter and store active category products
  useEffect(() => {
    // filter products
    const categoryProductData = productData?.filter((product: ProductItemType) => {
      if(activeCategory === "all") {
        return product;
      } else {
        return product.category === activeCategory;
      }
    }); 
    // update store with filtered products
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, payload: { categoryProducts: categoryProductData } });
  }, [REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, activeCategory, dispatch, productData])

  return (
    <main className="main main__product-page">
      <div className="product-page__wrapper">
        <ProductSidemenu activeCategory={ activeCategory }/>
        <div className="product-page__content">
          <h1 className="product-page__header--1">{ titleContent }</h1>
          { !!subtitleContent.length && <h3 className="product-page__header--2"> { subtitleContent } </h3> }
          { !!productListContent.length && <DividerLine style="product-sidemenu-divider--product-page"/> }
          <ProductList productsData={ paginatedProducts ?? [] }/>
          { (totalPages > 1 && pageNumber <= totalPages) && <Pagination totalPages={ totalPages } pageURLParams={ { category: activeCategory, page: pageNumber } } /> }
        </div>
      </div>
    </main>
  )
}

export default ProductPage;