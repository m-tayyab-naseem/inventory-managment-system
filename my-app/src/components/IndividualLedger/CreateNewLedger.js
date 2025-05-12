import React, { useState } from "react"
import { useIndividualLedgers } from "../../context/IndividualLedgerContext"
import { FaTimes } from "react-icons/fa"
import "./CreateLedger.css"

const CreateNewLedger = ({ onClose }) => {
  const { addLedger,dispatch, state } = useIndividualLedgers()
  const [formData, setFormData] = useState({
    id:null,
    customerId: null,
    customerName: "",
    phoneNumber: "",
    modelNumber: "",
    firstInstallmentAmount: null,
    installmentId:null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://192.168.58.2:32312/api/ledger',{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await response.json();
    console.log(json)
    if(!response.ok){
      alert(json.details)
      console.log(json.details)
    }
    if(response.ok){
      setFormData({
        id:"",
        customerId: "",
        customerName: "",
        phoneNumber: "",
        modelNumber: "",
        firstInstallmentAmount: "",
        installmentId:""
      })
      dispatch({type:'CREATE_INDI_LEDGER',payload:json})
      
    }
    onClose()
  }

  return (
    <div className="create-ledger-form">
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Create New Ledger for New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Ledger Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerId">Customer Id:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="productModelNumber">Product Model Number:</label>
          <input
            type="text"
            id="productModelNumber"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">First Installment Receipt Id:</label>
          <input
            type="text"
            id="totalAmount"
            name="installmentId"
            value={formData.installmentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstInstallment">First Installment:</label>
          <input
            type="number"
            id="firstInstallment"
            name="firstInstallmentAmount"
            value={formData.firstInstallmentAmount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Ledger
        </button>
      </form>
    </div>
  )
}

export default CreateNewLedger

