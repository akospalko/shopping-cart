// Opened product detailed view
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductViewHeader from './ProductViewNavigation';
import { ProductItemType } from '../types/productsProviderTypes';
import AboutTab from './AboutTab';
import CharacteristicsTab from './CharacteristicsTab';
import { PRODUCT_VIEW_TAB } from '../utility/constants';
import './ProductView.css';

// TYPES
type ProductViewHeaderPropsType = {
  activeTab: string
}
// INITIALIZER
const activeProductInitializer: ProductItemType = {
  sku: '',
  name: '',
  price: 0,
  priceDiscount: 0,
  stock: 0,
  category: '',
  description: '',
  warranty: '',
  retailer: '',
  calculatedRatingAvg: 0,
  review: [],
  properties: undefined
}

const ProductView = ({activeTab}:ProductViewHeaderPropsType) => {
  // ROUTE
  const { product } = useParams();

  // CONTEXT
  const { products } = useProducts();
  
  // STATE
  const [activeProduct, setActiveProduct] = useState<ProductItemType>(activeProductInitializer);

  // EFFECT
  // Get product id from pathname and update active product 
  useEffect(() => {
    const updateActiveProduct = (productID: string) => {
      const foundProduct = products?.find(product => product.sku === productID);
      if (foundProduct !== undefined) {
        setActiveProduct(foundProduct);
      }
    };

    // If context's product ID is not available, use URL parameter
    const filteredProductURL = product?.split('-') || [];
    const productID = filteredProductURL[filteredProductURL.length - 1];
    updateActiveProduct(productID);
  }, [product, products]);

  // ELEMENTS
  // about
  const aboutContent = <AboutTab activeProduct={activeProduct}/>
  // characteristics
  const characteristicsTab = <CharacteristicsTab activeProduct={activeProduct}/>

  // DISPLAYED TAB
  // conditionally display tabs
  let displayedTab = aboutContent;
  switch(activeTab) {
    case PRODUCT_VIEW_TAB.CHARACTERISTICS:
      displayedTab = characteristicsTab;
      break;
    case PRODUCT_VIEW_TAB.ABOUT:
      displayedTab = aboutContent;
      break;
    default: 
      displayedTab = aboutContent;
  }

  return (
    <main className='main main__product-page'>
      <div className='product-view'>
        <ProductViewHeader/>
        { displayedTab }
      </div>
    </main>
  )
}

export default ProductView;