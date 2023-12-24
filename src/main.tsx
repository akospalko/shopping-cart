import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.tsx";
import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/FilterProvider.tsx";
import { NavigationMenuProvider } from "./context/NavigationMenuProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <NavigationMenuProvider>
              <App/>
            </NavigationMenuProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
