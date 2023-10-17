// Product view page about tab: display product image and basic info 
import {ProductItemType} from '../types/productsProviderTypes'
import AboutTabProductImage from './AboutTabProductImage'
import AboutTabProductInformation from './AboutTabProductInformation'
import './AboutTab.css'

// TYPE
type AboutTabPropsType = {
  activeProduct: ProductItemType,
}

// COMPONENT
const AboutTab = ({activeProduct}: AboutTabPropsType) => {

  return (
    <div className='about-tab'>
      <AboutTabProductImage activeProduct={activeProduct}/>
      <AboutTabProductInformation activeProduct={activeProduct}/>
    </div>
  )
}

export default AboutTab