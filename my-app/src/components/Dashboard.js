import React from "react"
import Navigation from "./Navigation"
import "./Dashboard.css"
import logo from '../assets/inventory.png'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-background"></div>
      <main className="dashboard-content">
        <div className="img">
          <img
            src={logo}
            alt="Timber Haven Logo"
            className="dashboard-logo"
          />
        </div>
        <h1>Welcome to Timber Haven</h1>
        <p>Manage your furniture store with ease</p>
        <Navigation />
      </main>
    </div>
  )
}

export default Dashboard

