// custom hook to consume CartContext & export  
import { useContext } from 'react'
import CartContext from '../context/CartProvider' 
import { UserCartContextType } from '../types/cartProviderTypes'

const useCart = (): UserCartContextType => {
  return useContext(CartContext)
}

export default useCart