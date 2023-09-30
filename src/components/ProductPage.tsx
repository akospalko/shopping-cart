// Component to hold the product items and related pagination
import {useEffect, useState, ReactElement} from 'react'
import './ProductList.css'
import {ProductItemType} from '../types/productsProviderTypes'
import Pagination from './Pagination'
import ProductList from './ProductList'
import {useNavigate, useParams, useLocation} from 'react-router-dom'

// TYPE
type PropsType = {
  productsData: ProductItemType[] | undefined
}

// COMPONENT
const ProductPage = ({productsData}: PropsType) => {
  // ROUTE
  const navigate = useNavigate();
  const {page} = useParams();
  const location = useLocation();
  
  // STATE
  const [activePage, setActivePage] = useState<number>(parseInt(page || '1'));

  // EFFECTS
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'products');
  }, [])

  useEffect(() => {
    const testLocation = location.pathname.split('').filter(segment => segment !== '').slice(0, -1).join('')
    navigate(`${testLocation}${activePage}`, { replace: true });
    console.log(`${testLocation}${activePage}`)
  }, [activePage, location.pathname, navigate])

    // CONSTANT VALUES
    const itemsPerPage = 10;

    // CALCULATED VALUES
    const displayedProductData: ProductItemType[] = productsData || []
    const totalPages = Math.ceil(displayedProductData?.length / itemsPerPage);
    const startIndex: number = (activePage - 1) * itemsPerPage;
    const endIndex: number =  startIndex + itemsPerPage; 

    const paginatedProducts: ProductItemType[] = productsData?.slice(startIndex, endIndex) || [];
   
  // HANDLERS
  const setActivePageHandler = (page: number) => {
    setActivePage(page)
  }

  // ELEMENTS
  // Loader
  const loader: ReactElement | ReactElement[] = <p> Loading... </p>

  return ( 
    <main className="main main--products">
      <h1 className="main--products__title"> Browse goodies </h1>
      { productsData?.length ? 
        <ProductList productsData={paginatedProducts}/>
        : 
        loader 
      }
      <Pagination  
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={setActivePageHandler}
      />
    </main>
  )
}

export default ProductPage