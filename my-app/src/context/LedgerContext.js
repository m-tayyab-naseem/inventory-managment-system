import React, { createContext, useState, useContext } from "react"

const LedgerContext = createContext()

// Sample initial data
const initialLedgers = [
  {
    id: 1,
    customerId: "CUS001",
    customerName: "John Doe",
    phoneNumber: "123-456-7890",
    modelNumber: "TH-001",
    receiptNumber: "REC001",
    totalAmount: 2000,
    paidAmount: 1500,
    dueAmount: 500,
    status: "pending",
    installments: [
      { id: 1, date: "2024-01-15", amount: 1000 },
      { id: 2, date: "2024-02-15", amount: 500 },
    ],
  },
  {
    id: 2,
    customerId: "CUS002",
    customerName: "Jane Smith",
    phoneNumber: "098-765-4321",
    modelNumber: "TH-002",
    receiptNumber: "REC002",
    totalAmount: 1500,
    paidAmount: 1500,
    dueAmount: 0,
    status: "cleared",
    installments: [
      { id: 1, date: "2024-01-10", amount: 750 },
      { id: 2, date: "2024-02-10", amount: 750 },
    ],
  },
]

export const LedgerProvider = ({ children }) => {
  const [ledgers, setLedgers] = useState(initialLedgers)

  const addLedger = (newLedger) => {
    setLedgers([
      ...ledgers,
      {
        ...newLedger,
        id: ledgers.length + 1,
        paidAmount: newLedger.firstInstallment,
        dueAmount: newLedger.totalAmount - newLedger.firstInstallment,
        status: "pending",
        installments: [
          {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            amount: newLedger.firstInstallment,
          },
        ],
      },
    ])
  }

  const getLedgersByStatus = (status) => {
    return ledgers.filter((ledger) => ledger.status === status)
  }

  const getAllLedgers = () => {
    return ledgers.filter((ledger) => ledger.status === "pending")
  }

  return (
    <LedgerContext.Provider
      value={{
        ledgers,
        addLedger,
        getLedgersByStatus,
        getAllLedgers,
      }}
    >
      {children}
    </LedgerContext.Provider>
  )
}

export const useLedgers = () => {
  const context = useContext(LedgerContext)
  if (!context) {
    throw new Error("useLedgers must be used within a LedgerProvider")
  }
  return context
}

