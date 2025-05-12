import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContext";
import ProductDetail from "./ProductDetail";
import UpdateForm from "./UpdateForm";
import "./ProductList.css";

const ProductList = () => {
  const { products, dispatch, searchTerm } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleDelete = async (modelNumber) => {
    const response = await fetch("http://localhost:5000/api/products/" + modelNumber, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json.product });
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsUpdateFormOpen(true);
  };

  return (
    <div className="product-list">
      {products &&
        (searchTerm
          ? products
              .filter(
                (product) =>
                  product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-info" onClick={() => handleProductClick(product)}>
                    <span className="model-no">{product.modelNumber}</span>
                    <span className="name">{product.name}</span>
                    <span className="quantity">Qty: {product.quantity}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <div className="product-actions">
                    <button className="update-btn" onClick={() => handleUpdate(product)}>
                      Update
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.modelNumber)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
          : products.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info" onClick={() => handleProductClick(product)}>
                  <span className="model-no">{product.modelNumber}</span>
                  <span className="name">{product.name}</span>
                  <span className="quantity">Qty: {product.quantity}</span>
                  <span className="price">${product.price}</span>
                </div>
                <div className="product-actions">
                  <button className="update-btn" onClick={() => handleUpdate(product)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product.modelNumber)}>
                    Delete
                  </button>
                </div>
              </div>
            )))}

      {selectedProduct && isDetailOpen && (
        <ProductDetail product={selectedProduct} onClose={() => setIsDetailOpen(false)} />
      )}

      {selectedProduct && isUpdateFormOpen && (
        <UpdateForm product={selectedProduct} onClose={() => setIsUpdateFormOpen(false)} />
      )}
    </div>
  );
};

export default ProductList;
