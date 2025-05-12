import React, { useState } from "react"
import TopNav from "./TopNav"
import ProductList from "./ProductList"
import AddProductForm from "./AddProductForm"
import { ProductProvider } from "../../context/ProductContext"
import "./StockList.css"

const StockList = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  return (
    <ProductProvider>
      <div className="stock-list-page">
        <div className="stock-list-background"></div>
        <TopNav />
        <main className="stock-list-content">
          <div className="stock-list-header">
            <h1>Stock List Management</h1>
            <button className="add-product-btn" onClick={() => setIsAddFormOpen(true)}>
              Add Product
            </button>
          </div>
          <ProductList />
          {isAddFormOpen && <AddProductForm onClose={() => setIsAddFormOpen(false)} />}
        </main>
      </div>
    </ProductProvider>
  )
}

export default StockList

