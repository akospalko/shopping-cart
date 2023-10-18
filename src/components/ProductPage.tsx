// Component to hold the product items and related pagination
import {useEffect, ReactElement} from 'react'
import './ProductPage.css'
import {ProductItemType} from '../types/productsProviderTypes'
import Pagination from './Pagination'
import ProductList from './ProductList'
import {useNavigate, useLocation} from 'react-router-dom'
import ProductSidemenu from './ProductSidemenu/ProductSidemenu'
import useProducts from '../hooks/useProducts'

const CONSTANT = {
  HEADER_1_BROWSE_GOODIES: 'Browse Goodies',
  HEADER_1_NO_PRODUCTS: 'No Available Products',
  HEADER_2_NEW_PRODUCTS_SOON: 'New products are coming soon...'
}

// TYPE
type ProductPagePropsType = {
  productData: ProductItemType[] | undefined
}

// COMPONENT
const ProductPage = ({productData}: ProductPagePropsType) => {
  // ROUTE
  const navigate = useNavigate();
  // const {category, page} = useParams();
  const location = useLocation();
  const activeCategory = location.pathname.split('/').filter(segment => segment !== '').slice(0, -1).join('/');

  // CONTEXT
  const {activePage} = useProducts();
  const pageNumber = activePage || 1

  // EFFECTS
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'products');
  }, [])

  useEffect(() => {
    const activeRoute = activeCategory === 'search' ? '/search/1' : `/${activeCategory}/${pageNumber}`
    navigate(activeRoute, { replace: true });
  }, [activeCategory, navigate, pageNumber]);

  // Filter out productsData based on active category
  const categoryProductData = productData?.filter(product => {
    return product.category === activeCategory;
  });

  const filteredProductData = activeCategory === 'all' || activeCategory === 'search'  ? productData : categoryProductData

  // CONSTANT VALUES
  const itemsPerPage = 10;

  // CALCULATED VALUES
  const displayedProductData: ProductItemType[] = filteredProductData || []
  const totalPages = Math.ceil(displayedProductData?.length / itemsPerPage);
  const startIndex: number = (pageNumber - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const paginatedProducts: ProductItemType[] = filteredProductData?.slice(startIndex, endIndex) || [];

  // empty products list (fetch ok)
  const productEmptyList: ReactElement | ReactElement[] = (
    <div className="product-page__empty-list">
      <h1 className='product-page__header--1'>{CONSTANT.HEADER_1_NO_PRODUCTS}</h1>
      <h2 className='product-page__header--2'>{CONSTANT.HEADER_2_NEW_PRODUCTS_SOON}</h2>
    </div>
  )

  // products list
  const productList: ReactElement | ReactElement[] = (
    <div className='product-page__content'>
      <h1 className='product-page__header--1'>{CONSTANT.HEADER_1_BROWSE_GOODIES}</h1>
      <ProductList productsData={paginatedProducts}/>
      <Pagination totalPages={totalPages}/>
    </div>
  )

  return (
    <main className='main main__product-page'>
      <div className="product-page__wrapper">
        <ProductSidemenu activeCategory={activeCategory}/>
        {filteredProductData?.length ? productList : productEmptyList}
      </div>
    </main>
  )
}

export default ProductPage