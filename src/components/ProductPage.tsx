import {useEffect, useState, ReactElement} from 'react'
import './ProductList.css'
import {ProductItemType} from '../types/productsProviderTypes'
import Pagination from './Pagination'
import ProductList from './ProductList'

// TYPE
type PropsType = {
  productsData: ProductItemType[] | undefined
}

// COMPONENT
const ProductPage = ({productsData}: PropsType) => {

  // EFFECT
  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', 'products');
  }, [])

    // STATE
    const [activePage, setActivePage] = useState<number>(1);

    // CONSTANT VALUES
    const itemsPerPage = 1;

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
        <ProductList productsData={paginatedProducts} />
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