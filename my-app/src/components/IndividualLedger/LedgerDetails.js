import React from "react"
import { FaTimes } from "react-icons/fa"
import "./LedgerDetails.css"

const LedgerDetails = ({ ledger, onClose }) => {
  return (
    <div className="ledger-details-overlay">
      <div className="ledger-details">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Ledger Details</h2>
        <div className="ledger-info">
          <p>
            <strong>Ledger ID:</strong> {ledger.id}
          </p>
          <p>
            <strong>Customer ID:</strong> {ledger.customer.customerId}
          </p>
          <p>
            <strong>Customer Name:</strong> {ledger.customer.name}
          </p>
          <p>
            <strong>Product Name:</strong> {ledger.product?.name || "No Product"}
          </p>
          <p>
            <strong>Product Model Number:</strong> {ledger.product?.modelNumber || "None"}
          </p>
          <p className="amount paid">
            <strong>Total Amount Paid:</strong> ${ledger.totalAmountPaid}
          </p>
          <p className="amount due">
            <strong>Due Amount:</strong> ${ledger.dueAmount}
          </p>
          <p className={`status ${ledger.status}`}>
            <strong>Status:</strong> {ledger.status}
          </p>
        </div>
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
              {ledger && ledger.installments.map((installment) => (
                <tr key={installment.installmentId}>
                  <td>{installment.installmentId}</td>
                  <td>{installment.datePaid}</td>
                  <td>${installment.installmentPaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LedgerDetails

