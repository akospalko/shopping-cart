// Product view navigation header
import {NavLink} from 'react-router-dom'
import './ProductViewNavigationTabs.css'

// TYPE
type ProductViewNavigationTabsType = {
  path: string;
  tab: string;
}

type ProductViewNavigationTabsPropType = {
  pathSegmentsArray: string[]
}

const ProductViewNavigationTabs = ({pathSegmentsArray}: ProductViewNavigationTabsPropType) => {

  // Store path without last nav tab segment  
  const rootPath = pathSegmentsArray.slice(0, pathSegmentsArray.length - 1).join('/');


  // Tabs[] data  
  const productViewNavigationTabs:ProductViewNavigationTabsType[] = [
    {
      path: `/${rootPath}/about`,
      tab: 'about' 
    },
    {
      path: `/${rootPath}/characteristics`,
      tab: 'characteristics' 
    }
  ]

  return (
    <div className='product-view-navigation-tabs__container'>
      {productViewNavigationTabs.map(navItem => (
      <NavLink 
        key={navItem.tab}
        className={({isActive}) => isActive ? 'product-view-navigation-tabs__tab-item product-view-navigation-tabs__tab-item--active' : 'product-view-navigation-tabs__tab-item'}
        to={navItem.path}
      > 
        <span>{navItem.tab}</span>
      </NavLink>
      ))}
    </div>
  )
}

export default ProductViewNavigationTabs