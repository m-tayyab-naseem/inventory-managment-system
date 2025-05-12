import React, { useState } from "react"
import { IndividualLedgerProvider } from "../../context/IndividualLedgerContext"
import TopNav from "../StockList/TopNav"
import LedgerList from "./LedgerList"
import LedgerDetails from "./LedgerDetails"
import UpdateLedgerForm from "./UpdateLedgerForm"
import CreateNewLedger from "./CreateNewLedger"
import CreateExistingLedger from "./CreateExistingLedger"
import "./IndividualLedger.css"

const IndividualLedger = () => {
  const [view, setView] = useState("options")
  const [selectedLedger, setSelectedLedger] = useState(null)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

  const renderContent = () => {
    switch (view) {
      case "options":
        return (
          <div className="ledger-options">
            <button onClick={() => setView("viewAll")}>View all individual ledgers</button>
            <button onClick={() => setView("createNew")}>Create a new individual ledger for a new customer</button>
            {/* <button onClick={() => setView("createExisting")}>
              Create a new individual ledger for an existing customer
            </button> */}
          </div>
        )
      case "viewAll":
        return (
          <div className="ledger-container">
            <LedgerList
              onSelectLedger={setSelectedLedger}
              onUpdateLedger={(ledger) => {
                setSelectedLedger(ledger)
                setIsUpdateFormOpen(true)
              }}
            />
            {selectedLedger && !isUpdateFormOpen && (
              <LedgerDetails ledger={selectedLedger} onClose={() => setSelectedLedger(null)} />
            )}
            {isUpdateFormOpen && (
              <UpdateLedgerForm
                ledger={selectedLedger}
                onClose={() => {
                  setIsUpdateFormOpen(false)
                  setSelectedLedger(null)
                }}
              />
            )}
          </div>
        )
      case "createNew":
        return <CreateNewLedger onClose={() => setView("options")} />
      case "createExisting":
        return <CreateExistingLedger onClose={() => setView("options")} />
      default:
        return null
    }
  }

  return (
    <IndividualLedgerProvider>
      <div className="individual-ledger-page">
        <div className="ledger-background"></div>
        <TopNav />
        <main className="ledger-content">
          <h1>Individual Ledger Management</h1>
          {renderContent()}
        </main>
      </div>
    </IndividualLedgerProvider>
  )
}

export default IndividualLedger

