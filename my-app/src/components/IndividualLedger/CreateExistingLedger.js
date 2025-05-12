import React, { useState } from "react"
import { useIndividualLedgers } from "../../context/IndividualLedgerContext"
import { FaTimes } from "react-icons/fa"
import "./CreateLedger.css"

const CreateExistingLedger = ({ onClose }) => {
  const { addLedger, ledgers } = useIndividualLedgers()
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [formData, setFormData] = useState({
    productName: "",
    productModelNumber: "",
    totalAmount: "",
    firstInstallment: "",
  })

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const customer = ledgers.find((ledger) => ledger.customerId === selectedCustomer)
    const newLedger = {
      customerId: customer.customerId,
      customerName: customer.customerName,
      phoneNumber: customer.phoneNumber,
      ...formData,
      totalAmountPaid: Number(formData.firstInstallment),
      dueAmount: Number(formData.totalAmount) - Number(formData.firstInstallment),
      status: "pending",
      installments: [
        {
          receiptId: `REC${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          amount: Number(formData.firstInstallment),
        },
      ],
    }
    addLedger(newLedger)
    onClose()
  }

  return (
    <div className="create-ledger-form">
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Create New Ledger for Existing Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Select Customer:</label>
          <select id="customerId" name="customerId" value={selectedCustomer} onChange={handleCustomerChange} required>
            <option value="">Select a customer</option>
            {ledgers.map((ledger) => (
              <option key={ledger.customerId} value={ledger.customerId}>
                {ledger.customerName} ({ledger.customerId})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productModelNumber">Product Model Number:</label>
          <input
            type="text"
            id="productModelNumber"
            name="productModelNumber"
            value={formData.productModelNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount:</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstInstallment">First Installment:</label>
          <input
            type="number"
            id="firstInstallment"
            name="firstInstallment"
            value={formData.firstInstallment}
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

export default CreateExistingLedger

