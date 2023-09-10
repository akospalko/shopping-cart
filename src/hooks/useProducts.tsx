// custom hook to consume ProductContext & export
import { useContext } from "react"
import ProductsContext, { UseProductContextType } from "../context/ProductsProvider"

const useProducts = ():UseProductContextType => {
  return useContext(ProductsContext)
}

export default useProducts