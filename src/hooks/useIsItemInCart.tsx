    // Check value if an item is added to cart
    import { useEffect, useState } from 'react'
    import { CartItemType } from '../types/cartProviderTypes';
    import { ProductItemType } from '../types/productsProviderTypes';

    // CUSTOM HOOK
    export const useIsItemInCart = (cartItems: CartItemType[], product: ProductItemType): boolean => {

      // STATE
      const [isInCart, setIsInCart] = useState<boolean>(false);

      // EFFECT
      // find if the product is in cart, return boolean result
      useEffect(() => {
        if(!product) { 
          setIsInCart(false);
        } else {
          const result = cartItems.some((item: CartItemType) => item.sku === product.sku)
          setIsInCart(result)
        }
        
      }, [cartItems, product])

      return isInCart
    }