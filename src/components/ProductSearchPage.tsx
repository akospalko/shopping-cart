// Component to hold the product items and related pagination
import { useEffect, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import useProducts from "../hooks/useProducts";
import DividerLine from "./UI/DividerLine";
import ProductSortDropdown from "./UI/ProductSortDropdown";
import paginateProducts from "../utility/paginateProducts";
import { validatePageParam } from "../utility/validatePageParam";
import { itemsPerPage, SEARCH } from "../../src/utility/constants";
import { sortBy } from "../utility/sortProduct";
import { SORT_OPTION_VALUE } from "../../src/utility/constants";
import textData from "../data/textData.json";
import "./ProductPage.css";

// COMPONENT
const ProductSearchPage = () => {
  // ROUTE
  const navigate = useNavigate();
  const { page } = useParams();

  // CONTEXT
  const { activeSortOption, searchStatus, filteredProducts } = useProducts();

  // EFFECTS
  useEffect(() => {
    // Store last visited page in 
    sessionStorage.setItem("lastVisitedPage", "products");
  }, [])

  // DATA
  const pageNumber: number = validatePageParam(page);
  // Sort products based on active sort option
  const sortedProducts = sortBy(filteredProducts ?? [], activeSortOption || SORT_OPTION_VALUE.RATING);
  // Paginate filtered products
  const totalPages = Math.ceil((sortedProducts?.length ?? 1) / itemsPerPage);
  const paginatedProducts = paginateProducts(sortedProducts, itemsPerPage, pageNumber);

  // ELEMENTS
  // Display products search - found product
  const productFound: ReactElement | ReactElement[] = (
    <div className="product-page__wrapper">
      <div className="product-page__content">
        <h1 className="product-page__header--1"> { textData["title-search-result"] } </h1>
        { !!filteredProducts?.length && <DividerLine style="product-sidemenu-divider--product-page"/> }
        { !!filteredProducts?.length && <ProductSortDropdown/> }
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