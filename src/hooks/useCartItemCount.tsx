// Calculate and return number value of items that are inside the shopping cart
import { useState, useEffect } from 'react';
import { CartItemType } from '../types/cartProviderTypes';
import { ProductItemType } from '../types/productsProviderTypes';

// CUSTOM HOOK
const useCartItemCount = (cartItems: CartItemType[], product: ProductItemType): number => {
  
  // STATE
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  
  // EFFECT
  useEffect(() => {
    const foundItem = cartItems.find((item: CartItemType) => item.sku === product.sku);
    if(!foundItem) {
      setCartItemCount(0)
    } else {
      setCartItemCount(foundItem?.qty as number)
    }
  }, [cartItems, product.sku])
  

  return cartItemCount
}

export default useCartItemCount