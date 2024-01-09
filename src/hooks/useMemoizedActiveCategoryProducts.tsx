// Return memoized active category products
import { useMemo } from 'react';
import { ProductItemType } from '../types/productsProviderTypes';
import useProducts from './useProducts';

const useMemoizedActiveCategoryProducts = () => {
  // CONTEXT
  const { categoryProducts } = useProducts();
  
  // MEMO
  const activeCategoryProducts: ProductItemType[] = useMemo(() => {
    return categoryProducts?.length ? categoryProducts : [];
  }, [categoryProducts]);

  return activeCategoryProducts;
}

export default useMemoizedActiveCategoryProducts;