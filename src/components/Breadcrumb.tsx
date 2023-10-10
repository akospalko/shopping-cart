// Breadcrumb for displaying routes
import {useState} from 'react'
import {NavLink} from 'react-router-dom';
import {HomeIcon} from './SVGComponents'
import './Breadcrumb.css'

// TYPES
type BreadcrumbSegmentsType = {
  breadcrumb: string,
  urlPath: string
}

type BreadcrumbPropsType = {
  pathSegmentsArray: string[]
}

// COMPONENT
const Breadcrumb = ({pathSegmentsArray}: BreadcrumbPropsType) => {

  // STATE
  const [isIconHovered, setIsIconHovered] = useState<boolean>(false);

  // HANDLERS
  // Home icon mouse enter
  const iconMouseEnter = () => {
    setIsIconHovered(true);
  };

  // Home icon mouse leave
  const iconMouseLeave = () => {
    setIsIconHovered(false);
  };

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
      className='breadcrumb__home-link'
      onMouseEnter={iconMouseEnter}
      onMouseLeave={iconMouseLeave}
    >
      <HomeIcon 
        width='20px' 
        height='20px' 
        stroke={isIconHovered ? 'var(--color-1)' : 'var(--color-3)'}
      />
    </NavLink>
  )

  return (
    <div className='breadcrumb'>
      {navToHomeLink}
      {breadcrumbSegments.map((segmentObj, i) => (
        <div 
          key={i}
          className='breadcrumb__item'
        >
          <NavLink to={segmentObj.urlPath}>{segmentObj.breadcrumb}</NavLink>
          {i < breadcrumbSegments.length - 1 && <span>/</span>}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb