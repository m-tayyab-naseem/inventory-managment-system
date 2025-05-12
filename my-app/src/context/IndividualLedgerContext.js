import React, { createContext, useState, useContext, useReducer } from "react"

const IndividualLedgerContext = createContext()
export const individualLedgerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IND_LEDGERS':
      return {
        ...state, // Preserve other state properties
        ledgers: action.payload,
      };
    case 'CREATE_INDI_LEDGER':
      return {
        ...state,
        ledgers: [action.payload, ...(state.ledgers || [])], // Handle undefined `ledgers`
      };
    case 'UPDATE_INDI_LEDGER':
      return {
        ...state,
        ledgers: (state.ledgers || []).map((ledger) =>
          ledger?.id === action.payload?.id ? { ...ledger, ...action.payload } : ledger
        ),
      };
    case 'DELETE_INDI_LEDGER':
      return {
        ...state,
        ledgers: (state.ledgers || []).filter((l) => l.id !== action.payload),
      };
    default:
      return state; // Always return current state if action is unknown
  }
};

export const IndividualLedgerProvider = ({ children }) => {

  const [state, dispatch] = useReducer(individualLedgerReducer, {
    ledgers:null
  })
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <IndividualLedgerContext.Provider
      value={{
        ...state,
        searchTerm,
        dispatch,
        setSearchTerm,
      }}
    >
      {children}
    </IndividualLedgerContext.Provider>
  )
}

export const useIndividualLedgers = () => {
  const context = useContext(IndividualLedgerContext)
  if (!context) {
    throw new Error("useIndividualLedgers must be used within an IndividualLedgerProvider")
  }
  return context
}

