import React from "react"
import "./Navigation.css"
import { useNavigate } from "react-router-dom"

const Navigation = () => {
  // Placeholder function for navigation (to be implemented later)

  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(page);
    console.log(`Navigating to ${page}`)
    // Add actual navigation logic here when implementing other pages
  }

  return (
    <nav className="navigation">
      <button onClick={() => handleNavigation("/stock-list")} className="nav-button">
        Stock List
      </button>
      <button onClick={() => handleNavigation("/individual-ledger")} className="nav-button">
        Individual Ledger
      </button>
      <button onClick={() => handleNavigation("Expense Ledger")} className="nav-button">
        Expense Ledger
      </button>
    </nav>
  )
}

export default Navigation

