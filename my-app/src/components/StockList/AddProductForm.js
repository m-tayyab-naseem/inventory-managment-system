import React, { useState } from "react"
import { useProducts } from "../../context/ProductContext"
import "./AddProductForm.css"

const AddProductForm = ({ onClose }) => {
  const { state, dispatch,  } = useProducts()
  const [formData, setFormData] = useState({
    modelNumber: "",
    name: "",
    quantity: "",
    price: "",
    originalPrice: "",
    size: "",
    type: "",
    status: "available",
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    // addProduct(formData)
    const response = await fetch('http://localhost:5000/api/products/create',{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json = await response.json();
    if(!response.ok){
        // setError(json.message);

    }
    if(response.ok){
      console.log(json);
        dispatch({type:'CREATE_PRODUCT',payload:json.product});
        setFormData({
            modelNumber: "",
            name: "",
            quantity: "",
            price: "",
            originalPrice: "",
            size: "",
            type: "",
            status: "",
        });
    }
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="add-product-form-overlay">
      <div className="add-product-form">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modelNo">Model No:</label>
            <input type="text" id="modelNo" name="modelNumber" value={formData.modelNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="originalPrice">Original Price:</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              step="0.01"
              value={formData.originalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <input type="text" id="size" name="size" value={formData.size} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm

