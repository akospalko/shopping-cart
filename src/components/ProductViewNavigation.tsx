// Product view navigation header to display: breadcrumb and product view navigation tabs
import Breadcrumb from './Breadcrumb'
import ProductViewNavigationTabs from './ProductViewNavigationTabs'
import './ProductViewNavigation.css'
import {useLocation} from 'react-router-dom';

// COMPONENT
const ProductViewNavigation = () => {

  // ROUTE
  const location = useLocation()
  const pathSegmentsArray = location.pathname.split('/').filter(segment => segment !== '');

  return (
    <div className='product-view-navigation'>
      <Breadcrumb pathSegmentsArray={pathSegmentsArray}/>
      <ProductViewNavigationTabs pathSegmentsArray={pathSegmentsArray}/>
    </div>
  )
}

export default ProductViewNavigation