import React, { useState } from "react"
import { useLedgers } from "../../context/LedgerContext"
import LedgerDetails from "./LedgerDetails"
import "./ViewLedgers.css"

const ViewLedgers = () => {
  const { getAllLedgers, setSearchTerm } = useLedgers()
  const [selectedLedger, setSelectedLedger] = useState(null)
  const ledgers = getAllLedgers()

  return (
    <div className="view-ledgers">
      <h2>Current Individual Ledgers</h2>
      <div className="ledgers-list">
        {ledgers.map((ledger) => (
          <div key={ledger.id} className="ledger-item" onClick={() => setSelectedLedger(ledger)}>
            <span>Model: {ledger.modelNumber}</span>
            <span>Customer: {ledger.customerName}</span>
            <span>ID: {ledger.customerId}</span>
            <span className="status">Status: {ledger.status}</span>
          </div>
        ))}
      </div>
      {selectedLedger && <LedgerDetails ledger={selectedLedger} onClose={() => setSelectedLedger(null)} />}
    </div>
  )
}

export default ViewLedgers

