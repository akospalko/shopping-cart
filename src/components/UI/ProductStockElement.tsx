// Product display stock infromation
import { ReactElement } from 'react';
import textData from '../../data/textData.json';
import '../index.css';

// TYPE
type ProductStockElementPropsType = {
  stock: number; 
  customStyle?: string 
}

type DisplayedStockType = {
  style: string;
  content: string;
};

const ProductStockElement = ({ stock, customStyle }: ProductStockElementPropsType): ReactElement | null => {
  // ELEMENTS
  // Displayed stock
  let displayedStock: DisplayedStockType = {
    style: '',
    content: '',
  };

  if (!stock) {
    displayedStock = {
      style: 'product-stock-element__coming-soon',
      content: textData["stock-coming-soon"],
    };
  } else if (stock > 3) {
    displayedStock = {
      style: 'product-stock-element__stock--in-stock',
      content: `${ textData["in-stock"] } ${ stock }`,
    };
  } else if (stock > 0) {
    displayedStock = {
      style: 'product-stock-element__stock--low-stock',
      content: `${ textData["last-products"] } (${ stock })`,
    };
  }

  return (
    <span
      title={ displayedStock.content }
      className={ `product-stock-element__container ${ customStyle } ${ displayedStock.style }` }
    >
      { displayedStock.content }
    </span>
  );
};

export default ProductStockElement;
