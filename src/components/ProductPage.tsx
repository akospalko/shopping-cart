// Component to hold the product items and related pagination
import { useEffect, ReactElement } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProductItemType } from '../types/productsProviderTypes'
import Pagination from './Pagination'
import ProductList from './ProductList'
import ProductSidemenu from './ProductSidemenu/ProductSidemenu'
import useProducts from '../hooks/useProducts'
import './ProductPage.css'

// CONSTANT
const CONSTANT = {
  HEADER_1_BROWSE_GOODIES: 'Browse Goodies',
  HEADER_1_NO_PRODUCTS: 'No Available Products',
  HEADER_2_NEW_PRODUCTS_SOON: 'New products are coming soon...',
  PRODUCTS_FILTERED_RESULT: 'Filtered products',
  PRODUCTS_FILTERED_NO_RESULT: 'No results, check out our stock'
}

// TYPES
type ProductPagePropsType = {
  productData: ProductItemType[] | undefined
}
type IndexRangePriceType = {
  start: number,
  end: number
}

// COMPONENT
const ProductPage = ({ productData }: ProductPagePropsType) => {
  // ROUTE
  const navigate = useNavigate();
  // const {category, page} = useParams();
  const location = useLocation();
  const activeCategory = location.pathname.split('/').filter(segment => segment !== '').slice(0, -1).join('/');

  // CONTEXT
  const { isFilteringProduct, activePage, categoryProducts, categoryProductsFiltered, dispatch, REDUCER_ACTIONS_PRODUCT } = useProducts();
  
  // VALUE
  const pageNumber = activePage || 1;

  // EFFECTS
  // Store last visited page in 
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'products');
  }, [])

  // Navigate to route based on active route param
  useEffect(() => {
    const activeRoute = activeCategory === 'search' ? '/search/1' : `/${ activeCategory }/${ pageNumber }`
    navigate(activeRoute, { replace: true });
  }, [activeCategory, navigate, pageNumber])

  // Filter and store active category products
  useEffect(() => {
    const categoryProductData = productData?.filter((product: ProductItemType) => {
      if(activeCategory === 'all' || activeCategory === 'search') {
        return product;
      } else {
        return product.category === activeCategory;
      }
    }); 

    // update store with filtered products
    dispatch({ type: REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, payload: { categoryProducts: categoryProductData } });
  }, [REDUCER_ACTIONS_PRODUCT.UPDATE_CATEGORY_PRODUCTS, activeCategory, dispatch, productData])
  

  // Apply pagination to product data:
  const paginateData = (productsData: ProductItemType[] | undefined, indexRange: IndexRangePriceType): ProductItemType[] => {
    return productsData?.slice(indexRange.start, indexRange.end) || [];
  } 

  // Displayed product list
  const productList = (): ReactElement | ReactElement[] => {
    let headerContent;
    let productListContent: ProductItemType[] = [];

    const productCategories: string[] = ['all', 'mobile','processor', 'ram', 'videocard']; // TODO: get keys dynamically
 
    const isCategoryProductsAvailable: boolean = !!categoryProducts?.length;
    const isFilteredCategoryProductsAvailable: boolean = !!categoryProductsFiltered?.length;
    const itemsPerPage = 10;
    const indexRange: IndexRangePriceType = {
      start: (pageNumber - 1) * itemsPerPage,
      end: (pageNumber - 1) * itemsPerPage + itemsPerPage
    }

    if(productData === undefined || !productData.length) {
      headerContent = CONSTANT.HEADER_1_NO_PRODUCTS;
      productListContent;
    }
    // category products
    else if(productCategories.includes(activeCategory)) {
      // filter result
      if(isFilteredCategoryProductsAvailable) {
        headerContent = CONSTANT.PRODUCTS_FILTERED_RESULT;
        productListContent = categoryProductsFiltered || [];
      // filter no result
      } else if(isCategoryProductsAvailable && isFilteringProduct) {
        headerContent = CONSTANT.PRODUCTS_FILTERED_NO_RESULT;
        productListContent = categoryProducts  || [];
      // default
      } else if(isCategoryProductsAvailable) {
        headerContent = CONSTANT.HEADER_1_BROWSE_GOODIES;
        productListContent = categoryProducts  || [];
      } 
      // if no product in the category
      else if(!isCategoryProductsAvailable) {
        headerContent = 'No product in this category';
        productListContent = [];
      }
    } 

    // pagination
    const totalPages = Math.ceil(productListContent?.length / itemsPerPage);
    const paginatedProducts: ProductItemType[] = paginateData(productListContent, indexRange);

    // displayed products
    return (
      <div className='product-page__content'>
        <h1 className='product-page__header--1'>{ headerContent }</h1>
        <h3 className='product-page__header--2'> { 'h3 test' } </h3>
        <ProductList productsData={ paginatedProducts || [] }/>
        { !!productListContent.length && <Pagination totalPages={ totalPages }/> }
      </div>
    )
  }
      
  return (
    <main className='main main__product-page'>
      <div className="product-page__wrapper">
        <ProductSidemenu activeCategory={activeCategory}/>
        { productList() }
      </div>
    </main>
  )
}

export default ProductPage;