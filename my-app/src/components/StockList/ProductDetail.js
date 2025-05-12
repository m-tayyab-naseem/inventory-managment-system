import React from "react"
import "./ProductDetail.css"

const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="product-detail-overlay">
      <div className="product-detail">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Product Details</h2>
        <div className="detail-content">
          <div className="detail-row">
            <span>Model No:</span>
            <span>{product.modelNumber}</span>
          </div>
          <div className="detail-row">
            <span>Name:</span>
            <span>{product.name}</span>
          </div>
          <div className="detail-row">
            <span>Quantity:</span>
            <span>{product.quantity}</span>
          </div>
          <div className="detail-row">
            <span>Price:</span>
            <span>${product.price}</span>
          </div>
          <div className="detail-row">
            <span>Original Price:</span>
            <span>${product.originalPrice}</span>
          </div>
          <div className="detail-row">
            <span>Size:</span>
            <span>{product.size}</span>
          </div>
          <div className="detail-row">
            <span>Type:</span>
            <span>{product.type}</span>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <span>{product.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

