import {useState} from "react"
import {Route, Routes, Navigate} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CartPage from "./components/CartPage"
import useProducts from "./hooks/useProducts"
import StatusPage from "./components/StatusPage"
import ProductPage from "./components/ProductPage"
import ProductView from "./components/ProductView"

// CONSTANT
const CONSTANT = {
  CHARACTERISTICS: 'CHARACTERISTICS',
  ABOUT: 'ABOUT'
}

function App() {

  // STATE
  const [viewCart, setViewCart] = useState<boolean>(false);

  // CONTEXT
  const {products, filteredProducts} = useProducts()

  return (
    <div className="page">
      <Header viewCart={viewCart} setViewCart={setViewCart}/>
      <Routes>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/:category/:page" element={<ProductPage productData={products}/>}/>
        <Route path="/:category/product/:product/about" element={<ProductView activeTab={CONSTANT.ABOUT}/>} />  
        <Route path="/:category/product/:product/characteristics" element={<ProductView activeTab={CONSTANT.CHARACTERISTICS}/>}/>  
        <Route path="/search/:page" element={<ProductPage productData={filteredProducts}/>}/>  
        <Route path="/search/no-result" element={<StatusPage statusType='noSearchResult'/>}/>
        <Route path="/search/empty" element={<StatusPage statusType='emptySearchResult'/>}/>
        <Route path="/error" element={<StatusPage statusType='error'/>}/>
        <Route path="/" element={<Navigate to='/all/1'/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App