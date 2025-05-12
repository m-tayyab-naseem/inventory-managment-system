import React, { useState } from "react"
import { useIndividualLedgers } from "../../context/IndividualLedgerContext"
import { FaTimes, FaPlus } from "react-icons/fa"
import "./UpdateLedgerForm.css"

const UpdateLedgerForm = ({ ledger, onClose }) => {
  const { updateLedger, dispatch } = useIndividualLedgers()
  const [formData, setFormData] = useState(ledger)
  const [localInstallment, setLocalInstallment] = useState({
    installmentId: "",
    date: "",
    installmentPaid: "",
  })
  // const [allInstallments,setAllInstallments] = useState([ledger]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target
    setLocalInstallment({ ...localInstallment, [name]: value })
  }

  const handleAddInstallment = () => {
    if (localInstallment.installmentId && localInstallment.installmentPaid) {
      const updatedInstallments = [...formData.installments, localInstallment]
      const totalPaid = updatedInstallments.reduce((sum, inst) => sum + Number(inst.installmentPaid), 0)
      setFormData({
        ...formData,
        installments: updatedInstallments
      })
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await fetch('http://192.168.58.2:32312/api/ledger/' + ledger._id + '/installment',{
      method:'POST',
      body:JSON.stringify({formData,localInstallment}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:'UPDATE_INDI_LEDGER',payload:json.ledger})
      setLocalInstallment({ installmentId: "", date: "", installmentPaid: "" })

    }
    onClose()
  }

  return (
    <div className="update-ledger-overlay">
      <div className="update-ledger-form">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Update Ledger</h2>
        <form onSubmit={handleSubmit}>
          <div className="installments">
            <h3>Installments</h3>
            <table>
              <thead>
                <tr>
                  <th>Receipt ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {formData.installments.map((installment) => (
                  <tr key={installment.installmentId}>
                    <td>{installment.installmentId}</td>
                    <td>{Date(installment.datePaid)}</td>
                    <td>${installment.installmentPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="new-installment">
            <h4>Add New Installment</h4>
            <div className="form-group">
              <label htmlFor="newReceiptId">Receipt ID:</label>
              <input
                type="text"
                id="newReceiptId"
                name="installmentId"
                value={localInstallment.installmentId}
                onChange={handleInstallmentChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newAmount">Amount:</label>
              <input
                type="number"
                id="newAmount"
                name="installmentPaid"
                value={localInstallment.installmentPaid}
                onChange={handleInstallmentChange}
              />
            </div>
            <button type="button" className="add-installment-btn" onClick={handleAddInstallment}>
              <FaPlus /> Add Installment
            </button>
          </div>
          <button type="submit" className="submit-btn">
            Update Ledger
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateLedgerForm

