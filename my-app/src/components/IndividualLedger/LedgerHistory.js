import React, { useState } from "react"
import { useLedgers } from "../../context/LedgerContext"
import LedgerDetails from "./LedgerDetails"
import "./LedgerHistory.css"

const LedgerHistory = () => {
  const { getLedgersByStatus } = useLedgers()
  const [selectedLedger, setSelectedLedger] = useState(null)
  const clearedLedgers = getLedgersByStatus("cleared")

  return (
    <div className="ledger-history">
      <h2>Cleared Ledgers History</h2>
      <div className="ledgers-list">
        {clearedLedgers.map((ledger) => (
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

export default LedgerHistory

