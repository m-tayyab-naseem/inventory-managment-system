import React, { useState } from "react"
import { useProducts } from "../../context/ProductContext"
import "./UpdateForm.css"

const UpdateForm = ({ product, onClose }) => {
  const { state, dispatch, updateProduct } = useProducts()
  const [formData, setFormData] = useState(product)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/api/products/' + formData.modelNumber,{
      method:'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const json = await response.json();
    if(!response.ok){
      console.log(json.message)
    }
    if(response.ok){
      dispatch({type:'UPDATE_PRODUCT',payload:json.product})
      // updateProduct(formData);
    }

    // updateProduct(formData)
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
    <div className="update-form-overlay">
      <div className="update-form">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="modelNo">Model No:</label>
              {/* <input type="text" id="modelNo" name="modelNumber" value={formData.modelNumber} onChange={handleChange} required/> */}
              <h3>{formData.modelNumber}</h3>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" step="0.01" value={formData.price} onChange={handleChange} required/>
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
              <input type="text" id="size" name="size" value={formData.size} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm

