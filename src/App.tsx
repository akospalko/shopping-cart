import {useState} from "react"
import {Route, Routes, Navigate} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import useProducts from "./hooks/useProducts"
import StatusPage from "./components/StatusPage"
import ProductPage from "./components/ProductPage"

function App() {

  // STATE
  const [viewCart, setViewCart] = useState<boolean>(false);

  // CONTEXT
  const {products, filteredProducts} = useProducts()

  return (
    <div className="page">
      <Header viewCart={viewCart} setViewCart={setViewCart}/>
      <Routes>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/products/search/:page" element={<ProductPage productsData={filteredProducts}/>}/>  
        <Route path="/products/:page" element={<ProductPage productsData={products}/>}/>
        <Route path="/products/search/no-result" element={<StatusPage statusType='noSearchResult'/>}/>
        <Route path="/products/search/empty" element={<StatusPage statusType='emptySearchResult'/>}/>
        <Route path="/error" element={<StatusPage statusType='error'/>}/>
        <Route path="/" element={<Navigate to='/products/1'/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App