// Component to hold the product items and related pagination
import { useEffect, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductItemType } from "../types/productsProviderTypes";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import useProducts from "../hooks/useProducts";
import DividerLine from "./UI/DividerLine";
import textData from "../data/textData.json";
import paginateProducts from "../utility/paginateProducts";
import { validatePageParam } from "../utility/validatePageParam";
import { ProductPagePropsType } from "../types/productPageTypes";
import { SEARCH } from '../../src/utility/constants';
import "./ProductPage.css";

// COMPONENT
const ProductSearchPage = ({ productData }: ProductPagePropsType) => {
  // ROUTE
  const navigate = useNavigate();
  const { page } = useParams();

  // CONTEXT
  const { searchStatus, filteredProducts } = useProducts();

  // DATA
  const pageNumber: number = validatePageParam(page);

  // EFFECTS
  useEffect(() => {
    // Store last visited page in 
    sessionStorage.setItem("lastVisitedPage", "products");
  }, [])

  // DATA
  // Paginate filtered products
  const productListContent: ProductItemType[] = productData ?? [];
  const itemsPerPage: number = 10;
  const totalPages = Math.ceil((filteredProducts?.length ?? 1) / itemsPerPage);
  const paginatedProducts = paginateProducts(filteredProducts, itemsPerPage, pageNumber);

  // ELEMENTS
  // Display products search - found product
  const productFound: ReactElement | ReactElement[] = (
    <div className="product-page__wrapper">
      <div className="product-page__content">
        <h1 className="product-page__header--1"> { textData["title-search-result"] } </h1>
        { !!productListContent.length && <DividerLine style="product-sidemenu-divider--product-page"/> }
        <ProductList productsData={ paginatedProducts ?? [] }/>
        { totalPages > 1 && <Pagination totalPages={ totalPages } pageURLParams={ { category: "search", page: pageNumber } } /> }
      </div>
    </div>
  )

  // Display product search - no result
  const noResult: ReactElement | ReactElement[] = (
    <div className="product-page__no-result">
      <div className="product-page__no-result-status-message">
        <h1> { textData["title-search-no-products"] } </h1>
        <h3> { textData["subtitle-search-try-with-other-keyword"] } </h3>
      </div>
      <div className="product-page__no-result-return-back-button">
        <button 
          onClick={ () => navigate("/") }
          className="button--search-no-result-return-back"
        > { textData["button-navigate-to-products"] } </button>
      </div>
    </div>
  )

  // Conditionally display found prorducts or no result window 
  let dislayedContent;
  switch(searchStatus) {
    case SEARCH.NO_RESULT:
      dislayedContent = noResult;
      break;
    case SEARCH.RESULT:
      dislayedContent = productFound;
      break;
    default:
      dislayedContent = noResult;
  }

  return (
    <main className="main main__product-page">
      { dislayedContent }
    </main>
  )
}

export default ProductSearchPage;