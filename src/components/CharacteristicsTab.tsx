// Product view characteristics tab
import {ProductItemType} from '../types/productsProviderTypes'
import { 
  ProductProcessorPropertyType,
  ProductRamPropertyType,
  ProductVideoCardPropertyType,
  ProductMobilePropertyType
} from '../types/productsProviderTypes';
import './CharacteristicsTab.css'

// TYPE
type CharacteristicsTabPropsType = {
  activeProduct: ProductItemType,
}

type ProductPropsType = 
ProductProcessorPropertyType[keyof ProductProcessorPropertyType] |
ProductRamPropertyType[keyof ProductRamPropertyType] |
ProductVideoCardPropertyType[keyof ProductVideoCardPropertyType] |
ProductMobilePropertyType[keyof ProductMobilePropertyType] |
undefined;

// COMPONENT
const CharacteristicsTab = ({activeProduct}: CharacteristicsTabPropsType) => {

  // PROP
  const {properties} = activeProduct;
  
  // ELEMENTS
  // Product name
  const productName = (
    <div className='characteristics-tab__product-name'>
      <h2>{activeProduct?.name}</h2>
    </div>
  )
  
  // Products' properties
  const displayedProductProperties = (currentProps: ProductPropsType | undefined) => {
    if(currentProps === undefined) return <span>{'No properties to display'}</span>;
    if(Array.isArray(currentProps) && currentProps.length) {
      return (
        <ul className='characteristics-tab__nested-properties'>
          {currentProps?.map((nestedProp, i) => (
          <li key={i} className='characteristics-tab__nested-values'>{nestedProp}</li>
          ))}
        </ul>
      ) 
    } else {
      return <span>{currentProps}</span>
    }
  }

  // Displayed characteristics content
  const propertyKeys = Object.keys(properties ?? {})
  const displayedCharacteristics = propertyKeys?.map((property, i) => {
    return (
      <div key={i} className='characteristics-tab__item'>
        <dt className='characteristics-tab__label'>
          <span>{property}</span>
        </dt>
        <dd className='characteristics-tab__value'>
          {displayedProductProperties(properties?.[property as keyof ProductPropsType])}
        </dd>
      </div>
    )
  })

  return (
    <div className='characteristics-tab'>
      {productName}
      <dl className='characteristics-tab__items'>
        {displayedCharacteristics}
      </dl>
    </div>
  )
}

export default CharacteristicsTab