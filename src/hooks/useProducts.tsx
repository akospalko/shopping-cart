// custom hook to consume ProductContext & export
import { useContext } from "react"
import ProductsContext from "../context/ProductsProvider"
import {UseProductContextType} from '../types/productsProviderTypes'

const useProducts = ():UseProductContextType => {
  return useContext(ProductsContext)
}

export default useProducts