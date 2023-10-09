// Product view breadcrumb   
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon } from './SVGComponents'
import './ProductViewBreadcrumb.css'

// TYPES
type BreadcrumbSegmentsType = {
  breadcrumb: string,
  urlPath: string
}

// COMPONENT
const BreadcrumbNavigation = () => {
  // ROUTE
  const location = useLocation()
  const pathSegmentsArray = location.pathname.split('/').filter(segment => segment !== '');

  // url page route params as breadcrumb
  let urlPath = ''; 
  // breadcrumb route
  const breadcrumbSegments:BreadcrumbSegmentsType[] = [];

  // create breadcrumbs and url route
  pathSegmentsArray.forEach((segment, i) => {
    urlPath += `/${segment}`;
    // Handle last segment (tab name)
    if (i === pathSegmentsArray.length - 1) {
      breadcrumbSegments.push({breadcrumb: segment, urlPath: urlPath});
    }
    // Handle product name segment 
    else if (i === pathSegmentsArray.length - 2) {
      breadcrumbSegments.push({breadcrumb: segment, urlPath: `${urlPath}/about`});
    }
    // Handle category segment
    else if (i === 0) {
      breadcrumbSegments.push({breadcrumb: segment, urlPath: `/${segment}/1`});
    }
    // Handle unclickable 'product' breadcrumb segment
    else if (segment !== 'product') {
      breadcrumbSegments.push({breadcrumb: segment, urlPath: urlPath});
    }
  });

  // ELEMENT
  // navigate to home link
  const navToHomeLink = (
    <NavLink 
      to='/all/1'
      className='product-view-breadcrumb__home-link'
    >
      <HomeIcon width='25px' height='25px' stroke='var(--color-2)'/>
    </NavLink>
  )

  return (
    <div className='product-view-breadcrumb'>
      {navToHomeLink}
      {breadcrumbSegments.map((segmentObj, i) => (
        <div 
          key={i}
          className='product-view-breadcrumb_item'
        >
          <NavLink to={segmentObj.urlPath}>{segmentObj.breadcrumb}</NavLink>
          {i < breadcrumbSegments.length - 1 && <span>/</span>}
        </div>
      ))}
    </div>
  )
}

export default BreadcrumbNavigation