import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import useProducts from "./hooks/useProducts";
import ErrorPage from "./components/ErrorPage";
import ProductPage from "./components/ProductPage";
import ProductView from "./components/ProductView";
import ProductSearchPage from "./components/ProductSearchPage";

// CONSTANT
const CONSTANT = {
  CHARACTERISTICS: "CHARACTERISTICS",
  ABOUT: "ABOUT"
}

function App() {

  // STATE
  const [viewCart, setViewCart] = useState<boolean>(false);

  // CONTEXT
  const { products, filteredProducts } = useProducts();

  return (
    <div className="page">
      <Header viewCart={ viewCart } setViewCart={ setViewCart }/>
      <Routes>
        <Route path="/cart" element={ <CartPage/> }/>
        <Route path="/:category/:page?" element={ <ProductPage productData={ products }/> }/>
        <Route path="/:category/product/:product/about" element={ <ProductView activeTab={ CONSTANT.ABOUT }/> } />  
        <Route path="/:category/product/:product/characteristics" element={ <ProductView activeTab={ CONSTANT.CHARACTERISTICS }/> }/>  
        <Route path="/search/:page?" element={ <ProductSearchPage productData={ filteredProducts }/> }/>  
        <Route path="/" element={ <Navigate to="/all/1"/> }/>
        
        {/* <Route path="/*" element={ <Navigate to="/error"/> }/> */}
        <Route path="/error" element={ <ErrorPage content={ { title: "test", subtitle: "test" } }/> }/>
      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App;