import React from "react"
import { useProducts } from "../../context/ProductContext"
import "./TopNav.css"

const TopNav = () => {
  const { setSearchTerm } = useProducts()

  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/inventory-BMcKfrNfwkQZB4ej3638yWUE18NHC0.png"
          alt="Timber Haven Logo"
          className="nav-logo"
        />
        <h2>Timber Haven</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by model no. or name..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="nav-links">
        <button onClick={() => (window.location.href = "/")}>Dashboard</button>
        <button>Stock List</button>
        <button>Individual Ledger</button>
        <button>Expense Ledger</button>
      </div>
    </nav>
  )
}

export default TopNav

