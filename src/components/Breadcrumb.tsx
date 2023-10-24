// Breadcrumb for displaying routes
import {NavLink} from 'react-router-dom';
import {HomeIcon} from './SVGComponents'
import useIsHovered from '../hooks/useIsHovered';
import './Breadcrumb.css'

// TYPES
type BreadcrumbSegmentsType = {
  breadcrumb?: string | undefined,
  urlPath: string
}

type BreadcrumbPropsType = {
  pathSegmentsArray: string[]
}

// COMPONENT
const Breadcrumb = ({pathSegmentsArray}: BreadcrumbPropsType) => {

  // HOOK
  const {isElementHovered, elementMouseEnter, elementMouseLeave} = useIsHovered();

  // url page route params as breadcrumb
  let urlPath = ''; 
  // breadcrumb route
  const breadcrumbSegments:BreadcrumbSegmentsType[] = [];

  // create breadcrumbs and url route
  pathSegmentsArray.forEach((segment, i) => {
    urlPath += `/${segment}`;
    // Handle last segment (tab name)
    if (i === pathSegmentsArray.length - 1) {
      breadcrumbSegments.push({breadcrumb: '', urlPath: urlPath});
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
      onMouseEnter={elementMouseEnter}
      onMouseLeave={elementMouseLeave}
    >
      <HomeIcon 
        width='25px' 
        height='25px' 
        stroke={isElementHovered ? 'var(--color-1)' : 'var(--color-3)'}
        wrapperCustomStyle={{'width': '45px', 'justifyContent': 'flex-start'}}
      />
    </NavLink>
  )

  const displayedSegments = () => {
    const nonEmptySegments = breadcrumbSegments.filter(
      (segmentObj) => segmentObj.breadcrumb && segmentObj.breadcrumb !== ''
    );
  
    return nonEmptySegments.map((segmentObj, i) => {
      if (i === nonEmptySegments.length - 1) {
        // Render the last non-empty segment as a div
        return (
          <div key={i} className="breadcrumb__item breadcrumb__item--non-selectable">
            {segmentObj.breadcrumb}
          </div>
        );
      } else {
        // Render other non-empty segments as NavLink
        return (
          <div key={i} className="breadcrumb__item">
            <NavLink to={segmentObj.urlPath}>{segmentObj.breadcrumb}</NavLink>
            {i < nonEmptySegments.length - 1 && <span>/</span>}
          </div>
        );
      }
    });
  };

  return (
    <div className='breadcrumb'>
      {navToHomeLink}
      {displayedSegments()}
    </div>
  )
}

export default Breadcrumb