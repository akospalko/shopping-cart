/* NOTE:
The context fetches mokup data from fake server using json-server
- json-server set up:
  -- create folder with json data 
  -- run json-server: npx json-server -w data/products.json -p 3500
    -- -w - watch dir/file.ext - watch file for changes at specified path
    -- -p portNum - specify port for resource link      
  -- create fetch function, specify resource link (localhost at port xy)
*/
import {createContext, ReactElement, useState, useEffect} from 'react';

// Create product type
export type ProductType = {
  sku: string,
  name: string,
  price: number
}


// Init state - dynamicly populated items
const initState: ProductType[] = []
// Init state - static items
// const initState: ProductType[] = [
//   {
//     "sku": "item0001",
//     "name": "Widget",
//     "price": 9.99
//   },
//   {
//     "sku": "item0002",
//     "name": "Premium Widget",
//     "price": 19.99
//   },
//   {
//     "sku": "item0003",
//     "name": "Deluxe Widget",
//     "price": 29.99
//   }
// ]; 

// Create type for init context state by mocking produts.json's content: {products: [{},{},...]}    
export type UseProductContextType = {products: ProductType[]}
// Init context state
const initContextState: UseProductContextType = { products: []}

// Create context
const ProductsContext = createContext<UseProductContextType>(initContextState)

// SET UP CONTEXT PROVIDER
// type for provider children 
type ChildrenType = {children?: ReactElement | ReactElement[]}

// provider
export const ProductsProvider = ({children}: ChildrenType) => {

  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch('http://localhost:3500/products') // create a json-server (mokup data): npx json-server -w data/products.json -p 3500 
      .then(res => {
        return res.json()
      })
      .catch(err => {
        if(err instanceof Error) {
          console.log(err)
        }
      })

      return data
    }

    // fetch data, update state
    fetchProducts().then(products => setProducts(products))
  }, [])

 return(
    <ProductsContext.Provider value={{products}}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext