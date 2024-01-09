// TODO: Add routes for reviews 
import { Route, Routes, Navigate } from "react-router-dom";
import ProductSearchPage from "./components/ProductSearchPage";
import Layout from "./components/layout/Layout";
import ErrorPage from "./components/ErrorPage";
import CartPage from "./components/CartPage";
import ProductView from "./components/ProductView";
import MemoizedProductPage from "./components/ProductPage";
import { PRODUCT_VIEW_TAB } from "./utility/constants";

const App = () => {
  return (
    <div className="page">
      <Routes>
        <Route path="/cart" element={ 
          <Layout>
            <CartPage/> 
          </Layout>
        }/>
        <Route path="/:category/:page?" element={
          <Layout>
            <MemoizedProductPage/> 
          </Layout>
        }/>
        <Route path="/:category/product/:product/about" element={ 
          <Layout>
            <ProductView activeTab={ PRODUCT_VIEW_TAB.ABOUT }/>
          </Layout>
        }/>  
        <Route path="/:category/product/:product/characteristics" element={ 
            <Layout>
              <ProductView activeTab={ PRODUCT_VIEW_TAB.CHARACTERISTICS }/> 
            </Layout>
        }/>  
        {/* TODO: <Route path="/:category/product/:product/reviews" element={ <ProductView activeTab={ PRODUCT_VIEW_TAB.REVIEWS }/> }/> */}
        <Route path="/search/:page?" element={ 
            <Layout>
              <ProductSearchPage/> 
            </Layout>
        }/>  
        <Route path="/" element={ <Navigate to="/all/1"/> }/>
        {/* <Route path="/*" element={ <Navigate to="/error"/> }/> */}
        <Route path="/error" element={ 
          <Layout>
            <ErrorPage content={ { title: "test", subtitle: "test" } }/> 
          </Layout>
        }/>
      </Routes>
    </div>
  )
}

export default App;