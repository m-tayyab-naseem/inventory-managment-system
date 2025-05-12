import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import StockList from "./components/StockList/StockList"
import IndividualLedger from "./components/IndividualLedger/IndividualLedger"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stock-list" element={<StockList />} />
          <Route path="/individual-ledger" element={<IndividualLedger />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

