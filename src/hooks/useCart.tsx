// custom hook to consume CartContext & export  
import {useContext} from 'react'
import CartContext, { UserCartContextType } from '../context/CartProvider' 

const useCart = (): UserCartContextType => {
  return useContext(CartContext)
}

export default useCart