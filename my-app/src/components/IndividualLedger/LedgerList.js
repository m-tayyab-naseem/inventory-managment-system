import React, { useState, useEffect } from "react"
import { useIndividualLedgers } from "../../context/IndividualLedgerContext"
import { FaUser, FaBox, FaEdit, FaTrash, FaEye } from "react-icons/fa"
import LedgerDetails from "./LedgerDetails"
import UpdateLedgerForm from "./UpdateLedgerForm"
import { useNavigate } from "react-router-dom"
import "./LedgerList.css"

const LedgerList = () => {
  const { ledgers, dispatch, setSearchTerm, deleteLedger,searchTerm } = useIndividualLedgers()
  const [selectedLedger, setSelectedLedger] = useState(null)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(page);
    console.log(`Navigating to ${page}`)
    // Add actual navigation logic here when implementing other pages
  }

  useEffect(()=>{
    const fetchLedgers = async ()=>{
      const response = await fetch('http://localhost:5000/api/ledgers')
      const json = await response.json()
      if(response.ok){
        dispatch({type:'SET_IND_LEDGERS',payload:json})
      }
    }
    fetchLedgers()
  },[])


  const handleViewDetails = (ledger) => {
    setSelectedLedger(ledger)
     setIsDetailsOpen(true)
  }

  const handleUpdate = (ledger) => {
    setSelectedLedger(ledger)
    setIsUpdateFormOpen(true)
  }

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:5000/api/ledger/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json)
      dispatch({ type: "DELETE_INDI_LEDGER", payload: id });
      // handleNavigation("/individual-ledger")
    }
    if(!response.ok){
      alert("Cannot Delete")
    }

  };

  return (
    <div className="ledger-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by customer ID, name, ledger ID, or product..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="ledger-items">
        {
          ledgers && 
            (searchTerm
              ?ledgers.filter(
                (ledger)=>
                  ledger.id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ledger)=>(
                <div key={ledger.id} className="ledger-item">
            <div className="ledger-info">
              <span className="ledger-id">{ledger?.id}</span>
              <span className="customer-info">
                <FaUser className="icon" />
                {ledger.customerId} - {ledger.customer?.name || "N/A"}
              </span>
              <span className="product-info">
                <FaBox className="icon" />
                {ledger.product?.name || "No Product"}
              </span>
              <span className={`status ${ledger.status}`}>{ledger.status}</span>
            </div>
            <div className="ledger-actions">
              <button className="view-btn" onClick={() => handleViewDetails(ledger)}>
                <FaEye />
              </button>
              <button className="update-btn" onClick={() => handleUpdate(ledger)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(ledger.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
              ))
        : ledgers.map((ledger) => (
          <div key={ledger.id} className="ledger-item">
            <div className="ledger-info">
              <span className="ledger-id">{ledger.id}</span>
              <span className="customer-info">
                <FaUser className="icon" />
                {ledger.customerId} - {ledger.customer?.name || "N/A"}
              </span>
              <span className="product-info">
                <FaBox className="icon" />
                {ledger.product?.name || "No Product"}
              </span>
              <span className={`status ${ledger.status}`}>{ledger.status}</span>
            </div>
            <div className="ledger-actions">
              <button className="view-btn" onClick={() => handleViewDetails(ledger)}>
                <FaEye />
              </button>
              <button className="update-btn" onClick={() => handleUpdate(ledger)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(ledger.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        )))}
      </div>
      {selectedLedger && isDetailsOpen && (
        <LedgerDetails
          ledger={selectedLedger}
          onClose={() => {
            setSelectedLedger(null)
            setIsDetailsOpen(false)
          }}
        />
      )}
      {selectedLedger && isUpdateFormOpen && (
        <UpdateLedgerForm
          ledger={selectedLedger}
          onClose={() => {
            setSelectedLedger(null)
            setIsUpdateFormOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default LedgerList

